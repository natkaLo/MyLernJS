import './lib/lib';

$('div').hide().show();
$('.active').toggle().toggle();
$('.active').addClass('hello', 'world');
$('.active').toggleClass('hello');
$('.active').on('click',sayHello);
$('.active').off('click',sayHello);
$('.active').click(sayHello);

$('button').on('click',function(){
    $(this).hide().show().toggleClass('active');
});

$('.active').onAttribute("disabled", "disabled");

function sayHello(){
    console.log('Hello');
}


// c самовызывающейся функцией
// import './lib/core';
// //$('div'); //получим все дивы, используя нашу ф-цью $ из core.js
// //получим элементы с классом active. И так как мы из ф-ции $ мы возвращаем объект, мы можем вызвать для объекта ф-цию
// $('.active').hide();
// //можно писать и цепочку вызовов, потому что каждый метод oбъекта obj (core.js)возвращает щио
// $('.active').hide().show();