//импортируем переменные

//этот синтаксис необходимо собирать сборщиком модулем

//import {one,two} from './main';
//console.log(`${one} and ${two}`);

//можно переименовывать импортируемые переменные

//import{one as first} from './main';
//console.log(first);

// чтобы имортировать все из файла
import * as data from './main.js';
console.log(`${data.one} and ${data.two}`);
data.sayHi();

//импорт дефольного экспорта
import sayHi2 from './main.js';
sayHi2();

