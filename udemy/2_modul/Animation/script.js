// const timerID = setTimeout(function(){
//     console.log('Hello');
// },2000);

// const timerID = setTimeout(function(text){
//          console.log(text);
//      },2000, 'Hello');


const btn = document.querySelector('.btn');
let   timerID,
      i =0;


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

function myAnimation(){
    const elem = document.querySelector('.box');
    let pos = 0;

    const id = setInterval(frame,10);
    function frame(){
        if(pos ==300){
            clearInterval(id);
        } 
        else{
            pos++;
            elem.style.top = pos+'px';
            elem.style.left = pos+'px';
        }
    }
}
 btn.addEventListener('click',  myAnimation);