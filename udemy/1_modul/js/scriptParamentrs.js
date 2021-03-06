"use strict";

//примитивные типы данных - передача данных по значению
let a = 5,
    b = a;
b = b + 5;
console.log(a); //5
console.log(b); // 10

//обьекты (обьекты , массивы, функции,) - передача по ссылке

//cоздаем объект
const obj = {
    a: 5,
    b: 1
};

const copy = obj; // мы не скопировали и не создали новый обьект а сделали ссылку на обьект
copy.a =10;
console.log(obj); //{ a: 10, b: 1 }
console.log(copy); // { a: 10, b: 1 }

//копирование обьектов(клонирование)_ // поверхностное
// с помошью цикла
function copyObj(mainObj)
{
    let objCopy = {}; // создаем новый объект
    let key;
    for(key in mainObj)
    {
        objCopy[key] = mainObj[key];//cозданем свойсво и копируем его из объекта
    }
    return objCopy;
}

const numbers = {
    a:2,
    b:5,
    c:{
        x:7,
        y:4
    }
};
const newNumbers = copyObj(numbers);
newNumbers.a = 10;
newNumbers.c.x = 10;
console.log(numbers);
console.log(newNumbers);


// с помошью object assign - cоеденение объетов // поверхностное

const numbers1 = {
    a:2,
    b:5,
    c:{
        x:7,
        y:4
    }
};

const add={
    d:16,
    e:20
};
//console.log(Object.assign(numbers1, add));

//если первый аргумент - пустой обьект - получаем поверхностную копию объекта
const cloneObject = Object.assign({},add);
cloneObject.d = 56;
console.log(add);
console.log(cloneObject);

// чтобы создать копию массива, можно исп-ть фукцию (типа copyObj), а можно slice
const oldArray = ["a", "b", "c"];
const newArray = oldArray.slice();
newArray[1] = "d";
console.log(oldArray);
console.log(newArray);

//использование опертора разворота (спрет оператора) (разворачивает структуру и превращает ее в набор данных)
const video = ['youtube','vimeo','rutube'],
        blogs= ['wordpress','livejournal','bloger'],
        internet = [...video,...blogs, 'vk', 'facebook'];
console.log(internet);

function log(a,b,c){

    console.log(a);
    console.log(b);
    console.log(c);
}

const num = [2,5,7];
log(...num);// массив разложиться на элементы (cпрет орератор)
//cпрет орератор работает и для массивов
const rArray = ["a","b"];
const NewSpretArr = [...rArray];
console.log(NewSpretArr);

//cпрет орератор работает и для объектов
const ojb = {
    one:1,
    two:2
};
const ojbCopy = {...ojb};
console.log(ojbCopy);

// spret(...) оператор - оператор разворота.Могут быть объекты, массивы
const arr1 =[1,2,5],
    arr2 = [43,2,6];

const res = Math.max(1,...arr1,...arr2);//(два массива ращвернуться и в функцию попадут значения, которые у них внутри
console.log(res);//43

const avatar = 'Photo';
const user = {
    name: 'default',
    pass: 'qwerty',
    rigths: 'user'
};
const admin = {
    name: 'admin',
    pass: 'root'
};

//const res1 = Object.assign({},user, admin);

const res1 = {...user,...admin, avatar};// получаем объект со свойствами двух объектов и новое свойство аватар
console.log(res1);