/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
//////////////////////////////////////////////////////////////////////////////////////////////////////
    // калькулятор калорий
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    function setLocalStorageData(key, value){
        localStorage.setItem(key,value);
    }
    const result = document.querySelector(".calculating__result span");
    let sex = 'female',height,weight,age,ratio = '1.375';
   

    function initLocalSettings(selector,activeClass)
    {
        if(localStorage.getItem('sex')){
            sex = localStorage.getItem('sex');
        }
        setLocalStorageData('sex',sex);
        if(localStorage.getItem('ratio')){
            ratio = localStorage.getItem('ratio');
        }
        setLocalStorageData('ratio',ratio);

        const elemenents = document.querySelectorAll(selector);
        //console.log(elemenents);
        elemenents.forEach(elem =>{
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal(){
        //проверка, что все данные заполнены
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = '______';
            return;
        }
        if(sex === 'female'){
            result.textContent = Math.round((447.6+(9.2*weight)+(3.1*height)-(4.3*age)) * ratio);
        }
        else{
            result.textContent = Math.round((88.36+(13.4*weight)+(4.8*height)-(5.7*age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass){
        const elemenents = document.querySelectorAll(selector);// получаем все дивы внутри родительского элемента

        elemenents.forEach(elem=>{
            elem.addEventListener('click', (e)=>{
                if(e && e.target.getAttribute('data-ratio')){       //если кликаем на активность
                    ratio = +e.target.getAttribute('data-ratio');
                    setLocalStorageData('ratio',ratio);
                }
                else{                                               //если кликаем на пол
                    sex = e.target.getAttribute('id');
                    setLocalStorageData('sex',sex);
                }
                elemenents.forEach(elem =>{
                    elem.classList.remove(activeClass);
                 });
                e.target.classList.add(activeClass);
            });
          calcTotal();
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input',()=>{

            if(input.value.match(/\D/g)) //пользователь вводит не число
            {
                input.style.border = "1px solid red ";
            }
            else{
                input.style.border = "none";
            }
            switch(input.getAttribute('id')){
                case 'height': 
                    height = +input.value;
                break;
                case 'weight': 
                    weight = +input.value;
                break;
                case 'age': 
                    age = +input.value;
                break;
            }
            calcTotal();
        });
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

//module.exports = calc;    //можно писать так
// можно эксортировать по умолчанию
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function cards(modalSelector){
    //////////////////////////////////////////////////////////////////////////////
    //Наше меню на день - используем классы для карточек
    //////////////////////////////////////////////////////////////////////////////
    const modalWindow = document.querySelector(modalSelector);

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes; //массив
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        // из долларов в гривны
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        // формирование верстки
        render() {
            const element = document.createElement('div');
            //обработаем массив classes
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = ` 
                <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element); //помещаем элемент на страницу в родительский элемент
        }
    }

    // const vegy = new MenuCard("img/tabs/vegy.jpg","vegy",'Меню "Фитнес"','Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей.
    // Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',229,'.container');
    //console.log(document.querySelector('.menu .menu__field .container'));

    //создаем карточки с помощью функции getResource
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .menu__field .container',
    //     'menu__item',
    //     'big'

    // ).render();
    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     15,
    //     '.menu .menu__field .container'

    // ).render();
    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     12,
    //     '.menu .menu__field .container',
    //     'menu__item'
    // ).render();
   
    const forms = document.querySelectorAll('form');

    //красивое оповещение пользователя
    function showThanksModal(message) {
        //будем скрывать существующее модальное окно и создавать новое со статусом
        const prevModalDialog = modalWindow.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        if (!modalWindow.classList.contains('show')) {
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.ShowHideModalWindow)(modalWindow);
        }
        //cоздание нового окна
        const thankModal = document.createElement('div');
        thankModal.classList.add('modal__dialog');
        thankModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
            </div>
        `;

        modalWindow.append(thankModal);

        setTimeout(() => {
            thankModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.ShowHideModalWindow)(modalWindow);
        }, 4000);

    }

    const message = {
        //loading: 'Загрузка',
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    forms.forEach(item => {
        //postData(item); //старая закоменченная функция
        bindpostData(item);

    });

    axios.get('http://localhost:3000/menu')
    .then(data =>{
             data.data.forEach(({img,altimg,title,descr,price}) =>{
                 new MenuCard(img,altimg,title,descr,price,'.menu .menu__field .container').render();
             });
     });

    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            //сообщение с картинкой
            const statusMessageImg = document.createElement('img');
            statusMessageImg.src = message.loading;
            statusMessageImg.style.cssText = `
                     display:block;
                     margin:0 auto;
                 `;
            form.insertAdjacentElement('afterend', statusMessageImg);

            const formData = new FormData(form);
            //нужно превратить FormData в обычный объект для JSON
            //старый способ
            //const object = {};
            // formData.forEach(function(value,key){
            //       object[key] = value;
            //  });
            //
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    //показ формы о загрузке
                    showThanksModal(message.success);
                    //убираем сообщение о статусе
                    statusMessageImg.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    //очистка полей формы
                    form.reset();

                });
        });
    }
}
//module.exports = cards;//можно писать так
// можно эксортировать по умолчанию
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "ShowHideModalWindow": () => (/* binding */ ShowHideModalWindow)
/* harmony export */ });
function ShowHideModalWindow(wnd, modalTimerID) {

    let modalWindow = wnd;
    if(typeof(wnd) === 'string'){
        modalWindow = document.querySelector(wnd);
    }
    modalWindow.classList.toggle('show');

    //чтобы если на экране показано модальное окно - прокрутка документа не работала
    let overflow = '';
    if (modalWindow.classList.contains('show')) {
        overflow = 'hidden';
    }
    document.body.style.overflow = overflow;
    // останавливаем таймер
    console.log(modalTimerID);
    if(modalTimerID){
        clearInterval(modalTimerID);
    }
   
    //  if(wnd.classList.contains('show')){
    //         wnd.classList.add('hide');
    //         wnd.classList.remove('show');
    //  }
    //  else{

    //      wnd.classList.add('show');
    //      wnd.classList.remove('hide');
    //  }
}
function modal(trigerSelector, modalSelector, modalTimerID){

    //////////////////////////////////////////////////////////////////////////////
    //модальное окно
    //////////////////////////////////////////////////////////////////////////////
    const modalWindow = document.querySelector(modalSelector);
    const modalTriggers = document.querySelectorAll(trigerSelector); //'[...]' - получение через data аттрибут
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => ShowHideModalWindow(modalWindow,modalTimerID));
    });
    //добавим  в условии  event.target.getAttribute('data-close')==''
    //modalWindow.querySelector('[data-close]').addEventListener('click', () =>ShowHideModalWindow(modalWindow,modalTimerID));

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
            ShowHideModalWindow(modalWindow,modalTimerID);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            ShowHideModalWindow(modalWindow,modalTimerID);
        }
    });

   

    //вызов модального окна по скролу к концу документа

    //window.pageYOffset - прокрученная часть
    // document.documentElement.clientHeight - видимая часть документа
    // document.documentElement.scrollHeight - высота всего сайта

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            ShowHideModalWindow(modalWindow,modalTimerID);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    //deлаем ф-цию колбек showModalByScroll чтобы в ней убрать листенера. При повторной прокрутке до конца документа окно не покажется
    window.addEventListener('scroll', showModalByScroll);
}
//module.exports = modal;//можно писать так
// можно эксортировать по умолчанию
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);
//именованный экспорт



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter,currentCounter, wrapper, field}){
    
    //////////////////////////////////////////////////////////////////////////////
   //cлайдер
   //////////////////////////////////////////////////////////////////////////////

   //1 variant 
   // const offerSlider = document.querySelector('.offer__slider');
   // const currentElement = offerSlider.querySelector('.offer__slider-counter #current');
   // const offerSlides = offerSlider.querySelector('.offer__slider-wrapper').querySelectorAll('.offer__slide');
   // const totalSlides = offerSlides.length;
   // offerSlider.querySelector('.offer__slider-counter #total').textContent = (totalSlides < 10)? `0${totalSlides}`:totalSlides;
   // currentElement.textContent = '01';

  
   // function getCurrent(element){
   //     return +element.textContent;
   // }
   // const setCurrent = (current,element,total = totalSlides)=>{
   //     //console.log(getCurrent(element));
   //     //console.log(current);
   //     if(current <= 0){ current = total;}
   //     else if(current> total){current = 1;} 
   //     element.textContent = (current < 10)? `0${current}`:current;
       
   //     offerSlides.forEach((slide,index)=>{
   //         if(!slide.classList.contains('hide')){
   //             slide.classList.add('hide');
   //         }
   //         if(slide.classList.contains('show')){
   //             slide.classList.remove('show');
   //         }
   //         if(index == current -1){
   //             slide.classList.remove('hide');
   //             slide.classList.add('show');
   //         }
   //     });
   // };
   // offerSlider.querySelector('.offer__slider-counter').addEventListener('click', (e)=>{
   //     e.preventDefault();
   //     if(e.target){
   //         let current = getCurrent(currentElement);
   //         if(e.target.matches('.offer__slider-prev')){
   //             setCurrent(--current, currentElement);
   //         }
   //         else if(e.target.matches('.offer__slider-next')){
   //             setCurrent(++current, currentElement);
   //         }
   //     }
   // });
   // //init
   // setCurrent(getCurrent(currentElement), currentElement);

   //////////////////////////////////////////////////////////////////////////////
   //2 variant лента слайдов

   function deleteNotDigits(str){
       return +str.replace(/\D/g,'');
   }
   const  slidesWraper = document.querySelector(wrapper), // общая обертка для всех слайдов
           prev = document.querySelector(prevArrow),                        //кнопка prev
           next = document.querySelector(nextArrow),                        //кнопка next
           total = document.querySelector(totalCounter),                    //поле total
           current = document.querySelector(currentCounter),                //поле current
           slides = document.querySelectorAll(slide),                       //каждый отдельный слайд
           slidesField = document.querySelector(field),                     // общая обертка для всех слайдов внутри slidesWraper
           width = window.getComputedStyle(slidesWraper).width,            //видимая ширина ленты слайдов вычисленная автоматически при загрузке
           // widthInt = +width.slice(0, width.length -2);                   //видимая ширина ленты число (width - это строка ..px)
           widthInt = deleteNotDigits(width);                               // все не числа заменяем пустыми символами (удаляем)
          
   const  slider = document.querySelector(container),
          dots = []; 

    let slideIndex = 1; // текущий слайд
    let offset = 0; //отступ от начала ленты

   total.textContent = (slides.length < 10)?`0${slides.length}`:slides.length;

   slidesField.style.width = 100*slides.length + '%'; // сделаем ширину иннера в процентах 
   //выстраиваем слоайды в одну линию
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all';
   //ограничим показ внутри wrapper, остальные слайды в линии скроем
   slidesWraper.style.overflow = 'hidden';

   slides.forEach(slide =>{
       // у каждого слайда(картинки может быть разная ширина. Поставим всем одинаковую как у врапера)
       slide.style.width = width;
   });

   next.addEventListener('click', ()=>{
       //сдвигаем слайд
       if(offset == widthInt * (slides.length -1)){        //если это поледний слайд
           offset = 0;
       }
       else{
           offset += widthInt;
       }
       slideIndex =(slideIndex == slides.length)? 1:++slideIndex;
       setCurrent();
    });

   prev.addEventListener('click', ()=>{
       //сдвигаем слайд
       if(offset == 0){        //если это первый слайд
           offset = widthInt * (slides.length -1);
       }
       else{
           offset -= widthInt;
       }
       slideIndex =(slideIndex == 1)? slides.length:--slideIndex;
       setCurrent();
   });

     ///////////////////////////////////////////////////////////////////////////////////////////
   //точки для слайдера
   ///////////////////////////////////////////////////////////////////////////////////////////
 
   slider.style.position = 'relative';
   //создаем оберетку для точек и выставляем стили
   const indicatorDots = document.createElement('ol');
   indicatorDots.classList.add('carousel-indicators');
   //mожно добавить ему свойства в css файл, а можно javascriptом
   indicatorDots.style.cssText =`
       position: absolute;
       right: 0;
       bottom: 0;
       left: 0;
       z-index: 15;
       display: flex;
       justify-content: center;
       margin-right: 15%;
       margin-left: 15%;
       list-style: none;
   `;
   slider.append(indicatorDots);
   //создаем точки

   const clickDot = (e)=>{
       if(e && e.target){
           const dot = e.target;
           slideIndex = +(e.target.getAttribute('data-slide-to'));
           offset = widthInt * (slideIndex -1);
           setCurrent();
       }
   };


   for(let i = 0; i< slides.length;i++){
       const dot = document.createElement('li');
       dot.classList.add('dot');
       dot.setAttribute('data-slide-to',i+1);// к какому слайду точка относиться
       dot.style.cssText = `
           box-sizing: content-box;
           flex: 0 1 auto;
           width: 30px;
           height: 6px;
           margin-right: 3px;
           margin-left: 3px;
           cursor: pointer;
           background-color: #fff;
           background-clip: padding-box;
           border-top: 10px solid transparent;
           border-bottom: 10px solid transparent;
           opacity: .5;
           transition: opacity .6s ease;
       `;
       indicatorDots.append(dot);
       dot.addEventListener('click', clickDot);
       dots.push(dot);
   }
  
   const setCurrent = ()=> {
       //картинки
       slidesField.style.transform =`translateX(-${offset}px)`;
       //нумерация - текстовое поле
       current.textContent = (slides.length < 10)?`0${slideIndex}`:slideIndex; 

       //точки
       dots.forEach((dot,index)=>{
           if(index == slideIndex-1){//активаня точка
               dot.style.opacity = 1;
           }
           else{
               dot.style.opacity = '.5';
           }
       });
      
   };

   setCurrent();

}
//module.exports = slider;//можно писать так
// можно эксортировать по умолчанию
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


// function slider(){
    
//      //////////////////////////////////////////////////////////////////////////////
//     //cлайдер
//     //////////////////////////////////////////////////////////////////////////////

//     //1 variant
//     // const offerSlider = document.querySelector('.offer__slider');
//     // const currentElement = offerSlider.querySelector('.offer__slider-counter #current');
//     // const offerSlides = offerSlider.querySelector('.offer__slider-wrapper').querySelectorAll('.offer__slide');
//     // const totalSlides = offerSlides.length;
//     // offerSlider.querySelector('.offer__slider-counter #total').textContent = (totalSlides < 10)? `0${totalSlides}`:totalSlides;
//     // currentElement.textContent = '01';

   
//     // function getCurrent(element){
//     //     return +element.textContent;
//     // }
//     // const setCurrent = (current,element,total = totalSlides)=>{
//     //     //console.log(getCurrent(element));
//     //     //console.log(current);
//     //     if(current <= 0){ current = total;}
//     //     else if(current> total){current = 1;} 
//     //     element.textContent = (current < 10)? `0${current}`:current;
        
//     //     offerSlides.forEach((slide,index)=>{
//     //         if(!slide.classList.contains('hide')){
//     //             slide.classList.add('hide');
//     //         }
//     //         if(slide.classList.contains('show')){
//     //             slide.classList.remove('show');
//     //         }
//     //         if(index == current -1){
//     //             slide.classList.remove('hide');
//     //             slide.classList.add('show');
//     //         }
//     //     });
//     // };
//     // offerSlider.querySelector('.offer__slider-counter').addEventListener('click', (e)=>{
//     //     e.preventDefault();
//     //     if(e.target){
//     //         let current = getCurrent(currentElement);
//     //         if(e.target.matches('.offer__slider-prev')){
//     //             setCurrent(--current, currentElement);
//     //         }
//     //         else if(e.target.matches('.offer__slider-next')){
//     //             setCurrent(++current, currentElement);
//     //         }
//     //     }
//     // });
//     // //init
//     // setCurrent(getCurrent(currentElement), currentElement);

//     //////////////////////////////////////////////////////////////////////////////
//     //2 variant лента слайдов

//     function deleteNotDigits(str){
//         return +str.replace(/\D/g,'');
//     }
//     const  slidesWraper = document.querySelector(".offer__slider-wrapper"), // общая обертка для всех слайдов
//             prev = document.querySelector('.offer__slider-prev'),           //кнопка prev
//             next = document.querySelector(".offer__slider-next"),           //кнопка next
//             total = document.querySelector('#total'),                       //поле total
//             current = document.querySelector('#current'),                   //поле current
//             slides = document.querySelectorAll('.offer__slide'),            //каждый отдельный слайд
//             slidesField = document.querySelector(".offer__slider-inner"),   // общая обертка для всех слайдов внутри slidesWraper
//             width = window.getComputedStyle(slidesWraper).width,            //видимая ширина ленты слайдов вычисленная автоматически при загрузке
//            // widthInt = +width.slice(0, width.length -2);                   //видимая ширина ленты число (width - это строка ..px)
//            widthInt = deleteNotDigits(width);                               // все не числа заменяем пустыми символами (удаляем)
//     const  slider = document.querySelector('.offer__slider'),
//            dots = [];
    
//     let slideIndex = 1; // текущий слайд
//     let offset = 0; //отступ от начала ленты

//     total.textContent = (slides.length < 10)?`0${slides.length}`:slides.length;

//     slidesField.style.width = 100*slides.length + '%'; // сделаем ширину иннера в процентах 
//     //выстраиваем слоайды в одну линию
//     slidesField.style.display = 'flex';
//     slidesField.style.transition = '0.5s all';
//     //ограничим показ внутри wrapper, остальные слайды в линии скроем
//     slidesWraper.style.overflow = 'hidden';

//     slides.forEach(slide =>{
//         // у каждого слайда(картинки может быть разная ширина. Поставим всем одинаковую как у врапера)
//         slide.style.width = width;
//     });

//     next.addEventListener('click', ()=>{
//         //сдвигаем слайд
//         if(offset == widthInt * (slides.length -1)){        //если это поледний слайд
//             offset = 0;
//         }
//         else{
//             offset += widthInt;
//         }
//         slideIndex =(slideIndex == slides.length)? 1:++slideIndex;
//         setCurrent();
//      });

//     prev.addEventListener('click', ()=>{
//         //сдвигаем слайд
//         if(offset == 0){        //если это первый слайд
//             offset = widthInt * (slides.length -1);
//         }
//         else{
//             offset -= widthInt;
//         }
//         slideIndex =(slideIndex == 1)? slides.length:--slideIndex;
//         setCurrent();
//     });

//       ///////////////////////////////////////////////////////////////////////////////////////////
//     //точки для слайдера
//     ///////////////////////////////////////////////////////////////////////////////////////////
  
//     slider.style.position = 'relative';
//     //создаем оберетку для точек и выставляем стили
//     const indicatorDots = document.createElement('ol');
//     indicatorDots.classList.add('carousel-indicators');
//     //mожно добавить ему свойства в css файл, а можно javascriptом
//     indicatorDots.style.cssText =`
//         position: absolute;
//         right: 0;
//         bottom: 0;
//         left: 0;
//         z-index: 15;
//         display: flex;
//         justify-content: center;
//         margin-right: 15%;
//         margin-left: 15%;
//         list-style: none;
//     `;
//     slider.append(indicatorDots);
//     //создаем точки

//     const clickDot = (e)=>{
//         if(e && e.target){
//             const dot = e.target;
//             slideIndex = +(e.target.getAttribute('data-slide-to'));
//             offset = widthInt * (slideIndex -1);
//             setCurrent();
//         }
//     };


//     for(let i = 0; i< slides.length;i++){
//         const dot = document.createElement('li');
//         dot.classList.add('dot');
//         dot.setAttribute('data-slide-to',i+1);// к какому слайду точка относиться
//         dot.style.cssText = `
//             box-sizing: content-box;
//             flex: 0 1 auto;
//             width: 30px;
//             height: 6px;
//             margin-right: 3px;
//             margin-left: 3px;
//             cursor: pointer;
//             background-color: #fff;
//             background-clip: padding-box;
//             border-top: 10px solid transparent;
//             border-bottom: 10px solid transparent;
//             opacity: .5;
//             transition: opacity .6s ease;
//         `;
//         indicatorDots.append(dot);
//         dot.addEventListener('click', clickDot);
//         dots.push(dot);
//     }
   
//     const setCurrent = ()=> {
//         //картинки
//         slidesField.style.transform =`translateX(-${offset}px)`;
//         //нумерация - текстовое поле
//         current.textContent = (slides.length < 10)?`0${slideIndex}`:slideIndex; 

//         //точки
//         dots.forEach((dot,index)=>{
//             if(index == slideIndex-1){//активаня точка
//                 dot.style.opacity = 1;
//             }
//             else{
//                 dot.style.opacity = '.5';
//             }
//         });
       
//     };

//     setCurrent();

// }
// //module.exports = slider;//можно писать так
// // можно эксортировать по умолчанию
// export default slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    //////////////////////////////////////////////////////////////////////////////
    //tabs
    //////////////////////////////////////////////////////////////////////////////
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    //скрывание ненужных табов (картинок)
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        //убираем класс активности tabheader__item_active
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    //в шестом стандарте можно использовать параметры по умолчанию (i = 0)
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        //ставим класс активности tabheader__item_active
        tabs[i].classList.add(activeClass);
    }
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);

                }
            });
        }
    });
    hideTabContent();
    showTabContent();
}

//module.exports = tabs;//можно писать так
// можно эксортировать по умолчанию
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id,deadLine){
  //////////////////////////////////////////////////////////////////////////////
    //timer
    //////////////////////////////////////////////////////////////////////////////
   
    //ф-ция определяет разницу между дедлайном и текущем временем
    function getTimeRemaining(endtime) {
        //endtime приходит в формате строки '2022-05-11'
        //получим разницу между endtime и текущей датой в кол-ве миллисек
        const t = Date.parse(endtime) - Date.parse(new Date());
        //разницу нужно превратить в кол-во дней,часов,минут
        //Math.floor() - округление до ближайщего целого
        const days = Math.floor(t / (1000 * 60 * 60 * 24)); //1000*60*60*24 - кол-во миллисек. в сутках
        const hours = Math.floor((t / (1000 * 60 * 60) % 24)); //колт-во часов
        const minutes = Math.floor((t / (1000 * 60) % 60)); //колт-во часов
        const seconds = Math.floor((t / (1000) % 60)); //колт-во часов
        //вернем объект из ф-ции
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //подставляем 0 впереди
    function getZero(num) {
        if (num >= 0 && num < 10) {
            //превращаем число в строку и подставляем впереди 0, если число меньше 10
            return `0${num}`;
        } else {
            return num;
        }
    }
    //ф-ция, которая будет устанавливать время на страницу
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        //один раз запустим  updateClock(), чтобы не было мигания верстки
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime); //запускаем таймер и получаем объект
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            //останавливаем таймер
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadLine);
}
//module.exports = timer;//можно писать так
// можно эксортировать по умолчанию
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
 function postData(){
 
    //////////////////////////////////////////////////////////////////////////////
    //отправка форм на сервер
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //API (готовые методы и свойства, которые мы можем использовать)
    //////////////////////////////////////////////////////////////////////////////
    //fetch API
    //////////////////////////////////////////////////////////////////////////////
    //https://jsonplaceholder.typicode.com

    //fetch -получить данные с url.(get запрос) fetch использует promise
    //получаем JSON объект
    //response.json() - превращает JSON объект в обычный объкт используя promise. когда выполниться promise, попадаем в then
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json));
    // //post запрос. Отправка данных
    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //     method: "POST",
    //     body: JSON.stringify({name:'Alex'}),
    //     headers:{
    //         'Content-type': 'application/json'
    //     }
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json));
    //////////////////////////////////////////////////////////////////////////////
     // перепишем function postData(form) из-за множества комментов  в bindpostData
    //отправка данных на сервер без перезагрузки страницы
    // function postData(form)
    // {
    //     form.addEventListener('submit',(e)=>
    //     {
    //         e.preventDefault();

    //         //простое некрасивое оповещение пользователя
    //         //создание нового блока на странице, куда будет выводиться сообщение о состоянии оправки формы
    //         // const statusMessage = document.createElement('div');
    //         // statusMessage.classList.add('status');
    //         // statusMessage.textContent = message.loading;
    //         // form.append(statusMessage);

    //         //сообщение с картинкой
    //         const statusMessageImg = document.createElement('img');
    //         statusMessageImg.src = message.loading;
    //         statusMessageImg.style.cssText = `
    //             display:block;
    //             margin:0 auto;
    //         `;
    //        // form.append(statusMessageImg);// иногда ломает верстку
    //        form.insertAdjacentElement('afterend',statusMessageImg);
    //         ////////////////////////////////////
    //         //XMLHttpRequest устаревший вариате
    //         // const request = new XMLHttpRequest();
    //         // request.open('POST', 'server.php');
    //         //
    //         //form data - получение данных из формы с помощью объекта FormData
    //         //и отправка на сервер в виде FormData
    //         //

    //         //здесь важно, чтобы в html файле у всех контролов формы (например у input) был аттрибут name
    //         //этот заголовок устанавливать  не нужно!!! Получим пустой объект от сервера
    //         // //request.setRequestHeader('Content-type','multipart/form-data');
    //         // const formData = new FormData(form);

    //         // request.send(formData);

    //         // request.addEventListener('load',()=>{
    //         //     if(request.status === 200){
    //         //         console.log(request.response);
    //         //         statusMessage.textContent = message.success;
    //         //         //очистка полей формы
    //         //         form.reset();
    //         //         //убираем сообщение о статусе
    //         //         setTimeout(()=>{
    //         //             statusMessage.remove();
    //         //         },2000);
    //         //     }
    //         //     else{
    //         //         statusMessage.textContent = message.failure;
    //         //     }

    //         // });
    //         //
    //         ///////////////////////////////////////////////////////
    //         //Отправка на сервер в формате JSON
    //         //
    //         //тут уже нужен заголовок
    //       //  request.setRequestHeader('Content-type','application/json');
    //         const formData = new FormData(form);

    //         //нужно превратить FormData в обычный объект для JSON
    //          const object = {};
    //          formData.forEach(function(value,key){
    //              object[key] = value;
    //          });

    //         // const json = JSON.stringify(object);

    //         // request.send(json);

    //         // request.addEventListener('load',()=>{
    //         //     if(request.status === 200){
    //         //         console.log(request.response);
    //         //           //показ формы о загрузке
    //         //           showThanksModal(message.success);
    //         //     //  statusMessage.textContent = message.success;
    //         //         //очистка полей формы
    //         //         form.reset();
    //         //         //убираем сообщение о статусе
    //         //         // setTimeout(()=>{
    //         //         //     statusMessage.remove();
    //         //         // },2000);
    //         //         //убираем спиннер
    //         //         setTimeout(()=>{
    //         //             statusMessageImg.remove();
    //         //         },2000);

    //         //     }
    //         //     else{
    //         //         //statusMessage.textContent = message.failure;
    //         //         //показ формы о загрузке
    //         //         showThanksModal(message.failure);
    //         //     }

    //         // });
    //         ///////////////////////////////////////////////
    //         //использует fetch для отправки на сервер
    //         //promise придет в then когда выполниться запрос

    //         fetch('server.php',{
    //              method: "POST",
    //              headers:{
    //              'Content-type':'application/json'
    //              },
    //             // body: formData           //если передаем form data и headers нужно закоментировать
    //             body:JSON.stringify(object) //если передаем JSON объект и headers нужно расскоментировать и в .php расскомент
    //         }).then(data=>data.text()) //ответ от сервера
    //         .then(data=>{
    //             console.log(data);
    //             //показ формы о загрузке
    //             showThanksModal(message.success);
    //             //убираем сообщение о статусе
    //             statusMessageImg.remove();
    //         }).catch(()=>{
    //             showThanksModal(message.failure);
    //         }).finally(()=>{
    //              //очистка полей формы
    //             form.reset();

    //         });
    //     });
    // }

    //////////////////////////////////////////////////////////////////////////////
    //JSON сервер
    //////////////////////////////////////////////////////////////////////////////

    // fetch('db.json')
    // .then(data=>data.json())
    // .then(res => console.log(res));

    //https://coderoad.ru/55547572/json-сервер-не-распознается-как-внутренняя-или-внешняя-команда
    //Во-первых, вам нужно проверить, установлен ли json-server глобально или нет. или вы можете установить его глобально с помощью
    //npm install -g json-server
    //Если вы устанавливаете его локально в своем проекте, используйте npx для его запуска
    //npx json-server --watch db.json
    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));
    //////////////////////////////////////////////////////////////////////////////
    //ф-ция отправляет (постит) запрос на сервер, возвращает объект json
    //необходимо использовать async await (подобие синхронного кода)
    //asinc - указывает, что ф-ция использует асинхронный код, а await - какого вызова нам нужно дождаться
    //await - дожидается окончания запроса и в res поместиться результат от сервера
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json(); //это promice, поэтому тоже нужен await, а потом выполниться return
    };

   
    //получение ресурсов
    const getResource = async (url) => {
        const res = await fetch(url);
        //fetch не выдает catch, поэтому используем свойства
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json(); //это promice, поэтому тоже нужен await, а потом выполниться return
    };
  // getResource('http://localhost:3000/menu')
    // .then(data =>{
    //     data.forEach(({img,altimg,title,descr,price}) =>{
    //         new MenuCard(img,altimg,title,descr,price,'.menu .menu__field .container').render();
    //     });
    // });

    //ecли используем библиотеку axios

    
    //не использует классы, а создает классы налету
    // getResource('http://localhost:3000/menu')
    // .then(data =>createCard(data)); 
    // function createCard(data){
    //     data.forEach(({img,altimg,title,descr,price}) =>{
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <div class="menu__item">
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                 </div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .menu__field .container').append(element);
    //     });
    // }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
 
 //используем стандарт IE6. В подключаемых скриптах у нас экспорт по умолчанию
 
 
 
 
 
 
 

window.addEventListener('DOMContentLoaded', () => {
    //не стандарт IE6
    //используем require
    // const   tabs = require('./modules/tabs'),
    //         modal = require('./modules/modal'),
    //         cards = require('./modules/cards'),
    //         timer = require('./modules/timer'),
    //         calc = require('./modules/calc'),
    //         slider = require('./modules/slider');

    // tabs();
    // modal();
    // cards();
    // timer();
    // calc();
    // slider();

    //вызов модального окна по таймеру
    const modalTimerID = setInterval(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.ShowHideModalWindow)('.modal', modalTimerID), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal',modalTimerID);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])('.modal');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer', '2022-05-11');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    //slider();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider', 
        slide : '.offer__slide', 
        nextArrow : '.offer__slider-next',
        prevArrow : '.offer__slider-prev', 
        totalCounter : '#total',
        currentCounter : '#current', 
        wrapper : '.offer__slider-wrapper', 
        field : '.offer__slider-inner'
    });
}); 
//npx json-server --watch db.json
//npx webpack 
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map