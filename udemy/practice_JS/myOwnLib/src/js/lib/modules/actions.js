import $ from '../core';

$.prototype.on = function(eventName, callbackFunction){
    if(!eventName || !callbackFunction){
        return this;
    }
    for(let i = 0; i < this.length; i++){
        this[i].addEventListener(eventName,callbackFunction);
    }
    return this;
};

$.prototype.off = function(eventName, callbackFunction){
    if(!eventName || !callbackFunction){
        return this;
    }
    for(let i = 0; i < this.length; i++){
        this[i].removeEventListener(eventName,callbackFunction);
    }
    return this;
};

$.prototype.click = function(callbackFunction){
    for(let i = 0; i < this.length; i++){
        if(callbackFunction){
            this[i].addEventListener('click',callbackFunction);
        }
        else{
            this[i].click(); //если не передали колбек фукцию, значит выполним виртуальный клик по элементу
        }
    }
    return this;
};
