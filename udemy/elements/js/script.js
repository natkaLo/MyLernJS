'use strict';

// const box = document.getElementById('box'); //по id
// //console.log(box);

// const btns = document.getElementsByTagName('button');//получили псевдомассив
// //console.log(btns);

// const btn = document.getElementsByTagName('button')[1];//получаем вторую кнопку
// // или
// //const btn1 = btns[1];
// //console.log(btn);
// //console.log(btn1);

// const circles = document.getElementsByClassName('circle'); //по классу

// //более новые методы
// //у результата (nodeList )появляется метод forEach
// const heards = document.querySelectorAll('.heart');//могут быть идентификаторы, классы...
// heards.forEach(item=>{
//     console.log(item);
// });

// const oneHeart = document.querySelector('.heart'); //результат - первый элемент
// const oneButton = document.querySelector('button'); //результат - первый элемент

const box = document.getElementById('box'),
      btns = document.getElementsByTagName('button'),
      circles = document.getElementsByClassName('circle'),
      hearts = document.querySelectorAll('.heart'),
      oneHeart = document.querySelector('.heart');