'use strict';

// свойства аксцессоры
//getter
const person = {
    name: 'Alex',
    age: 25,

    //геттер
    get userAge(){
        return this.age;
    },
    //сеттер
    set userAge(age){
         this.age = age;
    }
};
console.log(person.userAge = 30);//сеттер
console.log(person.userAge);//геттер
