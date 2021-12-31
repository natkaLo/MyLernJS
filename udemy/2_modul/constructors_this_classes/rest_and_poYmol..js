'use strict';
//cтандарт IS6
//операторо rest записывается последним как ...[любое имя]
//rest оператор собирает отдельные сущности в массив
const log = function(a,b,...c){
    console.log(a,b,c);
};
log('basic','rest','operator','usage');

function max(...numbers){
    console.log(numbers);
}
max(3,7,45);

// spret(...) оператор - оператор разворота.Могут быть объекты, массивы
const arr1 =[1,2,5],
    arr2 = [43,2,6];

const res = Math.max(1,...arr1,...arr2);//(два массива ращвернуться и в функцию попадут значения, которые у них внутри
console.log(res);//43

//параметры по умолчанию
function calcOrDouble(number, basis = 2){
   // basis = basis || 2;// старый способ без использования параметров по умолчанию
    console.log(number * basis);
}
calcOrDouble(3,5);
calcOrDouble(6);