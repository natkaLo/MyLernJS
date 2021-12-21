window.addEventListener('DOMContentLoaded', () => {
    //////////////////////////////////////////////////////////////////////////////
    //tabs
    //////////////////////////////////////////////////////////////////////////////
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    //скрывание ненужных табов (картинок)
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        //убираем класс активности tabheader__item_active
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    //в шестом стандарте можно использовать параметры по умолчанию (i = 0)
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        //ставим класс активности tabheader__item_active
        tabs[i].classList.add('tabheader__item_active');
    }
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
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
    //////////////////////////////////////////////////////////////////////////////
    //timer
    //////////////////////////////////////////////////////////////////////////////
    const deadLine = '2022-05-11';
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
    setClock('.timer', deadLine);
    //////////////////////////////////////////////////////////////////////////////
    //модальное окно
    //////////////////////////////////////////////////////////////////////////////
    const modalTriggers = document.querySelectorAll('[data-modal]'); //'[...]' - получение через data аттрибут
    const modalWindow = document.querySelector('.modal');

    function ShowHideModalWindow(wnd) {

        wnd.classList.toggle('show');

        //чтобы если на экране показано модальное окно - прокрутка документа не работала
        let overflow = '';
        if (wnd.classList.contains('show')) {
            overflow = 'hidden';
        }
        document.body.style.overflow = overflow;
        // останавливаем таймер
        //clearInterval(modalTimerID);


        //  if(wnd.classList.contains('show')){
        //         wnd.classList.add('hide');
        //         wnd.classList.remove('show');
        //  }
        //  else{

        //      wnd.classList.add('show');
        //      wnd.classList.remove('hide');
        //  }
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => ShowHideModalWindow(modalWindow));
    });
    //добавим  в условии  event.target.getAttribute('data-close')==''
    //modalWindow.querySelector('[data-close]').addEventListener('click', () =>ShowHideModalWindow(modalWindow));

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.getAttribute('data-close') == '') {
            ShowHideModalWindow(modalWindow);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            ShowHideModalWindow(modalWindow);
        }
    });

    //вызов модального окна по таймеру
    const modalTimerID = setInterval(() => ShowHideModalWindow(modalWindow), 50000);

    //вызов модального окна по скролу к концу документа

    //window.pageYOffset - прокрученная часть
    // document.documentElement.clientHeight - видимая часть документа
    // document.documentElement.scrollHeight - высота всего сайта

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            ShowHideModalWindow(modalWindow);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    //deлаем ф-цию колбек showModalByScroll чтобы в ней убрать листенера. При повторной прокрутке до конца документа окно не покажется
    window.addEventListener('scroll', showModalByScroll);

    //////////////////////////////////////////////////////////////////////////////
    //Наше меню на день - используем классы для карточек
    //////////////////////////////////////////////////////////////////////////////
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
    const forms = document.querySelectorAll('form');

    //красивое оповещение пользователя
    function showThanksModal(message) {
        //будем скрывать существующее модальное окно и создавать новое со статусом
        const prevModalDialog = modalWindow.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        if (!modalWindow.classList.contains('show')) {
            ShowHideModalWindow(modalWindow);
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
            ShowHideModalWindow(modalWindow);
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

            postData('http://localhost:3000/requests', json)
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

    axios.get('http://localhost:3000/menu')
    .then(data =>{
             data.data.forEach(({img,altimg,title,descr,price}) =>{
                 new MenuCard(img,altimg,title,descr,price,'.menu .menu__field .container').render();
             });
     });
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
    const  slidesWraper = document.querySelector(".offer__slider-wrapper"), // общая обертка для всех слайдов
            prev = document.querySelector('.offer__slider-prev'),           //кнопка prev
            next = document.querySelector(".offer__slider-next"),           //кнопка next
            total = document.querySelector('#total'),                       //поле total
            current = document.querySelector('#current'),                   //поле current
            slides = document.querySelectorAll('.offer__slide'),            //каждый отдельный слайд
            slidesField = document.querySelector(".offer__slider-inner"),   // общая обертка для всех слайдов внутри slidesWraper
            width = window.getComputedStyle(slidesWraper).width,            //видимая ширина ленты слайдов вычисленная автоматически при загрузке
            widthInt = +width.slice(0, width.length -2);                    //видимая ширина ленты число (width - это строка ..px)
    const slider = document.querySelector('.offer__slider'),
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
});