"use strict";
// создание объекта
// редко используемая форма
//const obj = new Object();

// создание объекта
const options = {
    name: 'test',
    width: 1024,
    height: 1024,
    colors:{
        border: 'black',
        bg: 'red'
    },
    //методы
    makeTest:function()
    {
        console.log("text");
    }
    
};
options.makeTest();

//деструктаризация объекта (вытаскивание переменных объекта в качестве отдельных переменных)
const {border, bg} = options.colors;
console.log(border);

const user = {
    name:'default',
    pass: 'qwerty',
    rigths:'user'
};
const userName = user.name;

//console.log(options.name);

// удаление свойства объекта
//delete options.name;
//console.log(options);

//let counter = 0;
//перебор свойств объекта
// for(let key in options){
//     if(typeof(options[key]) === 'object')
//     {
//         for(let i in options[key]){
//             console.log(`Свойство ${i} имеет значение ${options[key][i]}`);
//             counter++;
//         }
//     }
//     else{
//     console.log(`Свойство ${key} имеет значение ${options[key]}`);
//     counter++;
//     }
// }
// console.log(counter);

// метод ключей объекта. Получаем массив ключей объекта у которого как и у сторок есть свойство length
console.log(Object.keys(options));
console.log(Object.keys(options).length);