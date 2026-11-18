/* Life UP — cosméticos em pixel art (parte 3b)
   Cena de 32x32 pixels. O personagem fica no meio (origem CX,CY) e cada peça é uma camada.
   Cada desenho: linhas de texto, 1 letra = 1 pixel ('.' = transparente). Cores em PAL. */
const PAL = {
  K:'#231a2e', W:'#f4f0e6', w:'#d8d4cc', L:'#a9b4c8', l:'#6b6f80',
  G:'#f0c83c', Y:'#c9902a', R:'#e04848', r:'#a02c38', O:'#f08c2a', o:'#c45a1a',
  B:'#9a5a2a', b:'#6e3e1c', T:'#ecd9a6', D:'#c8a46a',
  U:'#3a72d8', u:'#24489a', C:'#7fd8f0', c:'#c8f4ff',
  V:'#5cb85c', v:'#2e7d4a', P:'#9a5ce0', p:'#5e3496',
  S:'#f6d2b0', s:'#e0aa84', H:'#1a1a1a', E:'#111111', M:'#c86a5a', F:'#f39ab8',
  J:'#3c5a8c', j:'#2c4470', A:'#d0d8e4', a:'#8a94a8', X:'#2a2a32', x:'#4a4a56',
};
const CX = 8, CY = 13;                       // canto do personagem (16x16) dentro da cena
const P = (x, y, art) => ({x, y, art});      // pedaço desenhado
const Q = (x, y, w, h, c) => ({x, y, w, h, c}); // retângulo de uma cor
const pc = (dy, art) => P(CX, CY + dy, art); // pedaço na posição do personagem

const CABECA = pc(0, [
  "................",
  ".....KKKKKK.....",
  "....KHHHHHHK....",
  "...KHHHHHHHHK...",
  "...KHSSSSSSHK...",
  "...KSSESSESSK...",
  "...KSSSSSSSSK...",
  "....KSSMMSSK....",
  ".....KKSSKK.....",
]);
const CASUAL = [pc(9, [
  "....KUUUUUUK....",
  "...KSUUGGUUSK...",
  "...KSUUUUUUSK...",
  "....KJJJJJJK....",
  "....KJJKKJJK....",
  "....KJJKKJJK....",
  "....KKKKKKKK....",
])];
const FUNDO_PADRAO = '#dfe9f5';

const LIVROS = [];   // estantes da biblioteca
[0,25].forEach(x => [3,9,15,21].forEach((y,i) => { for (let k = 0; k < 7; k++){ const baixo = (k+i)%3 === 0 ? 1 : 0;
  LIVROS.push(Q(x+k, y+baixo, 1, 3-baixo, ['#e04848','#3a72d8','#5cb85c','#f0c83c','#9a5ce0','#f08c2a','#7fd8f0'][(k+i*2)%7])); } }));

const SPR = {
  /* ---------- CABEÇA ---------- */
  gorro: [pc(-1, [
    ".......KK.......",
    "......KxXK......",
    "....KKXXXXKK....",
    "...KXXXXXXXXK...",
    "..KxXxXxXxXxXK..",
  ])],
  bandana: [pc(3, [
    "...KRRRRRRRRKK..",
    "...KrrrrrrrrKRK.",
    ".............KRK",
  ])],
  elmo: [pc(-2, [
    "........KK......",
    ".......KRRK.....",
    ".....KKKRKKK....",
    "....KAAAAAAK....",
    "...KAAWAAAAaK...",
    "...KAAWAAAAaK...",
    "...KAAAAAAAaK...",
    "...KKKKKKKKKK...",
    "...KAaAaAaAaK...",
    "....KAAAAAaK....",
  ])],
  chapeumago: [pc(-4, [
    ".........KK.....",
    "........KPK.....",
    ".......KPPK.....",
    "......KPPPK.....",
    ".....KPPGPPK....",
    "....KPPGGGPK....",
    "....KPPPGPPPK...",
    ".KKKKKKKKKKKKKK.",
    ".KppppppppppppK.",
    ".KKKKKKKKKKKKKK.",
  ])],
  coroa: [pc(-2, [
    "....K...K...K...",
    "....KK.KGK.KK...",
    "....KGKGGGKGK...",
    "....KGGGRGGGK...",
    "....KYYYYYYYK...",
  ])],
  aureola: [pc(-3, [
    ".....GGGGGG.....",
    "....GW....YG....",
    ".....GGGGGG.....",
  ])],

  /* ---------- ROUPA ---------- */
  pijama: [pc(0, [
    ".....KOKOKOK....",
    "...KKVVVVVVKK...",
    "..KVVVVVVVVVVK..",
    ".KVVVWVVVVWVVVK.",
    ".KVVKSSSSSSKVVK.",
    ".KV..........VK.",
    ".KV..........VK.",
    "..KV........VK..",
    "...KVVKSSKVVK...",
    "...KVVVVVVVVK...",
    "...KVVTTTTVVK...",
    "...KSVTTTTVSK...",
    "....KVVTTVVK....",
    "....KVVKKVVKK...",
    "....KVVKKVVVVK..",
    "....KKKKKKKKK...",
  ])],
  jaleco: [pc(9, [
    "...KWWWUUWWWK...",
    "...KWWLUULWWK...",
    "...KSWWUUWWSK...",
    "....KWWJJWRK....",
    "....KWJKKJWK....",
    "....KJJKKJJK....",
    "....KKKKKKKK....",
  ])],
  toalha: [pc(9, [
    "....KSSSSSSK....",
    "...KSKSsSsKSK...",
    "...KSKSSSSKSK...",
    "....KWWWWWLK....",
    "....KCCCCCCK....",
    "....KSSKKSSK....",
    "....KKKKKKKK....",
  ])],
  armadura: [pc(9, [
    "..KKAAAAAAAAKK..",
    "..KAKWAAAAaKAK..",
    "...KSKAGGAKSK...",
    "....KaGGGGaK....",
    "....KAAKKAAK....",
    "....KAaKKAaK....",
    "....KKKKKKKK....",
  ])],
  manto: [pc(9, [
    "...KPPPGGPPPK...",
    "..KPPPPGGPPPPK..",
    "..KPSPPGGPPSPK..",
    "...KPPPGGPPPK...",
    "...KPGPGGPPPK...",
    "..KPPPPGGPPPGK..",
    "..KKKKKKKKKKKK..",
  ])],
  capa: [pc(9, [
    "..KRKUUUUUUKRK..",
    ".KRKSUUGGUUSKRK.",
    ".KRKSUUUUUUSKRK.",
    ".KRRKGGGGGGKRRK.",
    ".KRRKUUKKUUKRRK.",
    "KRRRKbbKKbbKRRRK",
    "KKKKKKKKKKKKKKKK",
  ])],

  /* ---------- ITEM DE MÃO (na mão direita: x11, linha 11 do personagem) ---------- */
  espadatreino: [pc(2, [
    "............KK..",
    "...........KTDK.",
    "...........KTDK.",
    "...........KTDK.",
    "...........KTDK.",
    "...........KTDK.",
    "...........KTDK.",
    "...........KTDK.",
    "..........KbbbbK",
    "...........SbK..",
    "...........KbK..",
    "............K...",
  ])],
  esteto: [pc(8, [
    ".....l....l.....",
    ".....l....l.....",
    ".....l....A.....",
    ".....KAK..A.....",
    ".....KWK........",
    "......K.........",
  ])],
  refri: [pc(8, [
    "...........KKKK.",
    "...........KAAK.",
    "...........KRRK.",
    "...........SXXK.",
    "...........KRRK.",
    "...........KAAK.",
    "...........KKKK.",
  ])],
  cajado: [pc(-3, [
    "...........KKK..",
    "..........KcCCK.",
    "..........KCCuK.",
    "...........KKK..",
    "...........KbK..",
    "...........KBK..",
    "...........KBK..",
    "...........KBK..",
    "...........KBK..",
    "...........KBK..",
    "...........KBK..",
    "...........KBK..",
    "...........KBK..",
    "...........KBK..",
    "...........SBK..",
    "...........KBK..",
    "...........KBK..",
    "...........KbK..",
    "............K...",
  ])],
  arco: [pc(3, [
    "............KK...",
    "............KGK..",
    "............W.VK.",
    "............W.VK.",
    "............W..VK",
    "............W..VK",
    "............W..YK",
    "............W..VK",
    "...........SW..VK",
    "............W..VK",
    "............W.VK.",
    "............W.VK.",
    "............KGK..",
    "............KK...",
  ])],
  espadafogo: [pc(0, [
    "............R....",
    "...........RKR...",
    "..........ROAKR..",
    "..........RKAOR..",
    "..........OKAWKO.",
    "...........KAWKR.",
    "..........RKAWKO.",
    "..........OKAWK..",
    "...........KAWKR.",
    "..........RKAWKO.",
    "..........KGGGGK.",
    "...........SbK...",
    "...........KbK...",
    "...........KGK...",
    "............K....",
  ])],

  /* ---------- MASCOTE (em pé no chão, à esquerda) ---------- */
  gato: [P(0, 20, [
    "K.....K...",
    "KK...KK...",
    "KGKKKGK...",
    "KGGGGGK...",
    "KGEGEGK..K",
    "KGGFGGK.KG",
    ".KGGGK..KG",
    "KGOGOGK.KG",
    "KGGGGGGKGK",
    "KGKGKGGGK.",
    ".K.K.KKK..",
  ])],
  pato: [P(0, 21, [
    "..KKKK....",
    ".KGGGGK...",
    ".KGEGGKK..",
    ".KGGGKOOK.",
    "..KGGKOK..",
    "KKGGGGKK..",
    "KGGGGGGGK.",
    "KGGWGGGGK.",
    ".KGGGGGYK.",
    "..KKKKKK..",
  ])],
  coruja: [P(0, 9, [
    ".K.....K..",
    ".KKKKKKK..",
    "KBBBBBBBK.",
    "KWWBBBWWK.",
    "KWEWBWEWK.",
    "KWWBOBWWK.",
    ".KBBOBBK..",
    "KBDBBBDBK.",
    "KBBDDDBBK.",
    "KbBDDDBbK.",
    ".KBBBBBK..",
    "..KOKOK...",
  ])],
  raposa: [P(0, 20, [
    ".K....K...",
    "KOK..KOK..",
    "KOOKKOOK..",
    "KOOOOOOK..",
    "KWEOOEWK..",
    ".KWWWWK..K",
    "..KEEK..KO",
    ".KOOOOK.KO",
    "KOOWWOOKOK",
    "KOOWWOOOWK",
    "KOKOOKOKWK",
    ".K.KK.KKK.",
  ])],
  dragao: [P(0, 18, [
    "...K..K....",
    "..KYKKYK...",
    ".KRRRRRRK..",
    "KRRRRRRRRK.",
    "KRWERRWERK.",
    "KRRRRRRRRK.",
    "KRRMMMMRRK.",
    ".KRRFFRRK..",
    "KKKRRRRKKK.",
    "KOKRTTRKOK.",
    "KOORTTRROKK",
    ".KKRTTRRKRK",
    "..KRRRRRKRK",
    "..KRKKRK.K.",
    "..KK..KK...",
  ])],
  lobo: [P(0, 18, [
    "K.....K...",
    "KAK..KAK..",
    "KAAKKAAK..",
    "KAAAAAAK..",
    "KACAACAK..",
    "KAAAAAAK..",
    ".KAWWAK...",
    "..KEEK...K",
    ".KAAAAK.KA",
    "KAAWWAAKKA",
    "KAAWWAAAAK",
    "KAAAAAAAAK",
    "KAKAAKAKK.",
    ".K.KK.K...",
  ])],
  fenix: [P(0, 6, [
    "....R.....",
    "...ROR....",
    "...KKKK...",
    "..KOOOOK..",
    "..KOEOGK..",
    "R.KOOOKYK.",
    "RO.KOOK...",
    "ROOKOOOKOR",
    ".ROGOGOGOR",
    "..RGOGGOR.",
    "...KGGGK..",
    "...RKOKR..",
    "..R.ROR.R.",
    "....R.R...",
  ])],
  dragaoAsa: [],

  /* ---------- CENÁRIO (fundo da cena inteira) ---------- */
  quarto: { fundo:'#f2d9b0', partes:[
    Q(0,27,32,5,'#b07a48'), Q(0,27,32,1,'#8a5a30'), Q(0,29,32,1,'#9a6a3c'), Q(10,31,22,1,'#9a6a3c'),
    Q(1,3,9,9,'#8a5a30'), Q(2,4,7,7,'#2c3c78'), Q(5,4,1,7,'#8a5a30'), Q(2,7,7,1,'#8a5a30'),
    P(3,5,["GG"]), P(7,9,["W"]), P(3,9,["W"]),
    Q(0,2,2,11,'#e04848'), Q(9,2,2,11,'#e04848'), Q(0,2,11,1,'#a02c38'),
    Q(24,4,7,7,'#8a5a30'), Q(25,5,5,5,'#f4f0e6'),
    P(25,6,[".R.R.","RRRRR",".RRR.","..R.."]),
    Q(6,28,20,2,'#e04848'), Q(7,28,18,1,'#f08c2a'),
    P(26,15,[".KKKK.","KGGGGK","KGGGGK",".KKKK.","..Kb..","..Kb..","..Kb..","..Kb..","..Kb..",".KKKK.","KbbbbK","KKKKKK"]),
  ]},
  floresta: { fundo:'#a8dcf0', partes:[
    P(25,2,[".GGGG.","GGGGGG","GGGWGG","GGGGGG",".GGGG."]),
    P(12,3,[".WWW...","WWWWWW.",".WWWWWW"]),
    Q(0,27,32,5,'#6cc04a'), Q(0,27,32,1,'#4a9a36'), Q(0,30,32,2,'#4a9a36'),
    P(0,6,["..vvvv..",".vVVVVv.","vVVVVVVv","vVVvVVVv","vVVVVVVv","vVvVVVVv","vVVVVvVv",".vVVVVv.","..vbbv..","...bb...","...bb...","...bb...","...bb...","...bb...","...bb...","...bb...","...bb...","...bb...","...bb...","...bb...","..bbbb.."]),
    P(25,9,["..vvvv..",".vVVVVv.","vVVvVVVv","vVVVVVVv","vVVVVvVv","vvVVVVvv",".vVVVVv.","..vbbv..","...bb...","...bb...","...bb...","...bb...","...bb...","...bb...","...bb...","...bb...","...bb...","..bbbb.."]),
    P(8,26,["R"]), P(23,26,["F"]), P(27,28,["G"]), P(3,28,["W"]), P(14,30,["v"]), P(18,29,["v"]),
  ]},
  consultorio: { fundo:'#d8f0ea', partes:[
    Q(0,27,32,5,'#f4f0e6'), Q(0,27,32,1,'#a9b4c8'),
    P(0,28,["LL..LL..LL..LL..LL..LL..LL..LL..",".LL..LL..LL..LL..LL..LL..LL..LL.","..LL..LL..LL..LL..LL..LL..LL..LL","...L...L...L...L...L...L...L...L"].map(l => l.replace(/L/g,'w'))),
    Q(1,4,3,23,'#231a2e'), Q(2,5,1,4,'#e04848'), Q(2,9,1,4,'#f08c2a'), Q(2,13,1,4,'#f0c83c'), Q(2,17,1,4,'#5cb85c'), Q(2,21,1,5,'#3a72d8'),
    P(4,8,["K"]), P(4,13,["K"]), P(4,18,["K"]), P(4,23,["K"]),
    Q(23,3,8,7,'#231a2e'), Q(24,4,6,5,'#c8f4ff'),
    P(25,4,["..G..","GGGGG",".GGG.","GGGGG","..G.."]),
    P(25,16,["KK..KK","KTKKTK","KTTTTK","KbTTbK",".KTMK.","KTTTTK"]),
    Q(24,23,8,2,'#4a7fe0'), Q(24,22,8,1,'#231a2e'), Q(24,25,1,2,'#6b6f80'), Q(30,25,1,2,'#6b6f80'),
  ]},
  biblioteca: { fundo:'#3a2c5c', partes:[
    Q(0,27,32,5,'#2a2040'), Q(0,27,32,1,'#5e3496'),
    Q(0,3,7,24,'#6e3e1c'), Q(25,3,7,24,'#6e3e1c'),
    ...[0,25].flatMap(x => [6,12,18,24].flatMap(y => [Q(x,y,7,1,'#9a5a2a')])),
    ...LIVROS,
    P(11,2,["G","O","W","W","w"]), P(20,4,["G","O","W","W","w"]),
    P(15,1,["C"]), P(8,10,["c"]), P(23,1,["c"]), P(9,0,["C"]),
    P(10,29,["..CCCCCCCCCC..",".C..........C.","..CCCCCCCCCC.."].map(l=>l.replace(/\./g,'.'))),
  ]},
  castelo: { fundo:'#c8e0f8', partes:[
    Q(0,0,32,4,'#f7c6d9'), Q(0,4,32,3,'#e8cfe8'), Q(0,7,32,3,'#d8d8f0'),
    P(8,0,[
      ".......G.......",
      ".......K.......",
      "......KPK......",
      "..G..KPPPK..G..",
      "..K.KPPPPPK.K..",
      ".KPKKWWWWWKKPK.",
      "KPPPKWWuWWKPPPK",
      "KWWWKWWuWWKWWWK",
      "KWuWKWWWWWKWuWK",
      "KWWWKWWWWWKWWWK",
      "KWWWWWbbbWWWWWK",
      "KwwwwKbbbKwwwwK",
    ]),
    P(2,2,["G"]), P(28,1,["G"]), P(27,6,["W"]), P(4,8,["W"]),
    P(0,13,[".WWW....","WWWWW...","WWWWWWW.",".wwwww.."]),
    P(24,15,["..WWWW..",".WWWWWWW","WWWWWWWW","wwwwwww."]),
    Q(0,26,32,6,'#f4f0e6'),
    P(0,24,["..WW....WWW.......WWW.....WW..W.",".WWWW..WWWWW....WWWWW...WWWW.WWW"]),
    Q(0,30,32,2,'#c8d4ec'), P(0,29,["ww...ww...www....ww....www..www."]),
  ]},
};
delete SPR.dragaoAsa;

/* camada de cada categoria e ordem de desenho */
const CAMADAS = ['cen','roupa','cab','mao','pet'];
const NO_CORPO = {esteto:true};   // peças que só fazem sentido vestidas (imagem com o personagem)

function _pintar(px, partes, cores){
  for (const p of partes){
    if (p.art){
      p.art.forEach((l, y) => [...l].forEach((ch, x) => {
        if (ch !== '.' && PAL[ch]){ const X = p.x + x, Y = p.y + y; if (X>=0 && X<32 && Y>=0 && Y<32) px[Y*32+X] = cores ? cores : PAL[ch]; }
      }));
    } else {
      for (let y = p.y; y < p.y + p.h; y++) for (let x = p.x; x < p.x + p.w; x++)
        if (x>=0 && x<32 && y>=0 && y<32) px[y*32+x] = cores ? cores : p.c;
    }
  }
}
function _partesDe(id){ const s = SPR[id]; return !s ? [] : Array.isArray(s) ? s : s.partes; }

// pixels da cena: eq = {cab, roupa, mao, pet, cen}; op.semPersonagem, op.semFundo, op.sil (silhueta)
function cenaPixels(eq, op = {}){
  const px = new Array(32*32).fill(null);
  const sil = op.sil ? '#15121f' : null;
  if (!op.semFundo){
    const cen = eq.cen && SPR[eq.cen];
    px.fill(op.sil ? '#3a3450' : (cen ? cen.fundo : FUNDO_PADRAO));
    if (cen) _pintar(px, cen.partes, sil);
  }
  if (!op.semPersonagem){
    _pintar(px, [CABECA], sil);
    _pintar(px, eq.roupa && SPR[eq.roupa] ? SPR[eq.roupa] : CASUAL, sil);
    if (eq.cab) _pintar(px, _partesDe(eq.cab), sil);
    if (eq.mao) _pintar(px, _partesDe(eq.mao), sil);
  } else {
    ['roupa','cab','mao'].forEach(k => { if (eq[k]) _pintar(px, _partesDe(eq[k]), sil); });
  }
  if (eq.pet) _pintar(px, _partesDe(eq.pet), sil);
  return px;
}
// caixa em volta dos pixels pintados (para recortar a imagem da peça sozinha)
function _caixa(px){
  let x0 = 32, y0 = 32, x1 = -1, y1 = -1;
  px.forEach((c, i) => { if (c){ const x = i % 32, y = (i / 32) | 0; x0 = Math.min(x0,x); y0 = Math.min(y0,y); x1 = Math.max(x1,x); y1 = Math.max(y1,y); } });
  if (x1 < 0) return [0,0,32,32];
  const w = x1 - x0 + 1, h = y1 - y0 + 1, t = Math.max(w, h) + 2;
  return [x0 - (t - w)/2, y0 - (t - h)/2, t, t];
}
function svgPixels(px, caixa = [0,0,32,32]){
  let r = '';
  for (let y = 0; y < 32; y++){
    let x = 0;
    while (x < 32){
      const c = px[y*32+x];
      if (!c){ x++; continue; }
      let n = 1; while (x+n < 32 && px[y*32+x+n] === c) n++;
      r += `<rect x="${x}" y="${y}" width="${n+.02}" height="1.02" fill="${c}"/>`;
      x += n;
    }
  }
  return `<svg viewBox="${caixa.join(' ')}" shape-rendering="crispEdges" style="width:100%;height:100%;display:block">${r}</svg>`;
}
// imagem de uma peça sozinha (galeria, baú); sil = silhueta preta
function svgPeca(id, cat, sil = false){
  if (cat === 'cen') return svgPixels(cenaPixels({cen:id}, {semPersonagem:true, sil}));
  const eq = {[cat]: id};
  const px = cenaPixels(eq, {semFundo:true, semPersonagem: cat !== 'roupa' && !NO_CORPO[id], sil});
  return svgPixels(px, _caixa(px));
}
// cena da peça vestida, recortada em volta do personagem (zoom da galeria)
function svgPrevia(cat, id){
  if (cat === 'cen') return svgPixels(cenaPixels({cen:id}));
  const [x, y, t] = _caixa(cenaPixels({[cat]: id}, {semFundo:true}));
  return svgPixels(cenaPixels({[cat]: id}), [x - 1, y - 1, t + 2, t + 2]);
}
// cena completa (Perfil, Visual)
const svgCena = eq => svgPixels(cenaPixels(eq));
// avatar do topo: recorte em volta do personagem, sem mascote
const svgAvatar = eq => svgPixels(cenaPixels({...eq, pet:null}), [5, 8, 22, 22]);
