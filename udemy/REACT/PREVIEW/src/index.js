"use strict"; // //без babel - исходный код 
// импорты из локальных файлов
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

//собрать react проект
//https://www.npmjs.com/package/create-react-app
//npm i create-react-app
//npm i create-react-app -g - глобально
//https://github.com/facebook/create-react-app
//npx create-react-app my-app - создание react проэкта
//cd my-app - перейти в папку
//npm start - запуск приложения 
// - если не запускается с ошибкой ""react-scripts" не распознается как внутренняя или внешняя команда, действующая программа" -
//npm install react-scripts --save


var _script = require("./script");

var slider = new _script.Slider(400, 500, 7);
slider.whoAmI();
console.log((0, _script.btn)());