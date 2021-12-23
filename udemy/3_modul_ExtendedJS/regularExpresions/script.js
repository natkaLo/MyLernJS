'use strict';
  
//new RegExp('pattern','flags'); //мжно создать регулярное выражение так, но это редко используется
// создается так
//  /pattern/f  

//методы

//search
const ans = prompt('Введите вше имя');
//ищем позицию первой маленькой буквы n
const reg = /n/;
console.log(ans.search(reg));
//флаги i- вне зависимости от регистра, g (global) - найти несколько вхождений, m- многострочный режим
const reg1 =/n/i; //g - не имеет смысла в search
console.log(ans.search(reg1));

//match - получаем массив
const reg2 = /n/ig; // вне зависимости от регистра все вхождения
console.log(ans.match(reg2));

const pass = prompt('Password');
console.log(pass.replace(/./g,"*"));//берем все символы и заменяем на звездочки
// если нужно заменить символ . , то нужно /\./

console.log('12-35-78'.replace(/-/g,':'));

//методы объекта регуляных выражения

console.log(reg.test(ans));//есть ли эти буквы в ответе

//классы регулярных выражений
//  \d - ищем все цифры
//  \w - ищем все буквы
//   \s - ищем все пробелы

const ans4 = prompt('Введите ваше число');
const reg4 = /\d/g;
console.log(ans4.match(reg4));

const str = 'My name is R2D2';
console.log(str.match(/\w\d\w\d/i)); //получим R2D2

//обратные классы - не числа, не буквы, не пробелы
//  \D - ищем все не цифры
//  \W - ищем все не буквы
//   \S - ищем все не пробелы
console.log(str.match(/\W/ig)); //ищем не буквы
console.log(str.match(/\D/ig)); //ищем не цифры