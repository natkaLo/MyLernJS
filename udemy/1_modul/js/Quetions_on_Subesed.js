"use strict";
//•	Какое будет выведено значение: let x = 5; alert( x++ ); ?
// 5
// let x = 5;
// alert(x++);


//•	Чему равно такое выражение: [] + false - null + true ?
//NaN
// пустой массив в таких операциях будет приведен к пустой строке 
// console.log([] + false); //"false" 
 //console.log(typeof([] + false)); //string
 //console.log([] + false - null);// от сроки "false" отнимаем null - получаем NaN (not a number) и дальше ничего не измениться

//•	Что выведет этот код: let y = 1; let x = y = 2; alert(x);?
//2
// let y = 1; 
// let x = y = 2;
// alert(x);


//•	Чему равна сумма [ ] + 1 + 2?
//"12" - конкатинация строк ([] - пустой массиы превратиться в пустую сторку)
// console.log([] + 1 + 2); 


//•	Что выведет этот код: alert( "1"[0] )?
//"1"  - обращаемся к символу строки"1" по индксу[0]
//alert( "1"[0] );

//•	Чему равно 2 && 1 && null && 0 && undefined ?
// console.log(2 && 1 && null && 0 && undefined);
//null - оператор && останавливается на false и поэтому остановился на null и вернул null


//•	Есть ли разница между выражениями? !!( a && b ) и (a && b)?
//да есть разница. Выражения не равны  - !!( a && b ) - превращение в bool
//console.log(!!( 1 && 2 ) === (1 && 2));

//•	Что выведет этот код: alert( null || 2 && 3 || 4 ); ?
//3  у && приоритет выше, чем у ||. Сначала будет выполнятся 2 && 3. Вернется последнее  - 3
// затем выполняется null || 3 - оператор || останавливается на true  и дальше выполняться не будет. Поэтому вернется 3
//alert( null || 2 && 3 || 4 );


//•	a = [1, 2, 3]; b = [1, 2, 3]; Правда ли что a == b ?
//нет/ Поэтому что это разные объекты
// const a = [1, 2, 3];
// const b = [1, 2, 3];
// console.log(a == b);

//•	Что выведет этот код: alert( +"Infinity" ); ?
//Infinity - но тип данных число
//alert( +"Infinity" );

//•	Верно ли сравнение: "Ёжик" > "яблоко"?
//нет - идет посимвольное сравнение (коды unicode символов)Сначала идут маленькие буквы. Поэтому Ё меньше я
//console.log("Ёжик" > "яблоко");

//•	Чему равно 0 || "" || 2 || undefined || true || falsе ?
//2 // оператор || остановиться на true - на 2 и вернет 2;
//console.log('0 || "" || 2 || undefined || true || falsе');