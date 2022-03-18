import $ from '../core';

// передаем параметр с помощью рест оператора, т.к. можно передать разное кол-во классов и мы не знаем, сколько классов нам передали
$.prototype.addClass = function(...classNames){
    for(let i = 0; i < this.length; i++){
        if(!this[i].classList || this[i].classList.contains(...classNames)){
            continue;
        }
        this[i].classList.add(...classNames);//это уже не рест, а спрет оператор (оператор разворота)
    }   
    return this;
};

$.prototype.removeClass = function(...classNames){
    for(let i = 0; i < this.length; i++){
        if(!this[i].classList || !this[i].classList.contains(...classNames)){
            continue;
        }
        this[i].classList.remove(...classNames);//это уже не рест, а спрет оператор (оператор разворота)
    }   
    return this;
};

$.prototype.toggleClass = function(className){
    for(let i = 0; i < this.length; i++){
        if(!this[i].classList){
            continue;
        }
        this[i].classList.toggle(className);
     }   
    return this;
};