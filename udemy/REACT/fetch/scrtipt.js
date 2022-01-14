//https://jsonplaceholder.typicode.com
// создаем промис
// fetch('https://jsonplaceholder.typicode.com/posts/1')
// .then((response) => response.json())// ответ в формате объекта json (response.text() - ответ от сервера будет в текстовом формате)
// .then((myJson) => console.log(myJson));

//get
// fetch('https://jsonplaceholder.typicode.com/posts/1')
// .then((response) => {
//    // console.log(response.json());          
//     return response.json(); //вернулся promise
// })
// .then((myJson) => console.log(myJson));

//put постить данные на сервер
// let url = 'https://jsonplaceholder.typicode.com/posts',
//     data = {username: 'example'};
// fetch(url, {
//              method: 'POST',
//              body : JSON.stringify(data),
//              headers: {
//                  'Content-Type':'application/json'
//              }
//     })
// .then((response) => response.json())
// .then((myJson) => console.log('Success',myJson))
// .catch(error => console.error('Error',error));

//создаем свой метод для fetch

//такой код ошибочен, т.к мы не дождались ответа от fetch и попытались получить some
// const getResource = (url)=>{
//     const res = fetch (url),
//         some = res.json();      //содержит ответ от сервера
//         return some;
// }
//нужно использовать async (указание, что ф-ция асинхронная) и await (ждем результата)
const getResource = async(url)=>{
    const res = await fetch (url);
    if(!res.ok){
        //getResource('https://jsonplaceholder.typicode.com/posts/100000')
        throw new Error (`Could not fetch ${url}, status: ${res.status}`);
    }
    const some = await res.json();      //содержит ответ от сервера
     return some;
}
getResource('https://jsonplaceholder.typicode.com/posts/1')
.then((res) => console.log('Success',res))
.catch(error => console.error(error));
