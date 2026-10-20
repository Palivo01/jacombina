/* Configuração comercial central. O contato foi mantido exatamente como informado.
   Confirme o número com a organização antes da publicação: ele contém 8 dígitos
   após o DDD. Não foi acrescentado um dígito automaticamente. */
window.OPEN_CONFIG = Object.freeze({
  whatsapp: '557499640640',
  contactDisplay: '74 9964-0640',
  maps: 'https://www.google.com/maps/place/Jacombina+Sport+Bar/@-11.1754034,-40.5437022,17z/data=!3m1!4b1!4m6!3m5!1s0x76cf3e49b3da853:0x937efb4e4fc73a67!8m2!3d-11.1754034!4d-40.5411273!16s%2Fg%2F11cm_qbs1j',
  latitude: -11.1754034,
  longitude: -40.5411273,
  // Perfis independentes: o infantil nunca altera as opções do adulto.
  uniforms: {
    adult: {sizes:['P','M','G','GG'], models:[['tradicional','Tradicional']]},
    female: {sizes:['P','M','G','GG'], models:[['tradicional','Tradicional'],['baby-look','Baby Look']]},
    child: {sizes:['10 anos','12 anos','14 anos','P adulto','M adulto','G adulto'], models:[['tradicional','Tradicional']]}
  },
  categories: [
    {id:'kids', name:'Kids', schedule:'19/11 • 18h'},
    {id:'aprendiz', name:'Aprendiz', schedule:'20/11 • 18h • Duas quadras'},
    {id:'misto-iniciante', name:'Misto Iniciante', schedule:'21/11 • 13h'},
    {id:'qualify', name:'Qualify', schedule:'21/11 • 16h30'},
    {id:'intermediario', name:'Intermediário', schedule:'22/11 • 13h'},
    {id:'misto-aberto', name:'Misto Aberto', schedule:'22/11 • 9h'},
    {id:'feminino', name:'Feminino C + D', schedule:'21/11 • 9h'}
  ]
});
