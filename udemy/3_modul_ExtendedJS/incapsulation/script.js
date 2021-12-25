'use strict';

//функция конструктор
function User(name,age){
    this.name = name;
    this.age = age;

    this.say=function(){
        console.log(`Имя пользователя ${this.name} возраст ${this.age}`);
    };
}
const ivan = new User('Ivan', 25);
console.log(ivan.name);
console.log(ivan.age);
//чтобы не было такого - и нужна инкапсуляция
ivan.age = 30;
ivan.name = 'Igor';
ivan.say();

function User1(name,age){
    this.name = name;
    let userAge = age;

    this.say=function(){
        console.log(`Имя пользователя ${this.name} возраст ${userAge}`);
    };

    this.getAge = function(){
        return userAge;
    };

    this.setAge = function(age){
        if(typeof(age) === 'number' && age > 0 && age < 110){
            userAge = age;
        }
        else{
            console.log('Недопустимое значение');
        }
       
    };
}
const ivan1 = new User1('Ivan1', 27);
console.log(ivan1.name);
console.log(ivan1.age);//undefined Это не член класса
console.log(ivan1.getAge()); //27
//чтобы не было такого - и нужна инкапсуляция
ivan1.userAge = 30;     //undefined не можем получить доступ и изменить. Это не член класса
ivan1.setAge(30);
ivan1.setAge(300);
ivan1.name = 'Igor';
ivan1.say();

//классы

class User2 {
    constructor(name, age) {
        this.name = name;
        this._age = age; //_name - договоренность не трогать свойство с нижним подчеркиванеим напрямую
    }
    //эксперементальный синтаксис работает только в chrome последних версий
     //#surname = 'Petrychenko'; //# - приватное 

    say () {
        //console.log(`Имя пользователя: ${this.name} ${#this.surname}, возраст ${this._age}`);
    }

    get age() {
        return this._age;
    }

    set age(age) {
        if (typeof age === 'number' && age > 0 && age < 110) {
            this._age = age;
        } else {
            console.log('Недопустимое значение!');
        }
    }
 }

 const ivan4 = new User('Ivan', 27);
 console.log(ivan4.name);
 ivan4._age =99;
 console.log(ivan4._age);
 console.log(ivan4.age);
 console.log(ivan4.age(99));
 console.log(ivan4.age);
 ivan4.say();

 //модуль
 //разные файлы . Модули независимы. Не объявляем переменные в глобальном пространстве. Переносим из проэкта в проэкт

//способы создания модулей
//1 - через анонимную самовызывающуюся функцию
const number = 1; //глобальная переменная
//создается собственная область видимости
(function(){
    let number = 2; // локальная переменная
    console.log(number);
    console.log(number + 3);
}());
console.log(number);

//2 - использование объектного интерфейса
const usr = (function(){
    const private = function(){
        console.log('I am private');
    };
    //эксортируем только те функции, которые будут нужны снаружи
    return{
        sayHello: private
    };
}());

usr.sayHello();
