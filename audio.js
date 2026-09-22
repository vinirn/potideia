// Procedural audio, generated locally with Web Audio. No downloads are required.
const gameAudio = (() => {
  let context, master, ambience, ambientNodes = [], enabled = true;
  let currentCity = null, ambientTimer = null;
  try { enabled = localStorage.getItem('potideia-sound') !== 'off'; } catch {}
  const palettes = {
    'Mossoró': [130.81, 164.81, 196], 'Caraúbas': [110, 146.83, 164.81],
    'Angicos': [146.83, 185, 220], 'Pau dos Ferros': [123.47, 164.81, 185],
    'Caicó': [130.81, 174.61, 220], 'Santa Cruz': [174.61, 220, 261.63],
    'São Paulo do Potengi': [146.83, 196, 246.94], 'João Câmara': [110, 138.59, 164.81],
    'Canguaretama': [98, 130.81, 164.81], 'Natal': [164.81, 196, 246.94],
    'Parnamirim': [146.83, 174.61, 220], 'Currais Novos': [164.81, 220, 261.63],
    'Macaíba': [130.81, 196, 246.94], 'Assu': [110, 164.81, 220]
  };
  function updateButton() {
    const button = document.getElementById('toggle-sound');
    button.textContent = enabled ? '♫ Som ligado' : '♪ Som desligado';
    button.setAttribute('aria-pressed', String(enabled));
    button.setAttribute('aria-label', enabled ? 'Desligar sons do jogo' : 'Ligar sons do jogo');
  }
  function tone(frequency, duration = .15, volume = .13, type = 'sine', delay = 0) {
    if (!context || !enabled || context.state !== 'running') return;
    const oscillator = context.createOscillator(), gain = context.createGain();
    const start = context.currentTime + delay;
    oscillator.type = type; oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(volume, start + .015);
    gain.gain.exponentialRampToValueAtTime(.001, start + duration);
    oscillator.connect(gain).connect(master);
    oscillator.start(start); oscillator.stop(start + duration + .03);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  }
  function melody(notes, speed = .1, volume = .13) {
    notes.forEach((note, index) => tone(note, .24, volume, 'triangle', index * speed));
  }
  function clearAmbience() {
    clearInterval(ambientTimer);
    ambientNodes.forEach(node => { if (node.stop) node.stop(); node.disconnect(); });
    ambientNodes = [];
    if (ambience) ambience.disconnect();
  }
  function setScene(city = null) {
    currentCity = city;
    if (!context || !enabled || context.state !== 'running') return;
    clearAmbience();
    const chord = palettes[city] || [98, 146.83, 196];
    ambience = context.createGain(); ambience.gain.value = 0;
    ambience.gain.linearRampToValueAtTime(1, context.currentTime + .8);
    ambience.connect(master);
    chord.forEach((frequency, index) => {
      const oscillator = context.createOscillator(), gain = context.createGain();
      oscillator.type = 'sine'; oscillator.frequency.value = frequency / 2;
      gain.gain.value = .022 / (index + 1);
      oscillator.connect(gain).connect(ambience); oscillator.start();
      ambientNodes.push(oscillator, gain);
    });
    // Soft filtered wind; coastal destinations have a brighter sea-like texture.
    const buffer = context.createBuffer(1, context.sampleRate * 3, context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    const wind = context.createBufferSource(), filter = context.createBiquadFilter(), windGain = context.createGain();
    wind.buffer = buffer; wind.loop = true; filter.type = 'lowpass';
    filter.frequency.value = ['Natal', 'Canguaretama'].includes(city) ? 750 : 280;
    windGain.gain.value = city ? .06 : .035;
    wind.connect(filter).connect(windGain).connect(ambience); wind.start();
    ambientNodes.push(wind, filter, windGain);
    let phrase = 0;
    ambientTimer = setInterval(() => {
      if (document.hidden || !enabled) return;
      const base = chord[phrase++ % chord.length];
      tone(base * 4, .7, .035, 'sine');
      if (city) tone(chord[phrase % chord.length] * 2, .9, .025, 'triangle', .4);
    }, city ? 2800 : 4400);
  }
  async function activate() {
    if (!enabled || document.hidden) return;
    try {
      if (!context) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        context = new AudioContext(); master = context.createGain();
        master.gain.value = .35; master.connect(context.destination);
      }
      if (context.state === 'suspended') await context.resume();
      if (!ambience) setScene(currentCity);
    } catch { /* Browsers without audio support keep the game playable. */ }
  }
  function effect(name, city) {
    if (name === 'focus') { tone(660, .055, .09, 'triangle'); tone(880, .045, .055, 'triangle', .035); }
    if (name === 'step') { tone(90, .055, .11, 'triangle'); tone(180, .025, .025, 'square'); }
    if (name === 'open') { const chord = palettes[city] || palettes['Mossoró']; melody(chord.map(n => n * 2), .08); }
    if (name === 'close') melody([392, 293.66, 196], .065, .08);
    if (name === 'arrive') melody([392, 523.25], .08, .08);
    if (name === 'visit') melody([261.63, 329.63, 392, 523.25], .095);
    if (name === 'reveal') melody([523.25, 659.25, 783.99], .12, .09);
    if (name === 'win') melody([261.63, 329.63, 392, 523.25, 392, 523.25, 659.25, 783.99], .15);
  }
  document.getElementById('toggle-sound').addEventListener('click', async () => {
    enabled = !enabled; updateButton();
    try { localStorage.setItem('potideia-sound', enabled ? 'on' : 'off'); } catch {}
    if (enabled) {
      await activate();
      if (master) master.gain.setTargetAtTime(.35, context.currentTime, .04);
      setScene(currentCity);
    } else {
      clearAmbience(); ambience = null;
      if (master) master.gain.setTargetAtTime(0, context.currentTime, .03);
    }
  });
  const gesture = event => {
    if (event.target.closest('#toggle-sound')) return;
    activate();
  };
  document.addEventListener('pointerdown', gesture, { capture: true });
  document.addEventListener('keydown', gesture, { capture: true });
  document.addEventListener('visibilitychange', () => {
    if (!context) return;
    if (document.hidden) { clearAmbience(); ambience = null; context.suspend().catch(() => {}); }
    else if (enabled) activate();
  });
  updateButton();
  return { effect, setScene };
})();
