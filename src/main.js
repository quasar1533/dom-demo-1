let div1 = dom.create("<div>haha</div>");
let div2 = dom.create("<span>lala</span>");
let div3 = dom.create("<span>lala</span>");
let div = document.querySelector("#create");
dom.append(div, div1);
dom.after(div1, div2);
dom.before(div2, div3);

let div4 = dom.create('<div id="wrapper"><div>');
dom.wrap(dom.find("#wrap"), div4);

dom.remove(dom.find("#remove"));
console.log(dom.empty(dom.find("#empty")));

dom.attr(dom.find("#attr"), "data-xxx", "custom");
dom.text(dom.find("#text"), "write something");

console.log(dom.findAll("li"));
dom.style(dom.find("#blue"), "color", "blue");
console.log(dom.style(dom.find("#blue"), "color"));
dom.style(dom.find("#blue"), { color: "red", "font-size": "2rem" });

let div5 = dom.find("#base");
console.log(dom.previous(div5));
console.log(dom.next(div5));
console.log(dom.siblings(div5));

dom.class.add(dom.find("#class"), "special");
dom.class.add(dom.find("#class"), "funny");

let div6 = dom.parent(dom.find("#index"));
let div7 = dom.find("#index");
console.log(div7);
console.log(dom.children(div6));
console.log(dom.index(div7));

let div8 = dom.find("#list");
let myList = dom.children(div8);
console.log(myList);
dom.each(myList, (item) => {
  console.log(item);
});
