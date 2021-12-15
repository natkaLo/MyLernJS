'use strict';
const inputRub = document.querySelector('#rub'),
inputUSD = document.querySelector('#usd');
//обработчик события input срабатывает, когда происходит ввод
//обработчик change срабатывает когда поле теряет фокус

inputRub.addEventListener('input', () => {
    //делаем запрос на сервер
    const request = new XMLHttpRequest();// встроенный класс

   // request.open(method,url,async,login,password);// метод собирает настройки, не устанавливает соеденение(по умолч async)
   //самые популярные методы GET (получить данные с сервера)и POST (отправляем данные на сервер)
   request.open('GET', 'js/current.json');
   // чтобы сервер понимал, что мы ему отравляем
   request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
   //отправляем запрос
   request.send();// в GET параметров нет

   //cвойства XMLHttpRequest (HTTP запроса)
   //status - статус запроса (есть ошибки или нет) 200, 404...
   //statusText - статус в виде текста
   //response - ответ здесь лежит то, что мы будем использовать на фронтеде
   //readyState - состояние операции запроса

   //cобытие изменения состояния запроса. срабатывает несколько раз. 
//    request.addEventListener('readystatechange',()=>{
//         //проверяем,что запрос завершен и завершен успешно
//         if(request.readyState === 4 && request.status === 200){
//             console.log(request.response); //выведем  ответ от сервера в консоль
//             const data = JSON.parse(request.response);//парсим ответ от сервера и получаем обычный объект
//             //toFixed(2) - округление результата до двух знаков после точки
//             inputUSD.value = (+inputRub.value/data.current.usd).toFixed(2);
//         }
//         else{
//             inputUSD.value = "Что-то пошло не так";
//         }
//    });
//событие, когда запрос готов
request.addEventListener('load',()=>{
    //проверяем,что запрос завершен успешно
    if(request.status === 200){
        console.log(request.response); //выведем  ответ от сервера в консоль
        const data = JSON.parse(request.response);//парсим ответ от сервера и получаем обычный объект
        //toFixed(2) - округление результата до двух знаков после точки
        inputUSD.value = (+inputRub.value/data.current.usd).toFixed(2);
    }
    else{
        inputUSD.value = "Что-то пошло не так";
    }
});
});