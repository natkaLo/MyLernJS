'use strict';
//метод forEach никогда не возвращает новый массив, он просто перебирает существующий

//1/filter  возвращают новый массив
//метод filter - фильтрут массив по определенному нами правилу
const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemart'];
// получим имена, длина которых меньше чем 5 символов
const shorNames = names.filter(function(name){
    return name.length < 5;
});
console.log(shorNames);

//синтаксис со стрелочной функцией
// const shorNames = names.filter((name)=>{
//     return name.length < 5;
// });
// console.log(shorNames);

//2/map позволяет трансформировать элементы массива, возвращает новый массив

// const answers = ['IvAn','AnnA','Hello'];
// const result = answers.map(item => item.toLowerCase());
// console.log(result);

let answers = ['IvAn','AnnA','Hello'];
answers = answers.map(item => item.toLowerCase());
console.log(answers);

//3/every и some возвращают bool
//some - перебирает массив и если хотя бы один из элементов подходит нашему условию - возвращает true
//every - перебирает массив и если все элементы подходит нашему условию - возвращает true
//если используем стрелочную функцию, return писать не надо. Он подставляется автоматически
const some = [4,'qwa','skjfaskf'];
const numbers = [4,5,6,7];
//проверим, есть ли внутри массива хотя бы одно число 
console.log(some.some(item => typeof(item) === 'number'));
//проверим, есть ли внутри массива все элемнты - числа

console.log(some.every(item => typeof(item) === 'number'));
console.log(numbers.every(item => typeof(item) === 'number'));

//4//reduce - cобирает массив в одно единое целое. Особенно касается числовых данных
//возвращает новый сформированный результат. Исходный массив не изменяет
const arr = [4,5,1,3,2,6,7]; 
//получим сумму элементов
//sum подставляется автоматически и изначально равен 0. current - каждый элемент
//const result = arr.reduce((sum,current)=> sum + current, 3); второй аргумент - начальное значение sum
const result = arr.reduce((sum,current)=> sum + current);
console.log(result);
// работает и со строками
const arrStr = ['apple','pear','1','plum']; 
//const resultStr = arrStr.reduce((sum,current)=> sum + ',' + current);
const resultStr = arrStr.reduce((sum,current)=> `${sum}, ${current}`);
console.log(resultStr);

//пример //задача - получить имена людей, находящихся в объекте
const obj = {
    ivan: 'persone',
    ann: 'persone',
    dog: 'animal',
    cat: 'animal'
};
//метод entries - позволяет взять объект и превратить его в матрицу (массив массивов)
//const newArr = Object.entries(obj);
//console.log(newArr);
const newArr = Object.entries(obj)
.filter(item => item[1] === 'persone') //отфильтруем persone
.map(item => item [0]);
console.log(newArr);


