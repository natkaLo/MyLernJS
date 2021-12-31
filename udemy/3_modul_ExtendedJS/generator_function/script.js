'use strict';
//функция генератор последовательно генерирует результат
//создание
function* generator(){
    yield 'S';      //при первом вызове возвращает
    yield 'I';      //при cледующем вызове возвращает
    yield 'p';      //при cледующем вызове возвращает
    yield 't';      //при cледующем вызове возвращает
}
const str = generator();
console.log(str.next().value);
console.log(str.next());
console.log(str.next());
console.log(str.next());
console.log(str.next());
console.log(str.next());
console.log(str.next());

function* count(n){
    for(let i = 0; i< n;i++){
        yield i;
    }
}
const counter = count(7);
console.log(counter.next().value);
console.log(counter.next().value); //цикл в функции идет на следующую итерацию только при вызове next
console.log(counter.next().value);

function* count1(n){
    for(let i = 0; i< n;i++){
        yield i;
    }
}
for(let k of count1(7)){
    console.log(k);
}