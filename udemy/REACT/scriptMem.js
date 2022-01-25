'use strict';
/////////////////////////////////////////////////////////////////////////////////////////
//стрелочная ф-ция берет контекст у своего родителя. Она не имеет своего контекста вызова
const obj = {
    num:5,
    sayNumber:function(){
        const say = () =>{
            console.log(this);//this будет ссылаться на объект
            console.log(this.num);
        };
        say();
    }
};
obj.sayNumber();

const obj1 = {
    num:5,
    sayNumber:function(){
        function say (){
           // console.log(this);// теряет this будет ссылаться на window?
        }
        say();
    }
};
obj1.sayNumber();
/////////////////////////////////////////////////////////////////////////////////////////
//filter  возвращают новый массив
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
/////////////////////////////////////////////////////////////////////////////////////////
//параметры по умолчанию
function calcOrDouble(number, basis = 2){
    // basis = basis || 2;// старый способ без использования параметров по умолчанию
     console.log(number * basis);
 }
 calcOrDouble(3,5);
 calcOrDouble(6);
 /////////////////////////////////////////////////////////////////////////////////////////
//cтандарт IS6
//операторо rest записывается последним как ...[любое имя]
//rest оператор собирает отдельные сущности в массив
const log = function(a,b,...c){
    console.log(a,b,c);
};
log('basic','rest','operator','usage');

function max(...numbers){
    console.log(numbers);
}
max(3,7,45);

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
 /////////////////////////////////////////////////////////////////////////////////////////
 // const double = (a)=>{
//     return a * 2;
// };
//если действие стрелочной ф-ции помещается в одну строку - можно писать так (return не пишем)
//const double = (a) => a * 2;
//если стрелочная ф-ция принимает 1 аргумент - пишем его без скобок
const double = a => a * 2;
console.log(double(3));

//если поля объекта называются так-же как значение, не надо их писать
const x = 25, y = 10;
//cтарая запись
// const coords = {
//     x: x,
//     y: y,
//     calcSq: function(){
//         console.log(this.x*this.y);
//     }
// };


const coords = {x,y,
    calcSq(){
        console.log(this.x*this.y);
    }
};
coords.calcSq();
console.log(coords);
 /////////////////////////////////////////////////////////////////////////////////////////
 //деструктаризация

 const user1 = {
    name1: 'default',
    pass: 'qwerty',
    rigths: 'user'
};
// можно писать так - но без использования деструкторизации
const userName = user1.name;
const userPass = user1.pass;

const {name1,pass,rigths} = user1; //деструкторизация - создались три новые переменные, где будут лежать данные user1
//console.log(name,rigths);

const user2 = {
    nameUser: {
        first: 'Sam',
        second: 'Smith'
    },
    password: 'qwerty',
    rigthsUser: 'user'
};
const {nameUser:{first,second}, password, rigthsUser} = user2; //деструктурировли объект внутри объект
console.log(first, password);
//типичный паттерн в JavaScript
//функция принимает какой-то объект
// function connect(options){       - без деструк

// }
// с деструкторизацией и параметрами по умолчанию
function connect({
    host = 'localhost',
    port =  '3000',
    user = 'default'
} = {}){
    console.log(`host : ${host} port: ${port} user: ${user}`);
}
//вызывает ф-цию
connect({});
connect({
    host: 'localhost',
    port: '3000',
    user: 'default'
});
connect({
    host: 'hh',
    port: '4000',
    user: 'ya'
});
connect({
   port: '6000'
});
connect({
    port: '232',
    host: 'sfs'
 });
 connect();//= {} вызовется с параметром по-умолчанию - создасться пустой объект, т.к. мы не передали объект

 //деструкторизация для массива
 const numbers2 = [3,5,6,6];
 const [a,b,c] = numbers2;
 console.log(a,b,c);
 //или можем пропускать элементы
 const [, , d]= numbers2;
 console.log(d);
 //если массив в массива
 const numbers3 = [[3,5],[6,6]];
 //чтобы получить 3
 //numbers3[0][0];    //без деструктори
 const[[a1,b1],[c1,d1]] = numbers3;
 console.log(a1,b1,c1,d1);

 //пример
 const country = {
     name: 'England',
     population: '2000000',
     gender:{
         male: ['15%', '40%'],
         female: ['16%', '29%']
     }
 };
 // нужно получить процеты мужчин и женщин до и после 18
 //country.gender.male[0]; - не удобно
 //сделаем деструкторизацию объекта
 const{gender:{male:[maleUnder18, maleAdult], female:[femaleUnder18, femaleAdult]}} = country;
 console.log(maleUnder18,femaleAdult);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //компоненты высшего порядка (Higher-Order Component, HOC) 
const f = (a) => {
    console.log(a);
    return (b) => {
        console.log(a +b)
    }
}
//вызов функции
f(1)(2);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // импорты из локальных файлов
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//что мы импортируем и откуда (та же папка - ./)
//import {button,Slider} from './script';
//можно переименовывать сущности как при экспорте так и при импорте
//можно импортировать все из файла
//import * as total from './script'; // total - объект, где все, что мы экспортировали из файла script
//импорт, если есть экспорт по умолчанию
//import Slider  from './script'; // или можем переименовать import Sl from './script';
//импорт, если  миксованный экспорт (экспорт и экпорт по умолчанию)
//import Slider, {button}  from './script';
// const slider = new Slider(400,300,5);
// console.log(btn());
// импорты из npm зависимостей
//например REACT
//import React, {Component} from 'react';
// чтобы импортировать стили
//import '/.index.css'
//импорты и экспорты не работают без зборшика модулей, например WebPack
//https://webpack.js.org/guides/getting-started/
//npm install webpack webpack-cli --save-dev
//npx webpack - собрать проект
//babel переводит новый формат в старый,чтобы выполнялось в старых браузерах
//https://babeljs.io/docs/en/usage
//npm install --save-dev @babel/core @babel/cli @babel/preset-env
//npm install --save @babel/polyfill        //чтобы выполнялось в старых браузерах
//нужно добавить в проект babel.config.js (копируем код с сайта, добавляем ie: "10" - интернет эксплоер 10 версии)
//npx babel src --out-dir src                //переработаем файлы, чтобы выполнялось в старых браузерах
//должны получить в консоли Successfully compiled 2 files with Babel

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//собрать react проект
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//https://www.npmjs.com/package/create-react-app
//npm i create-react-app //если загетали файлы и хотим сделать реакт - проэкт - заходим в папку с загетанным проэтом и пишем командв
//npm i create-react-app -g - глобально
//https://github.com/facebook/create-react-app

//! нужно зайти в терминале в папку - где хотим создать проэкт. В этой папке создасться папка с проэктом
//npx create-react-app my-app - создание react проэкта
//cd my-app - перейти в папку
//npm start - запуск приложения 
// - если не запускается с ошибкой ""react-scripts" не распознается как внутренняя или внешняя команда, действующая программа" -
//npm install react-scripts --save

//ctrl+C - остановить реакт сервер

//реакт роутинг
//https://reacttraining.com/react-router/web/guides/quick-start
//установка
// npm i react-router-dom --save
//импорт
//import {BrowserRouter as Router, Route} from 'react-router-dom';

//проверка типов пропортей
//установка
//npm install prop-types
//импорт
//import PropTypes from 'prop-types';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// sass (css cтили) препроцессор
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//npm install node-sass --save

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// reactstrap (bootstrap)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//https://reactstrap.github.io/?path=/story/home-installation--page
// установка
//npm install reactstrap bootstrap@4 --save
//подключить в index.js
//import 'bootstrap/dist/css/bootstrap.css';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// css in js
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//можно писать все стили внутри js файла
//https://styled-components.com
//установка
//npm install --save styled-components
// импорт 
//import styled from 'styled-components';
//создание стилей 
//const AppBlock = styled.div`
//`