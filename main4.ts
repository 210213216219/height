import heights from "./height.json";

let html = `
<meta charset=utf-8 content='maximum-scale=yes initial-scale=yes'name=viewport>
<title>Equine Height List</title>
<style>
s {
  padding: 0 1ch;
  text-decoration: unset;
  background-color: #333
}
a {
  width: 18ch;
  padding: 0 1ch;
  background-color: #531;
  font-family: hiragino kaku gothic pro,meiryo,sans-serif;
  color: #ccc;
  text-decoration: unset;
}
a:last-child {
  filter: brightness(.9);
}
p {
  display: flex;
  margin: 0;
}
p:nth-child(2n) {
  filter: invert(.05);
}
body {
  color: #ccc;
  width: min-content;
  margin: 0 auto;
  background-color: #000;
  font: clamp(10px,2.2vw,12px)/36px menlo,consolas,monospace;
  user-select: none;
  white-space: pre
}
::-webkit-scrollbar { width: 16 }
::-webkit-scrollbar-thumb { background-color: #666 }
[a] { background-color: #000 }
[b] { background-color: #111 }
[c] { background-color: #222 }
[d] { background-color: #444 }
[e] { background-color: #555 }
[jpn] { background-color: #145 }
/*[usa] { background-color: #531 }*/
[eup] { background-color: #340 }
[aus] { background-color: #511 }
</style>
<base target=_blank href=//www.jbis.or.jp/horse/>`;

let cntyToAttr =(s: string)=>
  s == "JPN" ? " jpn" :
  /*s == "USA" || s == "CAN" ? "usa" :*/
  s == "GB" || s == "IRE" || s == "GER" || s == "FR" || s == "NZ" || s == "ITY" ? " eup" :
  s == "AUS" ? " aus" : "";

for (let i = 0; i < heights.length; ++i) {
  let item = heights[i];
  let name = item.name;
  let cnty = item.cnty;
  let href = item.href;
  let sire = item.sire;
  let scnty = item.scnty;
  let shref = item.shref;
  let msire = item.msire;
  let mcnty = item.mcnty;
  let mhref = item.mhref;
  let year = item.year;
  let height = item.height;
  let weight  = item.weight;

  let ratio = weight ? ((weight / ((height / 100) ** 2)) + .05)  : 0;
  let heightAttr = height <= 160 ? " e" : height <= 163 ? " d" : height <= 166 ? "" : height <= 169 ? " c" : height <= 172 ? " b" : " a";
  let weightAttr = weight <= 450 ? " e" : weight <= 465 ? " d" : weight <= 480 ? "" : weight <= 495 ? " c" : weight <= 510 ? " b" : " a";
  let ratioAttr = ratio <= 165 ? " e" : ratio <= 173 ? " d" : ratio <= 181 ? "" : ratio <= 189 ? " c" : ratio <= 197 ? " b" : " a";
  
  html +=
`<p>` +
`<s${heightAttr}>${height}</s>` +
`<s ${weightAttr}>${weight ? weight : "  -  "}</s>` +
`<s ${ratioAttr}>${ratio ? (ratio + (Number.isInteger(ratio) ? ".0" : "")).slice(0, 5) : "  -  "}</s>` +
`<a href=${href.slice(href[12] == "j" ? -11 : 6)}${cntyToAttr(cnty)}>${name}</a>` +
`<s ${year < 2000 ? "b" : ""}>${year}</s>` +
`<a href=${shref.slice(-11)} ${cntyToAttr(scnty)}>${sire}<a href=${mhref.slice(-11)} ${cntyToAttr(mcnty)}>${msire}</a>`;
}

Bun.write("index.html", html);