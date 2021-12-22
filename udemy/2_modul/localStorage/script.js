'use strict';

//local storage - 5mГ байт
// не исчезает при перезагрузке страницы
//первый атрибут - ключ, второй - значение
//localStorage.setItem('number',5);
//localStorage.getItem('number');// получить значение по ключу.
//localStorage.removeItem('number');//удаление значения по ключу
//localStorage.clear();//очищение локального хранилища

const   checkbox = document.querySelector('#checkbox'),
        form = document.querySelector('form'),
        change = document.querySelector('#color');

if (localStorage.getItem('isChecked')){
    checkbox.checked = true;
}
if(localStorage.getItem('bg') === 'changed'){
    localStorage.removeItem('bg');
    form.style.backgroundColor = 'red';
}

checkbox.addEventListener('change', ()=>{
    localStorage.setItem('isChecked',true);
});

change.addEventListener('click', ()=>{
    if(localStorage.getItem('bg') === 'changed'){
        localStorage.removeItem('bg');
        form.style.backgroundColor = '#fff';
    }
    else{
        localStorage.setItem('bg','changed');
        form.style.backgroundColor = 'red';
    }
});

const persone = {
    name: 'Alex',
    age: 25
};
const serializePersone = JSON.stringify(persone);// нужно объект помещать через JSON
//localStorage.setItem('alex',persone); //иначе здесь получим object object
localStorage.setItem('alex',serializePersone);
console.log(localStorage.getItem('alex'));