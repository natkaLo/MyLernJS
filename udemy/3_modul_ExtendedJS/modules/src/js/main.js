//IE6

//можно экспортировать переменные
// 1 способ
export let one = 1;
// 2 способ
let two = 2;
export{two};
// и функции
export function sayHi(){
    console.log('Hello');
}
//экспорт по умолчанию. Может быть только один
export default function sayHi2(){
    console.log('Hello2');
}