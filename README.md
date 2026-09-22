# Potideia — Com a ciência, a terra árida floresce

Jogo cooperativo 2D, em HTML e JavaScript, sobre os ecossistemas de inovação do Rio Grande do Norte. O ponto de partida é Mossoró e o objetivo é equilibrar os indicadores que fazem um parque científico e tecnológico florescer.

## Jogar

Não há servidor, instalação ou comando para executar. Basta abrir `index.html` no navegador (inclusive com duplo clique). A malha do mapa é carregada como um script local, compatível com o protocolo `file://`.

Ao abrir o jogo, o Prof. Damásio apresenta a missão de construir um parque científico e tecnológico em Mossoró por meio de parcerias. O botão **Entendi** leva ao mapa. A apresentação reaparece ao reiniciar a partida; abrir o jogo novamente não apaga o progresso salvo.

O progresso da partida — visitas, indicadores, cidade selecionada e diário — fica salvo apenas no navegador, em `localStorage`. Use **Reiniciar jogo**, em destaque no cabeçalho, para começar novamente após confirmar. O logotipo volta ao mapa sem apagar o progresso.

## Mecânica da V1

A partida começa com apenas Mossoró revelada. Em cada local, o menu **Firmar parceria?** abre com **Não** selecionado. Escolher **Sim** concede 1/14 do escore geral e uma fração do indicador específico, conforme o número de destinos que contribuem para ele e revela os caminhos e destinos adjacentes. Escolher **Não**, fechar a janela ou pressionar Esc volta ao mapa sem conceder pontos nem revelar conexões. É possível retornar depois e decidir novamente. Cada cidade concede pontos uma única vez; parcerias já firmadas continuam abertas para consultar o diálogo. O progresso salvo anteriormente é preservado. A navegação entre cidades acontece no mapa, após fechar a janela do local.

| Indicador | Limiar de vitória | Visitas que o aumentam |
| --- | ---: | --- |
| Ciência | 100% | Pau dos Ferros, Angicos |
| Tecnologia | 100% | Mossoró, São Paulo do Potengi, Currais Novos |
| Meio Ambiente | 100% | Caraúbas, Santa Cruz, Macaíba |
| Cidadania | 100% | Caicó, Natal |
| Recursos | 100% | João Câmara, Canguaretama, Parnamirim, Assu |

A equipe vence quando todos os cinco indicadores chegam a `100%`. O escore geral chega a `100%` quando todas as visitas foram registradas.

### Rota de partida e prioridade

A partida começa no mapa com **Mossoró** selecionada, sede do Parque Científico e Tecnológico em construção. A rota inicial prioritária é a rede UFERSA:

1. UFERSA Mossoró — Tecnologia
2. UFERSA Caraúbas — Meio Ambiente / semiárido
3. UFERSA Angicos — Ciência / formação avançada

Os demais polos aparecem no mapa conforme as visitas revelam conexões. O progresso salvo anteriormente é preservado; as rotas reveladas são reconstruídas a partir das cidades já visitadas.

## Tabuleiro

`data/RN_Municipios_2024.zip` é a malha municipal oficial do IBGE baixada para o projeto. O arquivo é preservado como fonte; `data/rn-municipios.geojson` é sua conversão de referência e `data/rn-municipios.js` é a versão incorporada pela página estática. O tabuleiro desenha os 167 municípios do RN e destaca 14 cidades jogáveis.

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
| Terras Potiguares | Sebrae Natal |

## Arte e interface

O mapa ocupa toda a largura da área de jogo. Destino, ação e indicadores aparecem em janelas semitransparentes, sem painel lateral ou lista de destinos. As cidades visitadas ficam verdes, sem check ou texto de conclusão. Os subtítulos dos destinos ainda não visitados mostram apenas o ganho no indicador específico. Os indicadores usam porcentagens, barras e cores do vermelho (0%) ao verde (100%). Todos os textos usam a fonte pixelada Press Start 2P, com tamanhos e espaçamentos adaptados aos controles, diálogos e mapa.

Os personagens originais têm retratos próprios em `assets/characters/npc-atlas-v5.png`, gerados pela ferramenta integrada de imagens e exibidos por uma grade CSS de 5 colunas e 2 linhas. O prompt completo está em `assets/characters/PROMPT.md`.

As janelas de visita destacam a instituição, seu nome completo e um link oficial. Em Angicos, o destino é a **INEAGRO CABUGI**, da UFERSA. A pesquisa e as fontes de todos os locais estão em [Instituições visitadas](data/instituicoes-fontes.md). As instituições são reais, exceto a empresa genérica de energia solar de Assu, representada sem nome ou marca. O encontro do ELI Agro em Parnamirim foi escolhido para o jogo; a fonte descreve uma rede estadual. Damásio foi incluído como professor da INEAGRO conforme orientação do usuário, em representação estilizada; as falas, rotas e recompensas são elementos ficcionais do jogo.

### Controles

- **Setas ou WASD:** caminhar por uma conexão revelada na direção escolhida, incluindo diagonais. Uma cidade acima pode ser alcançada com a tecla para cima mesmo estando mais à esquerda ou à direita. Tem prioridade a conexão mais alinhada à direção; em empate, a mais próxima. Cidades do lado oposto ou sem caminho revelado não entram na escolha. Sem conexão naquela direção, o personagem fica parado.
- **Enter:** abrir a cidade selecionada; quando um botão tem foco, acionar esse botão.
- **1–9 e 0:** atalhos opcionais na ordem dos destinos definida em `app.js`; só abrem cidades reveladas.
- **Setas ou WASD no menu de parceria:** alternar entre Sim e Não; **Enter / Espaço:** confirmar a opção em foco. O padrão a cada abertura é **Não**. O antigo atalho V não firma parcerias.
- **Esc:** fechar o diálogo.
- **Tab / Shift+Tab:** percorrer os controles; **Enter / Espaço:** acionar o controle em foco.
- **Mouse ou toque:** abrir cidades e acionar botões. A seleção de texto fica desabilitada na interface.


O personagem percorre os segmentos do caminho com passos animados. Durante uma viagem, novos comandos de navegação são ignorados, sem fila de movimentos. A preferência do sistema por movimento reduzido elimina o deslocamento animado. Ao escolher um destino distante com mouse ou atalho, o percurso usa apenas conexões já reveladas.

O guia Prof. Damásio aparece em uma janela ampliada no canto inferior direito, usando o mesmo retrato de Angicos, contexto dos locais, orientações de deslocamento e mensagens de conquistas. O guia não sugere registrar visitas; essa decisão fica com o jogador. Os painéis são semitransparentes e permanecem visíveis, sem opção de minimizar.

### Som

`audio.js` sintetiza os efeitos com Web Audio, sem serviços externos ou arquivos para baixar: passos, chegada, entrada e saída dos locais, visita, descoberta e vitória. O mapa tem uma ambientação suave; cada local usa uma combinação própria de notas, com textura de vento e variação costeira. O primeiro clique ou tecla habilita o áudio conforme as regras do navegador. O botão **Som ligado / Som desligado** controla todos os sons e salva a preferência. O áudio é suspenso quando a aba fica oculta.

## Fonte territorial

Polos, sedes e eixos territoriais: [Edital nº 8/2026 da FAPERN — Programa Raízes da Inovação](https://cdn.tecconcursos.com.br/blog/uploads/9889/40b3ddda-830c-426a-bd1a-a2385dcfe747.pdf). Malha municipal: [IBGE — Rio Grande do Norte, 2024](https://geoftp.ibge.gov.br/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2024/UFs/RN/).

## Expansão dos destinos

- Parnamirim: ELI Agro — Recursos.
- Currais Novos: SeriHub — Tecnologia.
- Macaíba: EAJ/UFRN — Meio Ambiente.
- Assu: empresa de energia solar sem nome divulgado — Recursos. A NPC é uma engenheira com capacete amarelo, camisa azul e painel solar, sem marcas. A proposta é investir na iniciativa de pesquisa e avaliar os incentivos da Lei do Bem (Lei nº 11.196/2005), conforme a elegibilidade da empresa e do projeto; não representa concessão automática de benefício por firmar parceria.
- Natal: Sebrae RN, recebido por um consultor de negócios fictício.

Mossoró liga-se a Assu, que se conecta a Angicos. São Paulo do Potengi chega a Natal passando por Macaíba. Não há ligação direta Mossoró–Angicos, Natal–São Paulo do Potengi, Caicó–Natal ou Caicó–Pau dos Ferros. Rotas só aparecem após uma parceria. Na malha do IBGE, Açu é apresentado como Assu.

São 14 destinos. Cada parceria vale uma fração igual do indicador correspondente: Ciência e Cidadania têm 2 destinos, Tecnologia e Meio Ambiente têm 3, Recursos tem 4. Os percentuais acumulados são calculados a partir das quantidades e arredondados para exibição, sem acumular erros. Partidas anteriores preservam suas parcerias, com percentuais recalculados para a rede ampliada. Currais Novos usa `assets/characters/npc-expansion.png`; Assu, Natal, Macaíba, Parnamirim, João Câmara e Canguaretama usam retratos individuais em `assets/characters/`.
