/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/

'use strict';
let numberOfFilms = 0;
// Код возьмите из предыдущего домашнего задания
const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function start(){
    numberOfFilms = +prompt("Сколько фильмов Вы уже посмотрели?","0");
    while(numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms))
    {
        numberOfFilms = +prompt("Сколько фильмов Вы уже посмотрели?","0");
    }
}
function rememberMyFilms(){

    for(let i = 0; i < 2; i++)
    {
        const   a = prompt("Один из последних просмотренных фильмов?",""),
                b= prompt("На сколько оцените его?","");
        if(a != null && b != null &&  a.length > 0 && b.length > 0 &&  a.length <= 50)
        {
             personalMovieDB.movies[a] = b;
        }
        else
        {
             i--;
        }
    }
}

function detectPersonalLevel(){
    if(personalMovieDB.count < 10){
        alert("Просмотрено довольно мало фильмов");
    }
    else if(personalMovieDB.count < 30 ){
        alert("Вы классический зритель");
    }
    else if(personalMovieDB.count >= 30 ){
        alert("Вы киноман");
    }
    else{
        alert("Произошла ошибка");
    }
}
function showMyDB(hidden)
{
    if(!hidden)
    {
        console.log(personalMovieDB);
    }
}
function writeYourGenres()
{
    for(let i = 0;i < 3;i++)
    {
        const a = prompt(`Ваш любимый жанр под номером ${i+1}`);
        if(a != null && a.length > 0)
        {
            personalMovieDB.genres[i] = a;
        }
        else
        {
            i--;
        }
    }
}
//start();
//rememberMyFilms();
//detectPersonalLevel();
showMyDB(personalMovieDB.privat);
writeYourGenres();

