window.addEventListener('DOMContentLoaded', ()=>{
//////////////////////////////////////////////////////////////////////////////
//tabs
//////////////////////////////////////////////////////////////////////////////
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    //скрывание ненужных табов (картинок)
    function hideTabContent(){
        tabsContent.forEach(item => {
           item.classList.add('hide');
           item.classList.remove('show', 'fade');
        });
        //убираем класс активности tabheader__item_active
        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }
    //в шестом стандарте можно использовать параметры по умолчанию (i = 0)
    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        //ставим класс активности tabheader__item_active
        tabs[i].classList.add('tabheader__item_active');  
    }
    tabsParent.addEventListener('click', (event)=>{
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
           tabs.forEach((item,i)=>{
                if(target == item) {
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
    function getTimeRemaining(endtime){
        //endtime приходит в формате строки '2022-05-11'
        //получим разницу между endtime и текущей датой в кол-ве миллисек
        const t = Date.parse(endtime) - Date.parse(new Date());
        //разницу нужно превратить в кол-во дней,часов,минут
        //Math.floor() - округление до ближайщего целого
        const days = Math.floor(t/(1000*60*60*24));//1000*60*60*24 - кол-во миллисек. в сутках
        const hours = Math.floor((t/(1000*60*60)%24));//колт-во часов
        const minutes = Math.floor((t/(1000*60)%60));//колт-во часов
        const seconds = Math.floor((t/(1000)%60));//колт-во часов
        //вернем объект из ф-ции
        return {
            'total': t,
            'days' : days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //подставляем 0 впереди
    function getZero(num){
        if(num >=0 && num < 10){
            //превращаем число в строку и подставляем впереди 0, если число меньше 10
            return`0${num}`;
        }
        else{
            return num;
        }
    }
    //ф-ция, которая будет устанавливать время на страницу
    function setClock(selector, endtime)
    {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock,1000);
    //один раз запустим  updateClock(), чтобы не было мигания верстки
    updateClock();     
        function updateClock(){
            const t = getTimeRemaining(endtime); //запускаем таймер и получаем объект
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours); 
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            //останавливаем таймер
            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer',deadLine);
//////////////////////////////////////////////////////////////////////////////
//модальное окно
//////////////////////////////////////////////////////////////////////////////
    const modalTriggers = document.querySelectorAll('[data-modal]');//'[...]' - получение через data аттрибут
    const modalWindow = document.querySelector('.modal');

    function ShowHideModalWindow(wnd){
        
        wnd.classList.toggle('show');

         //чтобы если на экране показано модальное окно - прокрутка документа не работала
        let overflow = '';
        if(wnd.classList.contains('show')){
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

    modalTriggers.forEach(trigger=>{
        trigger.addEventListener('click', () => ShowHideModalWindow(modalWindow));
    });
    modalWindow.querySelector('[data-close]').addEventListener('click', () =>ShowHideModalWindow(modalWindow));

    modalWindow.addEventListener('click', (event)=>{
       if(event.target === modalWindow){
            ShowHideModalWindow(modalWindow);
       }
     });

     document.addEventListener('keydown',(e)=>{
        if(e.code ==='Escape' && modalWindow.classList.contains('show')){
            ShowHideModalWindow(modalWindow);
        }
    });

    //вызов модального окна по таймеру
    //const modalTimerID = setInterval(() => ShowHideModalWindow(modalWindow), 5000);

    //вызов модального окна по скролу к концу документа

    //window.pageYOffset - прокрученная часть
    // document.documentElement.clientHeight - видимая часть документа
    // document.documentElement.scrollHeight - высота всего сайта

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            ShowHideModalWindow(modalWindow);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    //deлаем ф-цию колбек showModalByScroll чтобы в ней убрать листенера. При повторной прокрутке до конца документа окно не покажется
    window.addEventListener('scroll', showModalByScroll);

 //////////////////////////////////////////////////////////////////////////////
//Наше меню на день - используем классы для карточек
//////////////////////////////////////////////////////////////////////////////
class MenuCard{
    constructor(src, alt, title, description, price, parentSelector,...classes){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.price = price;
        this.classes = classes;//массив
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
    }
    // из долларов в гривны
     changeToUAH(){
        this.price = this.price * this.transfer;
    }
   // формирование верстки
    render(){
        const element = document.createElement('div');
        //обработаем массив classes
        if(this.classes.length === 0){
            this.element = 'menu__item';
            element.classList.add(this.element);
        }
        else{
        this.classes.forEach(className=> element.classList.add(className));
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
      this.parent.append(element);//помещаем элемент на страницу в родительский элемент
     }
 }
   
   // const vegy = new MenuCard("img/tabs/vegy.jpg","vegy",'Меню "Фитнес"','Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей.
   // Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',229,'.container');
     //console.log(document.querySelector('.menu .menu__field .container'));
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .menu__field .container',
        'menu__item',
        'big'

    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .menu__field .container'
        
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        12,
        '.menu .menu__field .container',
        'menu__item'
    ).render();
});