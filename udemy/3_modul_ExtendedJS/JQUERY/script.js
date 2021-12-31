import $ from 'jquery';
// получение элемента со страницы
// const btn = $('#btn');

// console.log(btn);
//$(function() { 
$(document).ready(function(){
    //получим первую кнопку
    $('.list-item:first').hover(function(){
        $(this).toggleClass('active');
    });
   // $('.list-item:eq(2)'); //третья кнопка
    $('.list-item:eq(2)').on('click', function(){
        $('.image:even').fadeToggle('slow'); //скрываем четные картинки
    });

    $('.list-item:eq(4)').on('click', function(){
        $('.image:odd').animate({
            opacity: 'toggle',
            height: 'toggle'
        },2000); //анимация нечетных картинки
    });
}) ; 
