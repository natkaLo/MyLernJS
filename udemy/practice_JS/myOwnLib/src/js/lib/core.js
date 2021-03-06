const $ = function(selector){
    //из ф-цию мы будем возвращать конструктор(будем возвращать объект и у него будет вызываться метод штше)
    return new $.prototype.init(selector);
};
//будет получать элемент со страницы
$.prototype.init = function(selector){
    if(!selector){
        return this; //возвращаем просто пустой объект
    }
    //если пришедший selector является нодой (html элементом)
    if(selector.tagName){
        this[0] = selector;
        this.length = 1;
        return this;
    }
    //assign позволяет в какой-то объект добавить новые свойства. Первый аргумент - объект, в который добавляем
    Object.assign(this, document.querySelectorAll(selector));
    this.length = document.querySelectorAll(selector).length; //добавим в this свойство lenght
    return this; // в this будут храниться прототипы, которые мы назначили и элементы, которые получили со страницы
    //у возвращаемого объекта тоже есть свой прототип
};
// мы можем поменять прототип возвращаемого из ф-ции init объекта
//второй prototype относиться к объекту, который возвращает метод init. И мы его подредактируем. Запишем в него прототип главной функции $
//это дает нам - теперь на объекте, который будет создаваться с помощью $, мы можем использовать
//любые методы, которые будут внутри ф-ции init
$.prototype.init.prototype = $.prototype;

 //запишем заданнюу нами функцию в глобальный обхъект window. Теперь у нас есть глобальная ф-ция, которую мы можем вызывать по символу $
window.$ = $;
//экспортируем функцию для использования в разных файлах
export default $;

//замыкание с помощью анонимной самовызывающейся функции
// (() => {
//     //создадим свою ф-цию под названием $, которая будет получать элемент со страницы
//     const $ = function(selector){
//         const elements = document.querySelectorAll(selector);
//         //console.log(elements);
//         const obj = {};

//         //ф-ция скрывает элементы
//         obj.hide = () => {
//             elements.forEach(elem => {
//                 elem.style.display = "none";
//             });
//             return obj; //для того, чтобы можно было сделать цепочку вызовов
//         };

//          //ф-ция показывает элементы
//          obj.show = () => {
//             elements.forEach(elem => {
//                 elem.style.display = "";
//             });
//             return obj;//для того, чтобы можно было сделать цепочку вызовов
//         };

//         //чтобы можно было вызывать ф-ции hide и show, нам ф-ция $ должна возвращать ojb. А это ф-ции объекта obj
//         return obj;
       
//     };
//     //запишем заданнюу нами функцию в глобальный обхъект window. Теперь у нас есть глобальная ф-ция, которую мы можем вызывать по символу $
//     window.$ = $;

// })();