'use strict';
//синхронный и асинхронный код
console.log(1);//синхронный код
//aсинхронный код
setTimeout(()=>{
    console.log('timeout');
},2000);

setTimeout(()=>{
    console.log('timeout_4000_1');
},2000);

setTimeout(()=>{
    console.log('timeout_4000_2');
},4000);

console.log(2);//синхронный код

// в консоле 1 2 timeout timeout_4000_1 timeout_4000_2

//http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D

//циклы, например forEach - выполняется в CallStack и очередь - Call Quite - ждет пока не выполниться. Если цикл тяжелый или завис - больше ничего на странице не выполняется
let k = 0;
function count(){
    for(let i =0;i < 1e9;i++){
        k++;
    }
    alert('done');
}
count();
//любят на собеседовании
//set timeout в 0 - без задержки, должен выполниться сразу
// но сначала выполниться console.log, т.к setTimeout все равно
//проходит через асинхронную часть(т.е сначала попадает в Web Apis - там записывается а потом идет в Callback Queue и только потом
// в Call stack), a console.log сразу попадает в call stack(т.к это синхронная операция)
// кроме того - если поставлен 0 в setTimeout - JS автоматически меняет его на 4 млсек для совместимости с разными браузерами
setTimeout(()=>{
    console.log('_1');
},0);
console.log(2);