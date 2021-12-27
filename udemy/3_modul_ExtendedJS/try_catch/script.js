'use strict';
try{
    console.log('Normal');
    //console.log(a);
    console.log('Result');
}catch(error){
   //console.log('Error');
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);
}finally{
    //выполниться обсолютно всегда
    
}

//console.log(a);  //если без try - catch - дальнейший код не выполняется
//если не обработать ошибку - не будет catch - все дальнейшие действия выполняться не будут
console.log('Still normal');

// реальное использование
//если на странице нет такого елемента - без try - catch будет все плохо и 'normal' не выполниться

try{
    document.querySelector('.active').addEventListener('click', ()=>{

    });
}catch(e){
    console.log(e.message);
}

console.log('normal');