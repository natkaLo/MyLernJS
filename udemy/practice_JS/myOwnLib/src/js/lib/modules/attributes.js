import $ from '../core';

$.prototype.onAttribute = function(name, value){
    if(!name){
        return this;
    }
    for(let i = 0; i < this.length; i++){
        this[i].setAttribute(name,value);
    }
    return this;
};

$.prototype.offAttribute = function(name){
    if(!name ){
        return this;
    }
    for(let i = 0; i < this.length; i++){
        this[i].removeAttribute(name);
    }
    return this;
};

$.prototype.toggleAttribute = function(name, value){
    if(!name ){
        return this;
    }
    for(let i = 0; i < this.length; i++){
        if(!this[i].hasAttribute(name)){
            this[i].removeAttribute(name);
        }
        else{
            this[i].setAttribute(name,value);
        }
        
     }   
    return this;
};
