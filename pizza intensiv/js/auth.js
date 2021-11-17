// console.log("Hello");
// let a = 1;//переменная
// const b = "h";//константа 
// const Div = document.querySelector(".container"); //константа на класс в html
// console.log(Div);
// console.log(document);
//как можно писать функции
// function sayMeow() {
//     console.log("May");
// }

// const sayMeow = function () {
//     console.log("May");
// }

// const sayMeow = () => {
//     console.log("May");
// }
// sayMeow();

// console.log(modalAuth);
// const summ = (a, b) => {
//     return a + b;
// }
// console.log(summ(2, 7));

// //обьект
// const obj = {
//     name: "Natka",
//     age: 20,
//     sayHello: function () {
//         console.log("Hey, my name is Natka");
//     }
// }
// console.log(obj.name);
// obj.sayHello();
// //массив
// const arr = [2, 3, 4];
// console.log(arr[1]);

const auth = () => {

    const buttonAuth = document.querySelector('.button-auth');
    const modalAuth = document.querySelector('.modal-auth');
    //modalAuth.style.color = "red"; ставим стиль
    //слушаем клик на кнопке
    buttonAuth.addEventListener('click', () => {
        // console.log("Click");
        //console.dir(modalAuth);//вывод в виде объекта
        modalAuth.style.display = 'flex';
    });
    const closeAuth = document.querySelector('.close-auth');
    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = 'none';
    });
    //const logInForm = document.querySelector('#logInForm');
    //or
    const logInForm = document.getElementById('logInForm');
    const inputLogin = document.getElementById('login');
    const inputPassword = document.getElementById('password');
    const buttonOut = document.querySelector('.button-out');
    const userName = document.querySelector('.user-name');
    const buttonCart = document.querySelector('.button-cart');
    logInForm.addEventListener('submit', (event) => {
        //console.log("Auth");
        event.preventDefault();//блокировка стандартного поведения события (в данном слечае - закрытие формы)
        //console.dir(event);
        // console.dir(inputLogin);
        // console.log(inputLogin.value);
        // console.log(inputPassword.value);
        const user = {
            login: inputLogin.value,
            password: inputPassword.value
        }
        // console.log(user);
        //localStorage.setItem('user', user);//сохраняем инфо в браузере на стороне клиента
        localStorage.setItem('user', JSON.stringify(user));//сохраняем инфо в браузере на стороне клиента
        login(user);
    })

    const login = (user) => {
        //  console.log(user);
        buttonAuth.style.display = 'none';
        buttonOut.style.display = 'flex';
        userName.textContent = user.login;
        userName.style.display = 'flex';
        modalAuth.style.display = 'none';
        buttonCart.style.display = 'flex';
    }
    buttonOut.addEventListener('click', () => {

        logout();
    })
    const logout = () => {
        buttonAuth.style.display = 'flex';
        buttonOut.style.display = 'none';
        userName.textContent = "";
        userName.style.display = 'none';
        localStorage.removeItem('user');
        buttonCart.style.display = 'none';
    }
    if (localStorage.getItem('user')) {
        //console.log(JSON.parse(localStorage.getItem('user')));
        login(JSON.parse(localStorage.getItem('user'))); //авторизация после перезагрузки если в localStorage есть юзер
    }
}
auth()