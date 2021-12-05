/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};
const   images = document.querySelectorAll(".promo__adv img"),//nodeList у которого есть метод forEach
        poster = document.querySelector(".promo__bg"),
        getnre = poster.querySelector(".promo__genre"),
        promoInteractiveList = document.querySelector('.promo__interactive-list');

//console.log(images);
images.forEach(item=>{
    item.remove();
});

getnre.textContent ="драма";
poster.style.backgroundImage = 'url("img/bg.jpg")';

movieDB.movies.sort();
promoInteractiveList.innerHTML = ''; //удаляем все элементы

movieDB.movies.forEach((film,i)=>{
    promoInteractiveList.innerHTML += `
        <li class="promo__interactive-item">${i+1 + ". " + film}
            <div class="delete"></div>
        </li>
    `;
});


