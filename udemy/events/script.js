"use strict";
const   btn = document.querySelector('button'),
        btns= document.querySelectorAll('button'),
        overlay = document.querySelector('.overlay');

//плохой формат записи
// btn.onclick = function(){
//     alert('click');
// };
//правильный формат
// btn.addEventListener('click',()=>{
//     alert('click');
// });

let i = 0;

const deleteElement = (e) => {
   // e.target.remove();
   console.log(e.target);
   console.log(e.currentTarget);
   console.log(e.type);
   i++;
//    if(i == 1){
//         btn.removeEventListener('click',deleteElement);
//    }
};
// btn.addEventListener('click',()=>{
//     alert('second click');
// });

btn.addEventListener('click',deleteElement,{once:true}); //{once:true} - сработает один раз

btns.forEach(element => {
    element.addEventListener('click',deleteElement);
});

//всплытие событий - обработчик сначала срабатывает на самом вложенном элементе, затем на родителе (если он есть) и так выше и выше поднимаясь по иерархии

overlay.addEventListener('click',deleteElement);

//отмена стандартного поведения в браузере
const link = document.querySelector('a');
link.addEventListener('click',(e) =>{
     e.preventDefault();
     console.log(e.target);

});