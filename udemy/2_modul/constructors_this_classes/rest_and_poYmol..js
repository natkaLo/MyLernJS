'use strict';
//cтандарт IS6
//операторо rest записывается последним как ...[любое имя]
//rest оператор собирает отдельные сущности в массив
const log = function(a,b,...c){
    console.log(a,b,c);
};
log('basic','rest','operator','usage');

//параметры по умолчанию
function calcOrDouble(number, basis = 2){
   // basis = basis || 2;// старый способ без использования параметров по умолчанию
    console.log(number * basis);
}
calcOrDouble(3,5);
calcOrDouble(6);