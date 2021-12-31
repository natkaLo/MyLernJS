'use strict';
//устаревшее создание
// const num = new Number(3);
// console.log(num);
// const f = new Function(3);
// console.log(f);
//новое
/////////////////////////////////////////////////////////////////////////////
////////// constructors 
/////////////////////////////////////////////////////////////////////////////

//ф-ция конструктор. С ее помощью можем создавать новых пользователей IC5
// function User(name,id){
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     //методы
//     this.hello = function(){
//         console.log(`Hello ${this.name}`);
//     };
// }
// //если не можем изменять сам класс, можем дополнить его с помощью prototipe
// User.prototype.extit = function(name){
//   console.log(`Пользователь ${this.name} ушел`);  
// };

// //создание нового объекта, используя конструктор 
// const ivan = new User('Ivan', 23);
// const alex = new User('Alex', 20);
// // console.log(ivan);
// // console.log(alex);
// ivan.hello();
// alex.hello();
// ivan.extit();

/////////////////////////////////////////////////////////////////////////////
////////// this 
/////////////////////////////////////////////////////////////////////////////
//cпособы вызова ф-ций
//1  просто вызов ф-ции. Обычная функция: this = window, но если стоит 'use strict', то будет undifined
// function showThis(){
//     console.log(this);
// }
// showThis();
//практическое использование первой
//  function showThis(a,b){
//      console.log(this);
//      function sum(){
//         console.log(this);
//          return a+b;
//      }
//      console.log(sum());
//  }
//  showThis(4,5);

 //2 если используем метод внутри объекта - то контекст вызова (this) будет ссылаться на объект
 // т.е контекст у методов объекта - сам объект
//  const obj = {
//      a:20,
//      b:15,
//      sum:function (){
//          console.log(this);// какой контекст вызова будет у этой ф-ции sum- ответ - объект
//          function shout(){
//              console.log(this); // здесь получим undefined. Потому что это простой вызов ф-ции внутри метода объекта
//          }
//      }
//  };
// obj.sum();

//3 ф-ция конструктор. Когда она будет вызвана - она создаст новый объект. 
// контекст вызова (this) - только что созданный новый объект
//  function User(name,id){
//      this.name = name;
//      this.id = id;
//      this.human = true;
//     //методы
//      this.hello = function(){
//          console.log(`Hello ${this.name}`);
//      };
//  }
//  let ivan = new User('Ivan',23);

 //4 - ручное присвоение this любой функции (call apply bind)
//ф-ция приобретает свой контекст (this) благодаря методам call или apply
//  function sayName(surname){
//     console.log(this);
//     console.log(this.name + surname);
//  }
//  const user = {
//      name: 'John'
//  };
// //установка ф-ции контекста. Ф-ции отличаются только синтаксисом
//  sayName.call(user, 'Smith');
//  sayName.apply(user, ['Smith']);
//  //создает новую ф-цию, связанную с определенным контекстом. С помощью bind
//  function count(num){
//      return this*num;
//  }
//  // Это новая ф-ция у которой жестко привязанный контекст - это 2. И в ф-ции count this это 2
//  const double = count.bind(2); 
// //вызывается count с this 2 и аргументами 3 и 13
//  console.log(double(3));
//  console.log(double(13));

const btn = document.querySelector('button');
btn.addEventListener('click', function(){
    console.log(this);//this - сама кнопка. если ф-ция не стрелочная
    this.style.backgroundColor = 'red';
});
//для стрелочной ф-ции надо передать event и использовать event.targt
// btn.addEventListener('click',(e)=>{
//    e.target.style.backgroundColor = 'red';
// });

const obj1 = {
    num:5,
    sayNumber:function(){
        function say (){
            console.log(this);// теряет this будет ссылаться на window?
        }
        say();
    }
};
obj1.sayNumber();


//стрелочная ф-ция берет контекст у своего родителя. Она не имеет своего контекста вызова
const obj = {
    num:5,
    sayNumber:function(){
        const say = () =>{
            console.log(this);//this будет ссылаться на объект
            console.log(this.num);
        };
        say();
    }
};
obj.sayNumber();

// const double = (a)=>{
//     return a * 2;
// };
//если действие стрелочной ф-ции помещается в одну строку - можно писать так (return не пишем)
//const double = (a) => a * 2;
//если стрелочная ф-ция принимает 1 аргумент - пишем его без скобок
const double = a => a * 2;
console.log(double(3));

//если поля объекта называются так-же как значение, не надо их писать
const x = 25, y = 10;
//cтарая запись
// const coords = {
//     x: x,
//     y: y,
//     calcSq: function(){
//         console.log(this.x*this.y);
//     }
// };


const coords = {x,y,
    calcSq(){
        console.log(this.x*this.y);
    }
};
coords.calcSq();
console.log(coords);