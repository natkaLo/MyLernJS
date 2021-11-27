/* Задание на урок:

1) Автоматизировать вопросы пользователю про фильмы при помощи цикла

2) Сделать так, чтобы пользователь не мог оставить ответ в виде пустой строки,
отменить ответ или ввести название фильма длинее, чем 50 символов. Если это происходит - 
возвращаем пользователя к вопросам опять

3) При помощи условий проверить  personalMovieDB.count, и если он меньше 10 - вывести сообщение
"Просмотрено довольно мало фильмов", если от 10 до 30 - "Вы классический зритель", а если больше - 
"Вы киноман". А если не подошло ни к одному варианту - "Произошла ошибка"

4) Потренироваться и переписать цикл еще двумя способами*/

'use strict';

// Код возьмите из предыдущего домашнего задания
const numberOfFilms = +prompt("Сколько фильмов Вы уже посмотрели?","0");

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};
let count = 0;
let  a, b;
// while(count < 2)
// {
//         a = prompt("Один из последних просмотренных фильмов?","");
//         //console.log(a);
//         if(a == null ||  a.length == 0 || a.length > 50)
//         {
//             continue;
//         }
//         b= prompt("На сколько оцените его?","");
//         personalMovieDB.movies[a] = b;
//         count++;
// }
// for(let i = 0; i < 2; i++)
// {
//     a = prompt("Один из последних просмотренных фильмов?","");
//     if(a == null ||  a.length == 0 || a.length > 50)
//     {
//         i--;
//         continue;
//     }
//      b= prompt("На сколько оцените его?","");
//      personalMovieDB.movies[a] = b;
// }
do{
    a = prompt("Один из последних просмотренных фильмов?","");
    if(a == null ||  a.length == 0 || a.length > 50)
    {
       continue;
    }
     b= prompt("На сколько оцените его?","");
     personalMovieDB.movies[a] = b;
     count++;
}while(count < 2);

console.log(personalMovieDB);

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

