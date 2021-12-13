"use strict";
// alert("1");
// const result = confirm("Are you here");
// console.log(result);
// const answer = prompt("Вам есть уже 18?", "18");
// console.log(answer);// всегда будет тип данных строка в answer
// console.log(typeof(answer));

//приведение к number
// const answer = +prompt("Вам есть уже 18?", "18");
// console.log(typeof(answer));
// console.log(answer + 5);

const answers = [];
answers[0] = prompt("Как Ваше имя", "natka");
answers[1] = prompt("Как Ваша фамилия", "Лощук");
answers[2] = prompt("Сколько Вам лет", "50");

document.write(answers);//устаревший
console.log(typeof(answers));//object