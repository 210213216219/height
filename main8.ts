import heights from "./height.json";

let html = `
<meta charset=utf-8 content='maximum-scale=yes initial-scale=yes'name=viewport>
<title>Equine Height List</title>
<style>
a {
  color: #bbb;
  margin-left: 4;
}
[a] { width: 20ch; text-decoration: unset }
[b] { display: contents }
s {
  display: contents;
  color: #ccc;
}
p {
  display: flex;
  margin: 0;
  color: #999;
}
body {
  color: #ccc;
  margin: 0 auto;
  width: min-content;
  padding: 8;
  background-color: #111;
  font: clamp(10px,2.2vw,13px)/40px menlo,consolas,hiragino kaku gothic pro,meiryo,monospace;
  white-space: pre
}
::-webkit-scrollbar { width: 16 }
::-webkit-scrollbar-thumb { background-color: #666 }
</style>
<base target=_blank href=//www.jbis.or.jp/horse/>`;

for (let i = 0, h = 0; i < heights.length; ++i) {
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
  
  html +=
`${h != height ? height : ""}` +
`<p>` +
`<a href=${href.slice(href[12] == "j" ? -11 : 6)} a>${name}</a>` +
`${ratio ? "<s>" + ratio.toString().slice(0, 5) + "</s>(<s>" + weight + "</s>) " : "    (<s> - </s>) "}` +
`${year}.${cnty.padEnd(5)}` +
`<a href=${shref.slice(-11)} b>${sire}</a>/<a href=${mhref.slice(-11)} b>${msire}</a>` +
`</p>`
  h = height;
}

Bun.write("index.html", html);