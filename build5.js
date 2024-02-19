import heights from "./height2.json";
import mstns from "../../equine-mstn-list/resources/mstn.json"

let total = heights.length;
let css = (await Bun.file("main5.css").text()).replaceAll(/\n| {2}|\s(?={)|(?<=\:)\s/g, "");
let js = (await Bun.file("main.js").text()).replaceAll(/\s/g, "").replaceAll("let", "let ").replaceAll("$total", total);
let html = (await Bun.file("main.htm").text()).replaceAll(/\n/g, "").replaceAll("$total", total).replace("/*css*/", css).replace("/*js*/", js);
let mstning =v=> v && (v = v.mstn) ? v == "CC" ? " b" : v == "CT" ? " c" : " d" : "";
let mstn = mstns.map(v => v[0]);
let hrefing =(href, name)=> `<a href=${href.slice(href[12] == "j" ? -11 : 6)}${mstning(mstn.find(v => v.name == name))}>${name}`;

let heightHTML = html + "HEIGHT  / <a href=//ariamaranai.github.io/equine-height-list/weight/ target=_parent>WEIGHT</a>  / <a href=//ariamaranai.github.io/equine-height-list/bmi/ target=_parent>BMI</a>  / <a href=//ariamaranai.github.io/>@ariamaranai</a>";

for (let i = 0, h = 155; i < heights.length; ++i) {
  let item = heights[i];
  {
    let {name: name, year: year, cnty: cnty, href: href,
         hh: hh, wt: wt, bmi: bmi, trust: trust
        } = item[0];
    bmi && (item[0].bmi = wt ? (wt / ((hh / 100) ** 2)) + .05 : 0);
    wt = `<b>${bmi ? bmi.toFixed(1) : 0}` + (trust ? `<s>${hh}</s><u>${wt}</u></b>` : `<s>${hh}</s><i>${wt}</i></b>`);
    heightHTML += `<p${h != hh ? " a" : ""}>${hrefing(href, name)}\u000a${year}.${cnty}${wt}`;
    h = hh;
  }
  {
    let {name: name, year: year, cnty: cnty, href: href,
      hh: hh, wt: wt, bmi: bmi, trust: trust
     } = item[1];
     bmi && (item[0].bmi = wt ? (wt / ((hh / 100) ** 2)) + .05 : 0);
    wt = `<b>${bmi ? bmi.toFixed(1) : 0}` + (trust ? `<s>${hh}</s><u>${wt}</u></b>` : `<s>${hh}</s><i>${wt}</i></b>`);
    heightHTML += `${hrefing(href, name)}\u000a${year}.${cnty}${wt}`;
  }
  {
    let {name: name, year: year, cnty: cnty, href: href,
      hh: hh, wt: wt, bmi: bmi, trust: trust
     } = item[2];
     bmi && (item[0].bmi = wt ? (wt / ((hh / 100) ** 2)) + .05 : 0);
    wt = `<b>${bmi ? bmi.toFixed(1) : 0}` + (trust ? `<s>${hh}</s><u>${wt}</u></b>` : `<s>${hh}</s><i>${wt}</i></b>`);
     heightHTML += `${hrefing(href, name)}\u000a${year}.${cnty}${wt}</a>`;
  }
}

Bun.write("../index2.htm", heightHTML);
console.log(`size: ${Bun.gzipSync(Buffer.from(heightHTML)).length}`);

/*
let weightHTML = html + "<a href=//ariamaranai.github.io/equine-height-list/ target=_parent>HEIGHT</a>  /  WEIGHT  / <a href=//ariamaranai.github.io/equine-height-list/bmi/ target=_parent>BMI</a>  / <a href=//aiamraranai.github.io/>@ariamaranai</a>";
let weights = heights.toSorted((a, b) => a.wt > b.wt ? 1 : a.wt < b.wt ? -1 : 0);
for (let i = 0; i < weights.length; ++i) {
  let item = weights[i];
  let hh = item.hh;
  let wt  = item.wt;
  let bmi = item.bmi;
  weightHTML += `<p>${hrefing(item.href, item.name)}${bmi ? `${hh}  ${item.trust ? wt : `<i>${wt}</i>`}  ${String(bmi).padEnd(5, ".0")}` : `${hh}   -     -  `}  ${item.year}.${item.cnty.padEnd(4)}${hrefing(item.shref, item.sire)} /${hrefing(item.dshref, item.dsire)}`;
}
Bun.write("../weight/index.htm", weightHTML);

let bmiHTML = html + "<a href=//ariamaranai.github.io/equine-height-list/ target=_parent>HEIGHT</a>  / <a href=//ariamaranai.github.io/equine-height-list/weight/ targert=_parent>WEIGHT</a>  /  BMI  / <a href=//ariamaranai.github.io/>@ariamaranai</a>";
let bmis = heights.toSorted((a, b) => a.bmi > b.bmi ? 1 : a.bmi < b.bmi ? -1 : 0);
for (let i = 0; i < bmis.length; ++i) {
  let item = bmis[i];
  let hh = item.hh;
  let wt  = item.wt;
  let bmi = item.bmi;
  bmiHTML += `<p>${hrefing(item.href, item.name)}${bmi ? `${hh}  ${item.trust ? wt : `<i>${wt}</i>`}  ${String(bmi).padEnd(5, ".0")}` : `${hh}   -     -  `}  ${item.year}.${item.cnty.padEnd(4)}${hrefing(item.shref, item.sire)} /${hrefing(item.dshref, item.dsire)}`;
}
Bun.write("../bmi/index.htm", bmiHTML);

let json = JSON.stringify(heights, null, 2).replaceAll('"bmi": "', '"bmi": ').replaceAll(`",\u000a    "trust"`, `,\u000a    "trust"`);
Bun.write("./height.json", json);*/