'use strict';
// с setInterval не стоит создавать анимации. Грузит комп, тормазит, выполняется, когда вкладка не активна
// function myAnimation() {
//     const elem = document.querySelector(".box");
//     let pos = 0;
  
//     const id = setInterval(frame, 10);
//     function frame() {
//       if (pos == 300) {
//         clearInterval(id);
//       } else {
//         pos++;
//         elem.style.top = pos + "px";
//         elem.style.left = pos + "px";
//       }
//     }
//   }
//   btn.addEventListener("click", myAnimation);

// requestAnimationFrame позволяет запускать какие-то функции в качестве анимации и подстраивает ее под частоту обновления экрана
//выполняет одновременно несколько анимаций
const btn = document.querySelector('.btn'),
    elem = document.querySelector('.box');
let pos = 0;
 function myAnimation(){
    pos++;
    elem.style.top = pos + "px";
    elem.style.left = pos + "px";
    // если позиция меньше чем 300 - запускаем анимацию
    if(pos < 300){
        requestAnimationFrame(myAnimation);
    }
 }
 btn.addEventListener("click", ()=> requestAnimationFrame(myAnimation));

 //если нужно остановить анимацию
 //let id = requestAnimationFrame(myAnimation);
 //cancelAnimationFrame(id);