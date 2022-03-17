import $ from '../core';
$.prototype.show = function (){
    //console.log(this);
    for(let i = 0; i < this.length; i++){
        if(!this[i].style){
            continue;
        }
        this[i].style.display = '';
    }
    return this; //возвращаем объект, чтобы мы могли для него вызвать цепочку функций
};
$.prototype.hide = function (){
    //console.log(this);
    for(let i = 0; i < this.length; i++){
        if(!this[i].style){
            continue;
        }
        this[i].style.display = 'none';
    }
    return this; //возвращаем объект, чтобы мы могли для него вызвать цепочку функций
};

$.prototype.toggle = function (){
    //console.log(this);
    for(let i = 0; i < this.length; i++){
        if(!this[i].style){
            continue;
        }
        if(this[i].style.display === 'none'){
            this[i].style.display = '';
        }
        else{
            this[i].style.display = 'none';
        }
    }
    return this; //возвращаем объект, чтобы мы могли для него вызвать цепочку функций
};