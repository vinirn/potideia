# Potideia — Com a ciência, a terra árida floresce

Jogo cooperativo 2D, em HTML e JavaScript, sobre os ecossistemas de inovação do Rio Grande do Norte. O ponto de partida é Mossoró e o objetivo é equilibrar os indicadores que fazem um parque científico e tecnológico florescer.

## Jogar

Não há servidor, instalação ou comando para executar. Basta abrir `index.html` no navegador (inclusive com duplo clique). A malha do mapa é carregada como um script local, compatível com o protocolo `file://`.

O progresso da partida — visitas, indicadores, cidade selecionada e diário — fica salvo apenas no navegador, em `localStorage`. Use **Reiniciar jogo**, em destaque no cabeçalho, para começar novamente após confirmar. O logotipo volta ao mapa sem apagar o progresso.

## Mecânica da V1

A partida começa com apenas Mossoró revelada. Registrar uma visita revela os caminhos e os destinos adjacentes daquela cidade. As cidades ainda ocultas não podem ser acessadas por clique nem por atalho. Cada local concede pontos uma única vez: +10 pontos percentuais no escore geral e +50 pontos percentuais em um indicador. Cidades já visitadas continuam abertas para consultar o diálogo. A navegação entre cidades acontece no mapa, após fechar a janela do local.

| Indicador | Limiar de vitória | Visitas que o aumentam |
| --- | ---: | --- |
| Ciência | 100% | Pau dos Ferros, Angicos |
| Tecnologia | 100% | Mossoró, São Paulo do Potengi |
| Território | 100% | Caraúbas, Santa Cruz |
| Cidadania | 100% | Caicó, Natal |
| Economia | 100% | João Câmara, Canguaretama |

A equipe vence quando todos os cinco indicadores chegam a `100%`. O escore geral chega a `100%` quando todas as visitas foram registradas.

### Rota de partida e prioridade

A partida começa no mapa com **Mossoró** selecionada, sede do Parque Científico e Tecnológico em construção. A rota inicial prioritária é a rede UFERSA:

1. UFERSA Mossoró — Tecnologia
2. UFERSA Caraúbas — Território / semiárido
3. UFERSA Angicos — Ciência / formação avançada

Os demais polos aparecem no mapa conforme as visitas revelam conexões. O progresso salvo anteriormente é preservado; as rotas reveladas são reconstruídas a partir das cidades já visitadas.

## Tabuleiro

`data/RN_Municipios_2024.zip` é a malha municipal oficial do IBGE baixada para o projeto. O arquivo é preservado como fonte; `data/rn-municipios.geojson` é sua conversão de referência e `data/rn-municipios.js` é a versão incorporada pela página estática. O tabuleiro desenha os 167 municípios do RN e destaca 10 cidades jogáveis.

Os polos se inspiram no Programa Raízes da Inovação da FAPERN:

| Polo | Referência |
| --- | --- |
| Alto Oeste | IFRN Pau dos Ferros |
| Sertão do Apodi | UFERSA Caraúbas |
| Assu–Mossoró | UFERSA Mossoró |
| Sertão Central Cabugi e Litoral Norte | UFERSA Angicos |
| Seridó | UERN Caicó |
| Trairi | UFRN Santa Cruz |
| Potengi | IFRN São Paulo do Potengi |
| Mato Grande | IFRN João Câmara |
| Agreste e Litoral Sul | IFRN Canguaretama |
| Terras Potiguares | IFESP Natal |

## Arte e interface

O mapa ocupa toda a largura da área de jogo. Destino, ação e indicadores aparecem em janelas semitransparentes, sem painel lateral ou lista de destinos. As cidades visitadas ficam verdes, sem check ou texto de conclusão. Os subtítulos dos destinos ainda não visitados mostram apenas o ganho de +50% no indicador específico. Os indicadores usam porcentagens, barras e cores do vermelho (0%) ao verde (100%). Todos os textos usam a fonte pixelada Press Start 2P, com tamanhos e espaçamentos adaptados aos controles, diálogos e mapa.

Os dez personagens têm retratos próprios em `assets/characters/npc-atlas-v5.png`, gerados pela ferramenta integrada de imagens e exibidos por uma grade CSS de 5 colunas e 2 linhas. O prompt completo está em `assets/characters/PROMPT.md`.

As janelas de visita destacam a instituição, seu nome completo e um link oficial. Em Angicos, o destino é a **INEAGRO CABUGI**, da UFERSA. A pesquisa e as fontes de todos os locais estão em [Instituições visitadas](data/instituicoes-fontes.md). As instituições são reais. Damásio foi incluído como professor da INEAGRO conforme orientação do usuário, em representação estilizada; as falas, rotas e recompensas são elementos ficcionais do jogo.

### Controles

- **Setas ou WASD:** caminhar por uma conexão revelada na direção escolhida. O destino é calculado pelas coordenadas dos pontos no mapa, em setores de 90 graus. Dentro do setor, tem prioridade a conexão mais alinhada; em empate, a mais próxima. Sem conexão naquela direção, o personagem fica parado.
- **Enter:** abrir a cidade selecionada; quando um botão tem foco, acionar esse botão.
- **1–9 e 0:** atalhos opcionais na ordem dos destinos definida em `app.js`; só abrem cidades reveladas.
- **V:** registrar a visita com o diálogo aberto.
- **Esc:** fechar o diálogo.
- **Tab / Shift+Tab:** percorrer os controles; **Enter / Espaço:** acionar o controle em foco.
- **Mouse ou toque:** abrir cidades e acionar botões. A seleção de texto fica desabilitada na interface.


O personagem percorre os segmentos do caminho com passos animados. Durante uma viagem, novos comandos de navegação são ignorados, sem fila de movimentos. A preferência do sistema por movimento reduzido elimina o deslocamento animado. Ao escolher um destino distante com mouse ou atalho, o percurso usa apenas conexões já reveladas.

O guia Prof. Damásio aparece em uma janela ampliada no canto inferior direito, usando o mesmo retrato de Angicos, contexto dos locais, orientações de deslocamento e mensagens de conquistas. O guia não sugere registrar visitas; essa decisão fica com o jogador. Os painéis são semitransparentes e permanecem visíveis, sem opção de minimizar.

### Som

`audio.js` sintetiza os efeitos com Web Audio, sem serviços externos ou arquivos para baixar: passos, chegada, entrada e saída dos locais, visita, descoberta e vitória. O mapa tem uma ambientação suave; cada local usa uma combinação própria de notas, com textura de vento e variação costeira. O primeiro clique ou tecla habilita o áudio conforme as regras do navegador. O botão **Som ligado / Som desligado** controla todos os sons e salva a preferência. O áudio é suspenso quando a aba fica oculta.

## Fonte territorial

Polos, sedes e eixos territoriais: [Edital nº 8/2026 da FAPERN — Programa Raízes da Inovação](https://cdn.tecconcursos.com.br/blog/uploads/9889/40b3ddda-830c-426a-bd1a-a2385dcfe747.pdf). Malha municipal: [IBGE — Rio Grande do Norte, 2024](https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2024/UFs/RN/).
