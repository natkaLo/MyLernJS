"use strict";
// console.log(document.body);
// console.log(document.head);
//console.log(document.documentElement);//получаем HTML
//console.log(document.body.childNodes); //псевдомассив дочерних узлов body
// console.log(document.body.firstChild);//первый ребенок родителя
// console.log(document.body.lastChild);//последний ребенок родителя

//получение родителя, соседей и детей
//console.log(document.querySelector('#current').parentNode.parentNode);

//получение data атрибута
//console.log(document.querySelector('[data-current="3"]'));

//получение следующего узла
//console.log(document.querySelector('[data-current="3"]').nextSibling);
//получение предыдущего узла
//console.log(document.querySelector('[data-current="3"]').previousSibling);


//чтобы не попасться на текстовую ноду - просто перенос строки
//console.log(document.querySelector('[data-current="3"]').nextElementSibling);
//console.log(document.querySelector('#current').parentElement);
//console.log(document.body.firstElementChild);

//document.body.childNodes //псевдомассив дочерних узлов body
// если нужно получить только элементы а не все ноды (избавиться, например от текстовых нодов перевода строки)
for(let node of document.body.childNodes){

    if(node.nodeName == "#text"){
        continue;
    }

    console.log(node);
}