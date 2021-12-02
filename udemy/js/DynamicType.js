"use strict";

//динамическая типизация

//в строку

//1.старый способ - String
console.log(typeof(String(null)));
console.log(typeof(String(4)));
//2. конкатинация - что-то складываем со строкой
// при сложении со строкой любого типа данных получаем строку
console.log(typeof((4 + '')));
console.log(typeof((null + '')));

// как изспользовать
const num = 5;
console.log("https://vk.com/catalog/" + num); // старый вариант
//формировать стили
const fontSize = 26 + 'px';

// в число
//1.старый способ - Number
console.log(typeof(Number(null)));
console.log(typeof(Number('4')));
//2. унарный плюс
console.log(typeof(+'4'));
//3. существующие методы для превращения в число
console.log(typeof(parseInt("15px",10)));
// как изспользовать
let answer = +prompt("Hello",""); 

//в булиновое значение
//1. в false всегда превращается - 0, '', null, undefined, NaN; все отсальное - true
let swither = null;
//console.log не вызовется
if(swither){
    console.log("Working...")
}
//2.
console.log(typeof(Boolean('4')));

//3. - !!
console.log(typeof(!!"4445"));
