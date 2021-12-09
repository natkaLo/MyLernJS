// const timerID = setTimeout(function(){
//     console.log('Hello');
// },2000);

// const timerID = setTimeout(function(text){
//          console.log(text);
//      },2000, 'Hello');

const btn = document.querySelector(".btn");
let timerID,
  i = 0;

// btn.addEventListener('click', () =>{
//     // timerID = setTimeout(logger,2000); // выполняется один раз
//      timerID = setInterval(logger,2000); // выполняется пока не остановиш каждые 2 сек
// });

// function logger(){
//     if(i == 3)
//     {
//         clearInterval(timerID);// остановка таймера
//     }
//     console.log('text');
//     i++;
// }
// //recursiv timeout. Лучше, чем setInterval, т.к. если ф-ция выпоняется больше, чем кол-во милисикунд, установленное в setInterval, он не ждет, когда ф-ция завершиться а вызывается снова
// let id = setTimeout(function log(){
//     console.log('hello');
//     id = setTimeout(log,500);
// },500);

function myAnimation() {
  const elem = document.querySelector(".box");
  let pos = 0;

  const id = setInterval(frame, 10);
  function frame() {
    if (pos == 300) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + "px";
      elem.style.left = pos + "px";
    }
  }
}
btn.addEventListener("click", myAnimation);


// даты
//const now = new Date();
//const now = new Date('2021-12-09');
//const now = new Date(2021,12,9,20);//последний - часы
//const now = new Date(0); // отчет от 1970-01-01
//console.log(now);
//const now = new Date();

//получение компонентов даты
// console.log(now.getFullYear());
// console.log(now.getMonth());
// console.log(now.getDate());
// console.log(now.getDay());// dень недели (нумерация с воскресенья)
// console.log(now.getUTCHours());
// console.log(now.getHours());
// console.log(now.getTimezoneOffset());
// console.log(now.getTime()); // отчет от 1970-01-01 в млсек

//установка времени
//console.log(now.setHours(18));
// console.log(now.setHours(18,40));//часы, минуты
// console.log(now);

//new Date.parse('2021-12-09');

let start = new Date();//текущая дата
for(let i = 0; i < 10000000;i++)
{
  let some = i**3;// ** - возведение в степень
}
let end = new Date();

console.log(`Цикл отработал за ${end - start} миллисекунд`);
