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
      oneHeart = document.querySelector('.heart'),
      wrapper = document.querySelector('.wrapper');
//console.dir(box);
//inline свойства а не свойства из сss
//пишем значение строкой 
box.style.backgroundColor = 'blue';
box.style.width = '500px';
btns[1].style.borderRadius = '100%';

// назначение сразу нескольких стилей
box.style.cssText = 'background-color : green; width:500px';

// for(let i = 0; i< hearts.length;i++)
// {
//     hearts[i].style.backgroundColor = 'green';
// }

hearts.forEach(item=>{
    item.style.backgroundColor = 'green';
});

//cоздание елемента
const div = document.createElement('div');
//const text = document.createTextNode('Tyt bul ya');

//работа с css классами
div.classList.add('black');// - 'black - из сss файла'

//добавление элементов на страницу

//в конец body
document.body.append(div);
// в елемент 
//document.querySelector('.wrapper').append(div); // в конец элемента

//wrapper.prepend(div);// в начало

//hearts[0].before(div);//перед элементом(hearts[0] вставим div)
//hearts[0].after(div);//после элемента(hearts[0] вставим div)

//удаление элементов
//circles[0].remove();
//один элемент заменить другим 
//hearts[0].replaceWith(circles[0]);

//устаревшие консрукции
// wrapper.appendChild(div);
// wrapper.insertBefore(div,hearts[2]);
// wrapper.removeChild(hearts[1]);
// wrapper.replaceChild(circles[0],hearts[0]);

//редактирование элемента

div.innerHTML = "<h1>Hello workd</h1>";//можно вставить html структуру
//div.textContent = "Hello";//можно вставить текст

//вставка элемента по отношению к другому элементу
div.insertAdjacentHTML("beforebegin",'<h2>Hello</h2>');
