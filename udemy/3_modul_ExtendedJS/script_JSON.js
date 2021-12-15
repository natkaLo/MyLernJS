'use strict';
//JSON
const persone = {
    name: 'Alex',
    tel: '+744444444'
};

//stringify превращает данные java script в нужный формат
console.log(JSON.stringify(persone)); //такой формат данных мы можем отправить на сервер

//parse  когда с сервера приходит Json и нам нужно его превратить в объект
console.log(JSON.parse(JSON.stringify(persone)));

//глубокие копии объектов создаются с помощью JSON

const personeTwo = {
    name: 'Ivan',
    tel: '+75555',
    parents:{
        mom:'Olga',
        dad:'Mike'
    }
};
const clone = JSON.parse(JSON.stringify(personeTwo));
clone.parents.mom = 'Ann';
console.log(personeTwo);
console.log(clone);