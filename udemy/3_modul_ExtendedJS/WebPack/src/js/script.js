
const myModule = require('./main.js'); // импортируем из файла main

const myModuleInstance = new myModule();
myModuleInstance.hello();
myModuleInstance.goodbay();

//для того, чтобы браузер работал с нащими файлами - нам нужно все собрать в один результирующий файл
//собираем утилитой WebPack
//WebPack - сборщик модулей
//npx webpack
