'use strict';

//разрастание дерева колбеков асинхронных операции (colback hall)
// console.log('Запрос данных...');
// setTimeout(()=>{
//     console.log('Подготовка данных...');

//     const product = {
//         name:'TV',
//         price:2000
//     };
//     setTimeout(()=>{
//         product.status ='order';
//         console.log(product);
//     },2000);

// },2000);
//чтобы избавиться от разрастания дерева колбеков и используются promise

console.log('Запрос данных...');
//создаем обещание
//function(resolve,reject)- колбек функция resolve и reject - фунции (resolve - что-то выполнилось правильно, reject - обещание не выпонилось, что-то пошло не так)
const req = new Promise(function(resolve,reject){
    //имитация ассинхронного кода
    setTimeout(()=>{
        console.log('Подготовка данных...');
    
        const product = {
            name:'TV',
            price:2000
        };
        resolve(product);//все хорошо закончилось
    
    },2000);
});
//если все хорошо вызывается then (resolve вызывает then). Мы выполняем следующий асинхронный запрос
// req.then((product)=>{
//     const req2 = new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             product.status ='order';
//             resolve(product);
//         },2000);
//     });
//     req2.then(data=>{
//         console.log(data);
//     });
// });
//красивее 
req.then((product)=>{
    return new Promise((resolve,reject)=>{
             setTimeout(()=>{
                product.status ='order';
                resolve(product);
                //можно вызвать reject();// вызовется cath
            },2000);
         });
   
     }).then (data=>{
         data.modify = true;
         return data;
        
 }).then(data=>{
    console.log(data);
 }).catch(()=>{
    console.error("Произошла ошибка");
 }).finally(()=>{
    console.log('finally');
 });
 //finally вызывается в любом случае - cработали then или catch. Это еще один блок promise (например в нем можно очистить форму)

 const test = time =>{
    return new Promise(resolve =>{
        setTimeout(()=>resolve(),time);
    });
 };
//test(1000).then(()=> console.log('1000 ms'));
//test(2000).then(()=> console.log('2000 ms'));
//Promise.all ждет окончания всех промисов, переданных в массив и только потом выпоняет ф-цию
Promise.all([test(1000),test(2000)]).then(()=>{
    console.log('All');
});

//Promise.race - не ждет все промисы, а выполняет свою ф-цию после выполнения одного из промисов
Promise.race([test(1000),test(2000)]).then(()=>{
    console.log('All');
});