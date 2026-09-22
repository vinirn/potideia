const STORAGE_KEY = 'potideia-game-v1';
const emptyState = () => ({ visits: 0, score: 0, selected: null, visited: new Set(), notes: [], indicators: { science: 0, technology: 0, territory: 0, citizenship: 0, economy: 0 } });
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return emptyState();
    const state = emptyState();
    state.visits = Number.isInteger(saved.visits) ? saved.visits : 0;
    state.score = Number.isInteger(saved.score) ? saved.score : 0;
    state.selected = typeof saved.selected === 'string' ? saved.selected : null;
    state.visited = new Set(Array.isArray(saved.visited) ? saved.visited : []);
    state.notes = Array.isArray(saved.notes) ? saved.notes.filter(note => typeof note === 'string') : [];
    Object.keys(state.indicators).forEach(key => state.indicators[key] = Number.isInteger(saved.indicators?.[key]) ? saved.indicators[key] : 0);
    return state;
  } catch { return emptyState(); }
}
const state = loadState();
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, visited: [...state.visited] })); }
  catch { document.getElementById('game-status').textContent = 'O navegador não permitiu salvar. Você pode continuar nesta sessão.'; }
}

const cities = {
  'Mossoró': { pole: 'ASSU–MOSSORÓ · INÍCIO', host: 'UFERSA MOSSORÓ', indicator: 'technology', label: 'TECNOLOGIA', npc: 'PROFA. LIA', speech: '“O parque nasce da colaboração. Antes de avançar, conheça Caraúbas e Angicos: a UFERSA é uma rede.”', scene: 'mossoro', adjacent: ['Caraúbas', 'Angicos', 'Assu'], tags: ['PARQUE', 'PRIORIDADE UFERSA'] },
  'Caraúbas': { pole: 'SERTÃO DO APODI · PRIORIDADE', host: 'UFERSA CARAÚBAS', indicator: 'territory', label: 'TERRITÓRIO', npc: 'CAIO, AGROINOVADOR', speech: '“No Apodi, água, solo e ideias caminham juntos. A pesquisa aplicada pode florescer por todo o sertão.”', scene: 'caraubas', adjacent: ['Mossoró', 'Angicos', 'Pau dos Ferros'], tags: ['SEMIÁRIDO', 'UFERSA'] },
  'Angicos': { pole: 'CABUGI · PRIORIDADE', host: 'UFERSA ANGICOS', indicator: 'science', label: 'CIÊNCIA', npc: 'PROF. DAMÁSIO · INEAGRO', speech: '“Boas-vindas à INEAGRO Cabugi! Sou o professor Damásio e integro esta equipe. Aqui, conectamos conhecimento e empreendedorismo para desenvolver o território.”', scene: 'angicos', adjacent: ['Mossoró', 'Caraúbas', 'São Paulo do Potengi'], tags: ['INCUBAÇÃO', 'UFERSA'] },
  'Pau dos Ferros': { pole: 'ALTO OESTE', host: 'IFRN PAU DOS FERROS', indicator: 'science', label: 'CIÊNCIA', npc: 'ZÉ DO RÁDIO', speech: '“Quando a ciência chega na conversa da praça, ela encontra novas perguntas e aliados.”', scene: 'pau', adjacent: ['Caraúbas', 'Caicó'], tags: ['COMUNICAÇÃO', 'IFRN'] },
  'Caicó': { pole: 'SERIDÓ', host: 'UERN CAICÓ', indicator: 'citizenship', label: 'CIDADANIA', npc: 'DONA BIA', speech: '“Serviço público melhora quando quem usa também inventa junto.”', scene: 'caico', adjacent: ['Pau dos Ferros', 'Santa Cruz', 'Natal'], tags: ['CIDADANIA', 'UERN'] },
  'Santa Cruz': { pole: 'TRAIRI', host: 'UFRN SANTA CRUZ', indicator: 'territory', label: 'TERRITÓRIO', npc: 'DR. TOM', speech: '“Saúde, universidade e comunidade formam uma equipe muito mais forte.”', scene: 'santa', adjacent: ['Caicó', 'São Paulo do Potengi', 'Canguaretama'], tags: ['SAÚDE', 'UFRN'] },
  'São Paulo do Potengi': { pole: 'POTENGI', host: 'IFRN SÃO PAULO DO POTENGI', indicator: 'technology', label: 'TECNOLOGIA', npc: 'MAYA, INVENTORA', speech: '“Uma ideia protegida e compartilhada com justiça pode viajar longe.”', scene: 'potengi', adjacent: ['Angicos', 'Santa Cruz', 'Natal'], tags: ['PI', 'TECNOLOGIA'] },
  'João Câmara': { pole: 'MATO GRANDE', host: 'IFRN JOÃO CÂMARA', indicator: 'economy', label: 'ECONOMIA', npc: 'RAFA, ARTICULADOR', speech: '“Quando produtores e empresas se reconhecem como rede, o valor fica no território.”', scene: 'camara', adjacent: ['Natal', 'Mossoró'], tags: ['ARRANJOS', 'IFRN'] },
  'Canguaretama': { pole: 'AGRESTE + LITORAL SUL', host: 'IFRN CANGUARETAMA', indicator: 'economy', label: 'ECONOMIA', npc: 'LU, PESQUISADORA', speech: '“Formação é investimento de longo prazo: cada pessoa pode abrir um novo caminho.”', scene: 'canguaretama', adjacent: ['Santa Cruz', 'Natal'], tags: ['FORMAÇÃO', 'PESQUISA'] },
  'Natal': { pole: 'TERRAS POTIGUARES', host: 'IFESP NATAL', indicator: 'citizenship', label: 'CIDADANIA', npc: 'MESTRE NÔ', speech: '“Memória e futuro não são opostos. Uma cidade inovadora escuta as próprias raízes.”', scene: 'natal', adjacent: ['João Câmara', 'São Paulo do Potengi', 'Canguaretama'], tags: ['MEMÓRIA', 'REDE'] }
};

const institutions = {
  "Mossoró": {
    "short": "IAGRAM",
    "full": "Incubadora Tecnológica e do Agronegócio de Mossoró",
    "affiliation": "UFERSA · Campus Mossoró",
    "source": "https://iagramproec.ufersa.edu.br/apresentacao/"
  },
  "Caraúbas": {
    "short": "UFERSA CARAÚBAS",
    "full": "Universidade Federal Rural do Semi-Árido",
    "affiliation": "Campus Caraúbas",
    "source": "https://caraubas.ufersa.edu.br/apresentacao-2/"
  },
  "Angicos": {
    "short": "INEAGRO CABUGI",
    "full": "Incubadora Tecnológica e Multissetorial do Sertão do Cabugi",
    "affiliation": "UFERSA · Campus Angicos",
    "source": "https://angicos.ufersa.edu.br/2024/08/15/incubadora-ineagro-cabugi-publica-edital-01-2024-sistema-de-incubacao/"
  },
  "Pau dos Ferros": {
    "short": "ITAO",
    "full": "Incubadora Tecnológica do Alto Oeste",
    "affiliation": "IFRN · Campus Pau dos Ferros",
    "source": "https://portal.ifrn.edu.br/campus/paudosferros/noticias/incubadora-do-ifrn-em-pau-dos-ferros-muda-de-nome-para-itao/"
  },
  "Caicó": {
    "short": "UERN CAICÓ",
    "full": "Universidade do Estado do Rio Grande do Norte",
    "affiliation": "Campus Avançado de Caicó",
    "source": "https://portal.uern.br/caico/perguntas-frequentes-faq/"
  },
  "Santa Cruz": {
    "short": "FACISA",
    "full": "Faculdade de Ciências da Saúde do Trairi",
    "affiliation": "UFRN · Santa Cruz",
    "source": "https://sigaa.ufrn.br/sigaa/public/departamento/portal.jsf?id=4890"
  },
  "São Paulo do Potengi": {
    "short": "IT POTENGI",
    "full": "Incubadora Tecnológica do Potengi",
    "affiliation": "IFRN · Campus São Paulo do Potengi",
    "source": "https://portal.ifrn.edu.br/campus/sao-paulo-do-potengi/processo-seletivos-empreenda-no-ifrn/fluxo-continuo-para-incubacao-de-empreendimentos-inovadores/"
  },
  "João Câmara": {
    "short": "ITJC",
    "full": "Incubadora Tecnológica do Campus João Câmara",
    "affiliation": "IFRN · Campus João Câmara",
    "source": "https://portal.ifrn.edu.br/campus/joaocamara/noticias/campus-joao-camara-abre-selecao-continua-para-ingresso-de-empresas-na-itjc/"
  },
  "Canguaretama": {
    "short": "IFRN CANGUARETAMA",
    "full": "Instituto Federal do Rio Grande do Norte",
    "affiliation": "Campus Canguaretama",
    "source": "https://portal.ifrn.edu.br/campus/canguaretama/"
  },
  "Natal": {
    "short": "IFESP",
    "full": "Instituto de Educação Superior Presidente Kennedy",
    "affiliation": "Natal · Formação de profissionais da educação",
    "source": "https://ifesp.edu.br/pk/sobre-o-ifesp/"
  }
};

// A connection is revealed only after visiting the city that introduces it.
function revealedRoutes() {
  const routes = new Set();
  state.visited.forEach(from => {
    (cities[from]?.adjacent || []).filter(to => cities[to]).forEach(to => routes.add([from, to].sort().join('|')));
  });
  return routes;
}
function unlockedCities() {
  const unlocked = new Set(['Mossoró']);
  state.visited.forEach(name => {
    if (!cities[name]) return;
    unlocked.add(name);
    cities[name].adjacent.filter(next => cities[next]).forEach(next => unlocked.add(next));
  });
  return unlocked;
}
function guide(message) {
  document.getElementById('guide-message').textContent = message;
}
function guideForCity() {
  const city = cities[state.selected];
  if (state.score >= 10) {
    guide('Vitória! Todos os indicadores chegaram a 100%. Sua rede fez o parque florescer!');
  } else if (!state.visits) {
    guide('Boas-vindas! Sou o professor Damásio. Nossa jornada começa em Mossoró. Use WASD ou as setas nos caminhos revelados e Enter para conhecer cada local. Você decide como explorar!');
  } else if (state.visited.has(state.selected)) {
    guide(`Você está em ${state.selected}. As cidades verdes já contribuíram para a rede. Os caminhos revelados conectam os lugares que você pode explorar.`);
  } else {
    guide(`Chegamos a ${state.selected}! Aqui fica ${institutions[state.selected].short}. Este encontro conecta nossa rede ao tema ${city.label.toLowerCase()}.`);
  }
}
function showPercentage(id, value, maximum) {
  const percent = Math.max(0, Math.min(100, Math.round(value / maximum * 100)));
  const element = document.getElementById(id);
  const color = `hsl(${percent * 1.3} 80% 70%)`;
  element.textContent = `${percent}%`;
  element.style.color = color;
  const progress = document.getElementById(`${id}-progress`);
  if (progress) { progress.value = percent; progress.style.setProperty('--score-color', color); }
}
function updateUI() {
  const unlocked = unlockedCities(), revealed = revealedRoutes();
  Object.entries(state.indicators).forEach(([key, value]) => showPercentage(key, value, 2));
  showPercentage('park-score', state.score, 10);
  document.getElementById('round-number').textContent = state.visits;
  document.getElementById('open-location').disabled = !state.selected;
  Object.keys(state.indicators).forEach(key => document.getElementById(key).parentElement.classList.toggle('complete', state.indicators[key] >= 2));
  document.querySelectorAll('.city-node').forEach(node => {
    const visited = state.visited.has(node.dataset.name);
    node.classList.toggle('hidden-route', !unlocked.has(node.dataset.name));
    node.setAttribute('tabindex', unlocked.has(node.dataset.name) ? '0' : '-1');
    node.classList.toggle('visited', visited);
    node.setAttribute('aria-label', `${node.dataset.name}, ${visited ? 'visitada' : 'disponível'}. Abrir local`);
    node.setAttribute('aria-pressed', String(node.dataset.name === state.selected));
  });
  document.querySelectorAll('.city-label, .city-ring').forEach(node => {
    node.classList.toggle('hidden-route', !unlocked.has(node.dataset.name));
    if (node.classList.contains('city-label')) {
      node.textContent = node.dataset.name.toUpperCase();
      node.classList.toggle('visited', state.visited.has(node.dataset.name));
    }
  });
  document.querySelectorAll('.city-reward').forEach(node => {
    node.classList.toggle('hidden-route', !unlocked.has(node.dataset.name) || state.visited.has(node.dataset.name));
    node.textContent = state.visited.has(node.dataset.name) ? '' : `+50% ${cities[node.dataset.name].label}`;
  });
  document.querySelectorAll('.route-line').forEach(line => {
    line.classList.toggle('hidden-route', !revealed.has([line.dataset.from, line.dataset.to].sort().join('|')));
    line.classList.toggle('selected', [line.dataset.from, line.dataset.to].includes(state.selected));
  });

}
function note(message) {
  state.notes.unshift(message);
  renderNotes();
  saveState();
}
function renderNotes() {
  const list = document.getElementById('notes');
  list.replaceChildren();
  const notes = state.notes.length ? state.notes : ['AGUARDANDO PRIMEIRA ALIANÇA...'];
  notes.forEach(message => { const item = document.createElement('li'); item.textContent = message; list.append(item); });
}
const journey = { active: false, frame: null, centers: new Map() };
function placeTraveler(x, y, stride = 0) {
  const traveler = document.getElementById('traveler');
  if (!traveler) return;
  traveler.setAttribute('transform', `translate(${Math.round(x) - 10},${Math.round(y) - 37})`);
  traveler.querySelector('.leg-left').setAttribute('y', 25 + stride);
  traveler.querySelector('.leg-right').setAttribute('y', 25 - stride);
}
function stopJourney() {
  cancelAnimationFrame(journey.frame);
  journey.active = false;
  document.querySelector('.play-area').classList.remove('traveling');
  document.getElementById('open-location').disabled = !state.selected;
}
function routeTo(destination) {
  const paths = [[state.selected]], seen = new Set([state.selected]);
  const edges = [...revealedRoutes()].map(key => key.split('|'));
  while (paths.length) {
    const path = paths.shift(), current = path[path.length - 1];
    if (current === destination) return path;
    edges.forEach(([a, b]) => {
      const next = a === current ? b : b === current ? a : null;
      if (next && !seen.has(next)) { seen.add(next); paths.push([...path, next]); }
    });
  }
  return null;
}
function destinationInDirection(key) {
  const vector = { ArrowLeft: [-1,0], a: [-1,0], ArrowRight: [1,0], d: [1,0], ArrowUp: [0,-1], w: [0,-1], ArrowDown: [0,1], s: [0,1] }[key];
  const origin = journey.centers.get(state.selected);
  if (!vector || !origin) return null;
  const neighbors = [...revealedRoutes()].map(edge => edge.split('|')).flatMap(([a,b]) => a === state.selected ? [b] : b === state.selected ? [a] : []);
  return neighbors.map(name => {
    const point = journey.centers.get(name), dx = point[0]-origin[0], dy = point[1]-origin[1];
    const forward = dx * vector[0] + dy * vector[1], distance = Math.hypot(dx,dy);
    const alignment = forward / distance;
    return { name, alignment, distance };
  }).filter(candidate => candidate.alignment >= Math.SQRT1_2 - 1e-6)
    .sort((a,b) => b.alignment-a.alignment || a.distance-b.distance)[0]?.name;
}
function chooseCity(name, el, open = false) {
  if (journey.active || !cities[name] || !unlockedCities().has(name)) return;
  const path = state.selected && name !== state.selected ? routeTo(name) : null;
  if (!path || path.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    selectCity(name, el, open); return;
  }
  journey.active = true;
  guide(`A caminho de ${name}! Espere o personagem chegar antes de escolher a próxima direção.`);
  document.querySelector('.play-area').classList.add('traveling');
  document.getElementById('open-location').disabled = true;
  document.getElementById('visit-effect').textContent = `CAMINHANDO PARA ${name.toUpperCase()}…`;
  let segment = 0, startTime = null, lastStep = -Infinity;
  function step(time) {
    if (!journey.active) return;
    if (startTime === null) startTime = time;
    if (time - lastStep > 180) { gameAudio.effect('step'); lastStep = time; }
    const [x1, y1] = journey.centers.get(path[segment]);
    const [x2, y2] = journey.centers.get(path[segment + 1]);
    const duration = Math.max(350, Math.hypot(x2-x1, y2-y1) * 4);
    const progress = Math.min(1, (time - startTime) / duration);
    placeTraveler(x1 + (x2-x1) * progress, y1 + (y2-y1) * progress, Math.floor(time / 120) % 2 ? 2 : -2);
    if (progress === 1) {
      segment++;
      if (segment === path.length - 1) { stopJourney(); gameAudio.effect('arrive'); selectCity(name, el, open); return; }
      startTime = time;
    }
    journey.frame = requestAnimationFrame(step);
  }
  journey.frame = requestAnimationFrame(step);
}
function selectCity(name, el, open = false) {
  if (!cities[name] || !unlockedCities().has(name)) return;
  state.selected = name;
  guideForCity();
  const position = journey.centers.get(name);
  if (position) placeTraveler(...position);
  document.querySelectorAll('.city-node,.municipality').forEach(n => n.classList.remove('active'));
  document.querySelectorAll(`[data-name="${CSS.escape(name)}"]`).forEach(n => n.classList.add('active'));
  if (el) el.classList.add('active');
  const city = cities[name];
  document.getElementById('city-name').textContent = name.toUpperCase();
  document.getElementById('city-copy').textContent = `${institutions[name].short} · ${state.visited.has(name) ? 'Visita concluída' : '+50% ' + city.label}`;
  document.getElementById('city-tags').innerHTML = [`+50% ${city.label}`, ...city.tags].map(t => `<span>${t}</span>`).join('');
  document.getElementById('visit-effect').textContent = state.visited.has(name) ? 'VISITA CONCLUÍDA · REVER LOCAL' : `VISITA DISPONÍVEL · +50% ${city.label}`;
  updateUI();
  saveState();
  if (open) openLocation();
}
function characterArt(city) {
  const index = Object.keys(cities).indexOf(state.selected);
  const portrait = document.createElement('div');
  portrait.className = 'npc-portrait';
  portrait.style.backgroundPosition = `${(index % 5) * 25}% ${Math.floor(index / 5) * 100}%`;
  portrait.setAttribute('role', 'img');
  portrait.setAttribute('aria-label', `Retrato de ${city.npc} em pixel art`);
  const caption = document.createElement('span');
  caption.className = 'portrait-caption';
  caption.textContent = institutions[state.selected].affiliation;
  const scene = document.getElementById('scene-art');
  scene.replaceChildren(portrait, caption);
}
function openLocation() {
  if (journey.active || !state.selected || !unlockedCities().has(state.selected)) return;
  const city = cities[state.selected], dialog = document.getElementById('location-dialog');
  const institution = institutions[state.selected];
  guide(state.visited.has(state.selected) ? `Este encontro em ${state.selected} já contribuiu para a rede. Você pode rever a conversa com o anfitrião.` : `Você está em ${institution.short}, em ${state.selected}. Cada instituição tem uma história e um papel no desenvolvimento do território.`);
  document.getElementById('dialog-institution').textContent = institution.short;
  document.getElementById('institution-full').textContent = institution.full;
  document.getElementById('institution-affiliation').textContent = institution.affiliation;
  document.getElementById('institution-source').href = institution.source;
  document.getElementById('dialog-pole').textContent = city.pole;
  document.getElementById('dialog-city').textContent = state.selected.toUpperCase();
  document.getElementById('npc-name').textContent = city.npc;
  document.getElementById('npc-speech').textContent = `“${city.speech.replace(/[“”]/g, '')}”`;
  characterArt(city);
  const visit = document.getElementById('visit-location'); visit.disabled = state.visited.has(state.selected); visit.innerHTML = state.visited.has(state.selected) ? '✓ VISITA CONCLUÍDA · PONTO RECEBIDO' : `<kbd>V</kbd> REGISTRAR VISITA <small>+50% ${city.label} · UMA VEZ POR CIDADE</small>`;
  if (!dialog.open) dialog.showModal();
  gameAudio.setScene(state.selected);
  gameAudio.effect('open', state.selected);
  (visit.disabled ? document.querySelector('.close-dialog') : visit).focus();
}
function registerVisit() {
  if (!state.selected || state.visited.has(state.selected)) return;
  const previousUnlocked = unlockedCities();
  const city = cities[state.selected]; state.visited.add(state.selected);state.indicators[city.indicator]++;state.score++;state.visits++;
  note(`${state.selected.toUpperCase()}: +50% ${city.label}.`);
  if (Object.values(state.indicators).every(value => value >= 2)) note('VITÓRIA: TODOS OS INDICADORES ALCANÇARAM 100%.');
  document.getElementById('location-dialog').dataset.justVisited = 'true';
  document.getElementById('location-dialog').close();
  chooseCity(state.selected);
  const newlyUnlocked = [...unlockedCities()].filter(name => !previousUnlocked.has(name));
  const won = Object.values(state.indicators).every(value => value >= 2);
  gameAudio.effect(won ? 'win' : newlyUnlocked.length ? 'reveal' : 'visit');
  guide(won ? 'Vitória! Ciência, tecnologia, território, cidadania e economia chegaram a 100%. Você completou a rede!'
    : `${city.label}: ${state.indicators[city.indicator] * 50}%${state.indicators[city.indicator] >= 2 ? ' — indicador completo!' : '!'} Geral: ${state.score * 10}%. ${newlyUnlocked.length ? 'Novos caminhos revelados: ' + newlyUnlocked.join(' e ') + '.' : 'Mais uma conquista para a nossa rede!'}`);
  document.getElementById('game-status').textContent = won
    ? 'Parabéns! O parque floresceu. Todos os indicadores chegaram a 100%!'
    : `✓ +50% ${city.label.toLowerCase()}! ${newlyUnlocked.length ? 'Novos destinos: ' + newlyUnlocked.join(' e ') + '.' : 'Escolha outro destino revelado.'} Faltam ${10 - state.visits} visitas.`;
  document.getElementById('game-status').classList.toggle('victory', won);
  document.getElementById('open-location').focus();
  saveState();
}
function polygonParts(geometry) { return geometry.type === 'Polygon' ? geometry.coordinates : geometry.coordinates.flat(); }
function centroid(geometry) { const coords = polygonParts(geometry).flat(); return coords.reduce((a,p) => [a[0]+p[0],a[1]+p[1]],[0,0]).map(v=>v/coords.length); }
function initMap(data) {
  const features=data.features, points=features.flatMap(f=>polygonParts(f.geometry).flat()), minX=Math.min(...points.map(p=>p[0])),maxX=Math.max(...points.map(p=>p[0])),minY=Math.min(...points.map(p=>p[1])),maxY=Math.max(...points.map(p=>p[1]));
  const pad=42,width=1000,height=(maxY-minY)/(maxX-minX)*(width-pad*2)+pad*2,scale=(width-pad*2)/(maxX-minX),project=([x,y])=>[pad+(x-minX)*scale,height-pad-(y-minY)*scale],path=g=>polygonParts(g).map(r=>`M${r.map(p=>project(p).join(',')).join('L')}Z`).join('');
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox',`0 0 ${width} ${height}`);svg.setAttribute('class','rn-map');svg.setAttribute('role','group');svg.setAttribute('aria-label','Mapa municipal navegável do Rio Grande do Norte');let outline='';
  features.forEach(f=>{const name=f.properties.NM_MUN,p=document.createElementNS(svg.namespaceURI,'path');p.setAttribute('d',path(f.geometry));p.setAttribute('class','municipality');p.dataset.name=name;if(cities[name]){p.addEventListener('click',()=>chooseCity(name,p,true));}svg.append(p);outline+=path(f.geometry);});
  const border=document.createElementNS(svg.namespaceURI,'path');border.setAttribute('d',outline);border.setAttribute('class','rn-outline');svg.append(border);
  const centers = new Map(features.filter(f => cities[f.properties.NM_MUN]).map(f => [f.properties.NM_MUN, project(centroid(f.geometry))]));
  journey.centers = centers;
  const edges = new Set();
  Object.entries(cities).forEach(([from, city]) => city.adjacent.filter(to => centers.has(to)).forEach(to => {
    const key = [from, to].sort().join('|');
    if (edges.has(key)) return;
    edges.add(key);
    const line = document.createElementNS(svg.namespaceURI, 'line');
    ['x1', 'y1', 'x2', 'y2'].forEach((attr, i) => line.setAttribute(attr, [...centers.get(from), ...centers.get(to)][i]));
    line.setAttribute('class', 'route-line'); line.dataset.from = from; line.dataset.to = to;
    svg.append(line);
  }));
  features.filter(f=>cities[f.properties.NM_MUN]).forEach(f=>{const name=f.properties.NM_MUN,[x,y]=project(centroid(f.geometry)),ring=document.createElementNS(svg.namespaceURI,'circle'),dot=document.createElementNS(svg.namespaceURI,'circle'),label=document.createElementNS(svg.namespaceURI,'text');ring.setAttribute('cx',x);ring.setAttribute('cy',y);ring.setAttribute('r',5);ring.setAttribute('class','city-ring');ring.dataset.name=name;dot.setAttribute('cx',x);dot.setAttribute('cy',y);dot.setAttribute('r',9);dot.setAttribute('class','city-node');dot.dataset.name=name;dot.setAttribute('tabindex','0');dot.setAttribute('role','button');dot.setAttribute('aria-label',`Acessar ${name}`);dot.addEventListener('click',()=>chooseCity(name,dot,true));dot.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();chooseCity(name,dot,true)}});label.dataset.name=name;label.setAttribute('x',x > width * .7 ? x-14 : x+14);label.setAttribute('text-anchor',x > width * .7 ? 'end' : 'start');label.setAttribute('y',y-13);label.setAttribute('class','city-label');label.textContent=name.toUpperCase();const reward=document.createElementNS(svg.namespaceURI,'text');reward.dataset.name=name;reward.setAttribute('x',label.getAttribute('x'));reward.setAttribute('y',y+5);reward.setAttribute('text-anchor',label.getAttribute('text-anchor'));reward.setAttribute('class','city-reward');svg.append(ring,dot,label,reward);});
  const traveler = document.createElementNS(svg.namespaceURI, 'g');
  traveler.id = 'traveler'; traveler.setAttribute('aria-hidden', 'true');
  // A tiny code-native pixel sprite: backpack, face, shirt and alternating boots.
  traveler.innerHTML = '<ellipse cx="10" cy="37" rx="11" ry="3" fill="#080e2088"/><g shape-rendering="crispEdges"><rect x="2" y="14" width="17" height="15" fill="#17192f"/><rect x="0" y="17" width="5" height="11" fill="#e8ad54"/><rect x="6" y="0" width="11" height="5" fill="#292039"/><rect x="4" y="4" width="14" height="11" fill="#d99162"/><rect x="4" y="3" width="14" height="4" fill="#292039"/><rect x="13" y="8" width="3" height="3" fill="#221629"/><rect x="5" y="15" width="13" height="12" fill="#5be5e1"/><rect x="17" y="18" width="4" height="9" fill="#d99162"/><rect class="leg-left" x="5" y="25" width="5" height="10" fill="#f9df93"/><rect class="leg-right" x="13" y="25" width="5" height="10" fill="#f9df93"/></g>';
  svg.append(traveler);
  document.getElementById('map-stage').replaceChildren(svg);
  const savedCity = state.selected && cities[state.selected] && unlockedCities().has(state.selected) ? state.selected : 'Mossoró';
  selectCity(savedCity);
  if (state.visits) document.getElementById('game-status').textContent = state.visits === 10 ? 'Parabéns! O parque floresceu. Todos os indicadores chegaram a 100%!' : `${state.visits} de 10 visitas concluídas. Escolha uma cidade disponível para continuar.`;
}
document.getElementById('location-dialog').addEventListener('close', () => {
  if (document.getElementById('location-dialog').open) return;
  gameAudio.effect('close'); gameAudio.setScene();
  const dialog = document.getElementById('location-dialog');
  if (dialog.dataset.justVisited) delete dialog.dataset.justVisited;
  else guideForCity();
});
document.getElementById('open-location').addEventListener('click',openLocation);document.getElementById('visit-location').addEventListener('click',registerVisit);document.querySelector('.close-dialog').addEventListener('click',()=>document.getElementById('location-dialog').close());
document.getElementById('clear-notes').addEventListener('click',()=>{ state.notes = ['DIÁRIO LIMPO.']; renderNotes(); saveState(); });
document.querySelector('.logo').addEventListener('click', event => { event.preventDefault(); document.getElementById('location-dialog').close(); document.getElementById('open-location').focus(); });
document.getElementById('restart-game').addEventListener('click', () => {
  if (!window.confirm('Reiniciar a partida? As visitas e os pontos desta partida serão apagados.')) return;
  stopJourney();
  Object.assign(state, emptyState());
  renderNotes(); chooseCity('Mossoró');
  document.getElementById('game-status').textContent = 'Comece por Mossoró. Abra o local e registre sua visita.';
  document.getElementById('game-status').classList.remove('victory');
  document.getElementById('open-location').focus();
});
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
  if (journey.active) {
    if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Enter', ' ', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(event.key)) event.preventDefault();
    return;
  }
  const dialog = document.getElementById('location-dialog');
  if (event.key.toLowerCase() === 'v' && dialog.open) { event.preventDefault(); registerVisit(); return; }
  if (dialog.open) return;
  const navigationKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (/^[0-9]$/.test(event.key)) { event.preventDefault(); const name = Object.keys(cities)[(Number(event.key) + 9) % 10];
    if (unlockedCities().has(name)) chooseCity(name, null, true);
    else { guide('Esse caminho ainda não foi revelado. O mapa mostra os lugares disponíveis neste momento.'); } }
  else if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'w', 'a', 's', 'd'].includes(navigationKey)) {
    event.preventDefault();
    const destination = destinationInDirection(navigationKey);
    if (destination) chooseCity(destination);
    else guide('Ainda não há caminho revelado nessa direção. As linhas no mapa mostram as conexões disponíveis neste momento.');
    document.getElementById('open-location').focus({ preventScroll: true });
  } else if (event.key === 'Enter' && !event.target.closest('button, a, [role="button"]')) { event.preventDefault(); openLocation(); }
});
renderNotes();
if (window.RN_MUNICIPIOS?.features) {
  initMap(window.RN_MUNICIPIOS);
} else {
  document.getElementById('map-stage').innerHTML = '<div class="loading">ERRO: DADOS DO TABULEIRO INDISPONÍVEIS.</div>';
}
updateUI();
