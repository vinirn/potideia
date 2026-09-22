# Retratos dos personagens

## Regra de contorno para novos retratos

Seguir o acabamento do professor Damásio em `npc-atlas-v5.png`: a silhueta é definida pelas cores da pele, do cabelo e da roupa, com pequenos pixels de luz quente nas bordas. Não traçar uma linha escura contínua em volta do corpo, do rosto, das mãos ou dos objetos, nem desenhar linhas pretas grossas nas dobras. Manter pixels quadrados visíveis e anatomia humana natural. Essa correção foi aplicada aos retratos individuais de Assu, Macaíba, Natal e Parnamirim.

## Roupas leves: npc-parnamirim-v2.png, npc-joao-camara-v2.png e npc-canguaretama-v2.png

Retratos individuais com fundo transparente, gerados pela ferramenta integrada image_gen. Clara, Rafa e Lu mantêm os rostos, objetos e cores que os identificam, mas não usam mais colete, jaqueta ou moletom. As roupas são camisas leves de manga curta, adequadas ao clima do Rio Grande do Norte. Clara também passou a ter cabelo liso, mantendo o castanho escuro original.

Instrução para futuras versões: evitar jaquetas, coletes, moletons e outras camadas pesadas nos NPCs; preservar a estética pixel art retrô dos anos 80 e as proporções humanas naturais. Clara usa camisa clara e segura uma muda; Rafa usa polo laranja e carrega caderno azul; Lu usa camisa verde-azulada e segura caderno e caneta. Fundo transparente, sem texto, marcas nem cenário.

## Natal e Macaíba: npc-natal-v2.png e npc-macaiba-v2.png

Retratos individuais com fundo transparente, gerados pela ferramenta integrada image_gen a partir dos respectivos quadros de `npc-expansion.png`. Lia e Damásio em `npc-atlas-v5.png` serviram de referência para proporções faciais adultas, luz dourada e qualidade de acabamento.

Instrução para futuras versões: manter pixel art retrô dos anos 80, com pixels quadrados visíveis, blocos de cor e pontilhamento deliberado, mas rostos humanos mais realistas que cartunescos. Evitar olhos exagerados, contornos vetoriais grossos e gradientes lisos. Natal mantém o consultor de camisa azul-clara, crachá sem texto e pasta; Macaíba mantém o professor grisalho de camisa bege e caderno verde. Retratos isolados da cintura para cima, sem marcas, texto ou cenário.

## Engenheira de Assu: npc-assu-v2.png

Retrato individual com fundo transparente, gerado pela ferramenta integrada image_gen a partir da engenheira no quinto quadro de `npc-expansion.png`. A arte usa Lia e Damásio em `npc-atlas-v5.png` como referências de enquadramento e luz, sem alterar os demais personagens do atlas de expansão.

Instruções obrigatórias para futuras versões:

- Usar estética de jogo de fliperama dos anos 80, com pixels quadrados nítidos e visíveis, bordas em degraus e blocos de cor bem definidos.
- Usar paleta limitada e pontilhamento de pixels (*dithering*) intencional; evitar gradientes lisos, suavização de bordas, aparência vetorial e pintura fotorrealista.
- Aproximar o realismo dos rostos de Lia (Mossoró) e Damásio (Angicos): proporções humanas adultas, olhos de tamanho natural, nariz e mandíbula plausíveis, sorriso discreto, mãos anatomicamente coerentes e luz dourada contida. Evitar traços de desenho animado ou anime.
- Preservar a engenheira adulta, capacete amarelo, camisa azul, painel solar seguro com as duas mãos, retrato isolado da cintura para cima e fundo transparente.
- Manter todo o capacete, mãos e painel dentro do quadro; não incluir texto, marcas, cenário nem outros personagens.

Prompt final: redesenhar a engenheira solar de Assu como retrato individual em pixel art de fliperama dos anos 80, com pixels quadrados nítidos, paleta limitada, blocos de cor, pontilhamento deliberado e luz dourada nas bordas; conferir ao rosto proporções naturais de uma profissional brasileira adulta, sombreamento e textura detalhados como os retratos de Lia e Damásio, sem olhos grandes ou sorriso cartunesco; preservar pele morena, capacete amarelo, cabelo escuro preso, camisa de trabalho azul-marinho e painel solar azul seguro com as duas mãos; fundo transparente, sem cenário, marca ou texto.

## Expansão: npc-expansion.png

Gerado pela ferramenta integrada image_gen. Cinco retratos em uma fileira: Natal (consultor Sebrae), Parnamirim (articuladora ELI Agro), Currais Novos (cientista de saúde), Macaíba (professor de ciências agrárias) e Assu (engenheira solar). Personagens fictícios, sem marcas. O atlas original e Damásio foram preservados.

Prompt:

Create one game NPC sprite atlas, exactly FIVE equally sized square cells in ONE horizontal row, canvas aspect ratio 5:1. Each cell has one friendly mature Brazilian professional from waist up, centered with generous margins. Polished retro pixel art, visible crisp pixel blocks, warm highlights, dark navy plain background, no text, no letters, no logos, no grid borders. Left to right: 1 male business consultant short dark hair, light blue dress shirt and blue lanyard with blank ID badge, holding folder; 2 female agribusiness innovation advisor brown skin, curly hair, green field vest holding seedling; 3 female health innovation scientist black skin, short natural hair, white lab coat teal shirt, tablet; 4 male agricultural professor tan skin greying hair, beige collared shirt holding notebook; 5 female solar energy engineer tan skin, yellow safety helmet, navy work shirt, holding small blue solar panel. Distinct faces and silhouettes. Exact five-cell alignment for CSS background position. No real person likeness, no corporate identifying marks. All heads and hands wholly inside own cells.

## Arte atual: npc-atlas-v5.png

Ferramenta integrada image_gen. Barba um pouco mais curta; óculos azuis, cabeça careca e camisa social lisa preservados. Aplicada ao guia e ao receptor de Angicos.

Prompt:

Use case: precise-object-edit. Edit ONLY the beard on the THIRD character in the TOP ROW of this exact 5-column/2-row NPC atlas (Professor Damásio: fully bald head, blue rectangular glasses, solid teal formal shirt, tablet). SHORTEN his current long beard moderately, by approximately 30 percent of its extension below the chin. Keep a full well-groomed dark beard, rounded tapered shape, and graduated fade on upper cheeks, but make it clearly shorter and more compact than the input. Do not remove the beard. Preserve his face likeness, smile, blue eyeglasses, fully bald head, solid dress shirt, hands, tablet, pose, every other character, pixel-art style, colors, lighting, canvas dimensions, exact atlas grid, and background/alpha. No other changes. No text.

## Versão em uso: npc-atlas-v4.png

Ferramenta integrada image_gen. Damásio usa camisa social lisa, barba maior e óculos azuis, conforme as últimas correções do usuário. Mesma arte no guia e em Angicos.

Prompt da camisa:

Use case: precise-object-edit. Edit target: the attached 5-column by 2-row NPC atlas for Potideia. Change ONLY the SHIRT of the THIRD character in the TOP ROW (Professor Damásio, fully bald man with no glasses and faded dark beard holding a tablet). Replace his green checkered/plaid shirt with a neat SOLID dark teal formal button-up dress shirt, crisp collar, natural fabric folds, NO CHECKS, NO PLAID, NO STRIPES, NO PATTERN, no logo, no tie. Keep his face, skin tone, fully bald scalp, eyes, smile, graduated fade beard, ears, hands, tablet, pose, body proportions, lighting and pixel-art treatment identical. Keep all other nine characters untouched. Preserve original canvas dimensions, exact equal 5 by 2 grid and portrait positions, background and transparency. No added text or objects. This is a shirt-only edit.

Prompt final da barba e dos óculos:

Use case: precise-object-edit. Edit ONLY the THIRD character in the TOP ROW of this 5-column by 2-row pixel-art portrait atlas: Professor Damásio, the fully bald man with the solid teal dress shirt holding a tablet. Give him a noticeably longer and fuller dark beard, extending farther down below the chin, with the graduated fade still visible along the upper cheeks. ADD tasteful clearly BLUE rectangular eyeglass frames with transparent lenses, eyes still clearly visible. Maintain likeness, warm light skin, friendly smile, completely bald head, solid unpatterned teal dress shirt, tablet, hands, pose, scale, pixel-art lighting. Keep all other nine portraits completely unchanged. Preserve exact original image size, grid alignment, five equal columns/two equal rows, transparent background. No added words, no labels. Only two changes: fuller longer beard and BLUE-FRAMED GLASSES on the third top-row character.

## Versão final: npc-atlas-v3.png

Edição pela ferramenta integrada image_gen, usando a foto enviada pelo usuário como referência de Damásio: sem óculos, totalmente careca e barba em degradê. Usada no local de Angicos e no guia. A foto original não é distribuída com o jogo.

Prompt de edição:

Use case: identity-preserve. Image 1 is the EDIT TARGET: a 5-column, 2-row NPC portrait atlas. Image 2 is the user's PHOTO REFERENCE for Professor Damásio's likeness. Edit ONLY the third portrait in the TOP ROW of Image 1. Correct that character to resemble the man in the supplied photo: completely shaved BALD head with NO hair anywhere on scalp or sides, NO eyeglasses, no sunglasses, natural dark eyebrows, face proportions and warm light skin tone matching reference, dark beard with a precise gradual fade (very short along upper cheeks and temples, progressively fuller toward chin), connected moustache, approachable gentle smile. Use a dark green subtle checkered button-up shirt inspired by photo and preserve his tablet, waist-up pose and friendly professorial presence. Keep polished pixel-art style and warm rim lighting of atlas. The other NINE portraits must remain unchanged. Preserve exact original canvas size, five equal columns and two equal rows, every character position, original alpha/background, grid boundaries and portrait scale. No text or labels. Crucial corrections: fully bald including side of head; NO GLASSES; beard fade, NOT uniformly bushy beard. User supplied photo is likeness reference only; do not copy its photographic background.

## Versão atual: npc-atlas-v2.png

Edição pela ferramenta integrada image_gen. O terceiro retrato representa o professor Damásio da INEAGRO, conforme descrição do usuário.

Prompt de edição:

Use case: precise-object-edit. Edit target: attached Potideia NPC portrait atlas, exactly 5 columns and 2 rows. Change ONLY the third character in the top row (the woman in purple holding a tablet) into Professor Damásio, a white Brazilian middle-aged man with a bald head and full neatly kept dark beard, a friendly thoughtful expression, wearing a casual dark teal collared shirt and holding a tablet or notebook, a university professor and member of INEAGRO CABUGI. Follow the user's supplied description; this is a stylized game character. Match the existing pixel-art rendering and golden rim light exactly. Keep his portrait completely inside the same third cell, same waist-up framing and scale. Preserve all other NINE portraits, their positions, faces, clothes, color palette, canvas dimensions, exact five-by-two grid, background and alpha unchanged. No added text, labels, borders, no other edits.

Ferramenta: geração integrada de imagens (image_gen), sem CLI.
Arquivo: `npc-atlas.png`. Grade: cinco colunas e duas linhas, na ordem das cidades em `app.js`.

## Prompt usado

Use case: stylized-concept. Asset type: single NPC portrait atlas for Potideia, a Brazilian educational pixel-art exploration game in Rio Grande do Norte. Create ONE precisely aligned sprite sheet of TEN distinct detailed waist-up character portraits in exactly 5 equal columns and 2 equal rows. Landscape canvas 5:2 aspect ratio if possible. All ten cells identical size, no gutters, no borders, no text or logos. Each portrait fully contained with generous padding inside its cell, uniformly dark plum background #211632. Rich polished 32-bit pixel art with crisp square pixels, expressive warm faces, coherent golden rim lighting, cyan/coral/mustard accents. Diverse Brazilian adults, respectful contemporary clothes. EXACT row-major order: 1 professor Lia, middle-aged brown-skinned woman curly dark hair, round glasses, white laboratory coat and teal blouse holding notebook; 2 Caio agro-innovator, brown-skinned young man short black hair, green work shirt, holding a small seedling; 3 Nina graduate researcher, young Black woman natural curly hair, violet jacket and mustard shirt with tablet; 4 Ze radio communicator, older brown-skinned man gray moustache, ochre shirt holding portable radio; 5 Dona Bia community leader, older Black woman gray curly hair, coral blouse, warm confident smile; 6 Dr Tom, brown-skinned man dark beard and glasses, white coat over teal medical shirt; 7 Maya inventor, young brown-skinned woman short dark hair, cyan overalls, holding small circuit board; 8 Rafa network organizer, Black young adult with short curly hair, orange jacket, blue notebook; 9 Lu researcher, young light-brown-skinned woman long dark braid, teal fieldwork vest, notebook; 10 Mestre No cultural guide, older brown-skinned man white curly hair and beard, cream linen shirt, subtle patterned scarf. Distinct silhouettes, individual expressions, visible hands drawn carefully. No caricature, no repeated generic faces. This image will be displayed by CSS background-position as a 5 by 2 atlas; exact grid alignment essential.
