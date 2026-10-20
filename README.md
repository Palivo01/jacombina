# 5º Open do Jacombina • Versão 2.0

Site estático em HTML, CSS e JavaScript puro. Sem dependências, GA4, Pixel ou outro rastreador. Sem publicação automática.

## Abrir e hospedar

Extraia o ZIP e abra `index.html`. Para prévia por HTTP, execute `python3 -m http.server 8080` nesta pasta e abra `http://localhost:8080`.

Cloudflare Pages por GitHub: envie o conteúdo da pasta a um repositório, selecione framework `None`, deixe o comando de build vazio e use `.` como diretório de saída. Em upload direto, envie a pasta extraída que contém index.html. Este projeto não foi publicado e não contém configuração de DNS.

## Recursos

- Identidade visual com os materiais fornecidos, imagens otimizadas em WebP e favicon.
- Navegação responsiva, movimentos suaves com respeito à preferência de movimento reduzido.
- Sete categorias com seleção múltipla.
- Atleta 1 obrigatório em cada categoria. Atleta 2 obrigatório ou opção “Dupla a escolher”.
- Kids: um atleta Kids e um adulto, com indicação na programação, FAQ e formulário.
- Mensagem com dupla em uma linha: João/Bia ou João/Dupla. Sem valor divulgado ou autorização na mensagem.
- Nomes de cada categoria são independentes. Ao remover e selecionar a mesma categoria novamente durante a sessão da página, os nomes são recuperados. Não há armazenamento persistente de dados pessoais.
- Revisão antes do envio pelo WhatsApp, com nomes e situação da dupla por categoria.
- Validação de nomes, telefone e duplas com nomes iguais.
- Programação informada para 19 a 22 de novembro de 2026.
- Mapa incorporado e rotas Google Maps/Waze, usando as coordenadas do link fornecido (-11.1754034, -40.5411273).
- Crédito Primviz no rodapé.

## Atenção ao contato de inscrição

O contato foi preservado exatamente como recebido: **74 9964-0640**. Ele contém oito dígitos após o DDD. O destino do botão é `557499640640`, sem acrescentar dígitos por suposição. Confirme com a organização o número WhatsApp correto antes de colocar o site em produção. Se houver um nono dígito, atualize `whatsapp` e `contactDisplay` em `assets/js/config.js`, além do texto de contato em `index.html` (rodapé e fallback sem JavaScript). O link foi gerado e sua mensagem verificada, mas a existência da conta WhatsApp não foi confirmada e nenhuma mensagem real foi enviada.

## Uniformes por atleta

Cada atleta tem short e blusa independentes. As regras ficam em `uniforms` no config.js:

- Adultos: P, M, G e GG, modelo tradicional.
- Misto Iniciante e Misto Aberto: primeiro campo identifica o homem (tradicional); segundo identifica a mulher (tradicional ou Baby Look).
- Feminino C + D: as duas atletas podem escolher tradicional ou Baby Look.
- Kids: primeiro atleta é infantil, com short e blusa de 10 anos, 12 anos, 14 anos, P adulto, M adulto ou G adulto. O segundo atleta é adulto, com P, M, G ou GG. Sem Baby Look no Kids.
- Demais categorias: sem Baby Look.

O modelo tradicional é automático quando é a única opção. A mensagem mantém João/Bia ou João/Dupla e acrescenta uniforme por nome: `Bia: Short P | Blusa MBLK`. Para o infantil, mantém o tamanho explícito: `Short 12 anos | Blusa P adulto`. Sem parceiro definido, o uniforme dele fica a definir. As escolhas são preservadas ao alternar Dupla a escolher e ao remover e selecionar novamente a categoria durante a sessão.

## Inscrição e valor

O valor divulgado é R$ 160 por atleta. Não foi inventada cobrança por categoria, soma de valores, desconto, PIX ou condição comercial. A organização confirma pagamento e condições para quem selecionar várias categorias.

O formulário monta uma solicitação; não há banco de dados, reserva automática de vaga, pagamento ou inscrição concluída no site. O visitante deve enviar a mensagem no WhatsApp e aguardar a confirmação. Os dados são mostrados apenas nesta sessão e enviados ao WhatsApp ao clicar na ação final.

## Editar

- `index.html`: textos, seções e programação.
- `assets/css/style.css`: cores, layouts responsivos e animações.
- `assets/js/config.js`: contato, categorias e localização.
- `assets/js/script.js`: seleção, duplas, validação, revisão e link WhatsApp.
- `assets/images/`: materiais reais enviados, otimizados para web.

## SEO e domínio

Title, description, Open Graph e favicon estão presentes. Após escolher o domínio real, configure a URL canônica e URLs absolutas de compartilhamento. `robots.txt` permite indexação. O sitemap não foi preenchido com domínio fictício: inclua sitemap.xml com a URL real após definir o endereço de publicação e declare-o em robots.txt.

## Verificação

JavaScript conferido sintaticamente. Estrutura HTML, referências a assets, ausência de rastreadores e fluxo do formulário verificados localmente. A prévia visual em navegador não ficou disponível nesta sessão; confira o layout nos seus dispositivos antes de publicar. Google Maps/Waze dependem de conexão. O mapa pode não aparecer ao abrir o HTML local em navegadores com restrições a iframes externos.

## Revisão V1.4

Feminino com dois blocos visíveis e identificados de uniforme, um por atleta, e tamanhos de short e blusa independentes. Apenas o uniforme da parceira ainda não definida é ocultado ao marcar Dupla a escolher. Referências de CSS e JavaScript versionadas para evitar a reutilização de arquivos anteriores pelo cache ao republicar.

## Publicação V1.5: arquivos de código com nomes exclusivos

Diagnóstico observado no site publicado: HTML com as instruções novas de uniforme, mas formulário executado com código antigo (zero seletores de uniforme). A versão local contém os campos. A causa exata pode ser arquivos antigos na publicação ou em cache; o navegador observado carregava script.js sem versão.

Esta entrega usa referências a CSS e JavaScript com assinatura do conteúdo no próprio nome. Assim, a página nova solicita arquivos novos em vez de reutilizar os antigos. Headers pedem revalidação e evitam cache de HTML no CDN quando suportado pela hospedagem.

Para atualizar o site, envie **todo o conteúdo deste ZIP** à mesma raiz, incluindo index.html, pasta assets inteira e _headers. Não atualize apenas index.html, config.js ou script.js. A publicação não foi realizada nesta sessão.

Se editar os arquivos-base em assets/css ou assets/js, execute `python3 preparar-publicacao.py` antes de reenviar todo o pacote. O script gera os arquivos com nomes exclusivos e atualiza as referências do HTML automaticamente.

Depois de publicar, a meta site-version deve ser 2.0. Abra uma janela anônima para conferir. Caso o HTML antigo continue sendo entregue, limpe o cache do domínio no painel da hospedagem/Cloudflare. Isso não é necessário para novos arquivos de código com nomes diferentes.

Na V1.5, todos os CTAs de inscrição (incluindo o botão fixo mobile) apontam diretamente para #registration-form, iniciando na seleção das categorias, em vez de parar no bloco de apresentação/valor. O espaçamento do cabeçalho fixo é respeitado.

## V2.0: campos obrigatórios com asterisco vermelho dinâmico

O asterisco aparece enquanto o campo está vazio ou inválido e desaparece quando válido. A seleção de categorias, nomes, WhatsApp e cada seleção de uniforme são acompanhados. Nomes precisam de pelo menos dois caracteres; nomes iguais da mesma dupla continuam pendentes. WhatsApp precisa passar pela validação com DDD. Se apagar ou invalidar uma resposta, o asterisco volta. Campos do parceiro a escolher e modelo fixo automático não exigem marcação. `required` e `aria-required` permanecem para acessibilidade. As regras de uniforme, mensagem e CTAs diretos ao formulário foram mantidas.
