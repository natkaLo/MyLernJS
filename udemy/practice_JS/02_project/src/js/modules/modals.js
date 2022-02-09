const modals = () => {

    function onModal(modal,  bShow = true){
        const   windows = document.querySelectorAll('[data-modal]'),//в index.html мы пометили все модальные окна дата аттрибутом data-modal. чтобы закрыть все модальные окна если их открыто в документе несколько
                scrollWidth = calcScroll();
        windows.forEach(item => {
            item.style.display = "none";  
        });

        if(bShow){
            modal.style.display = "block";
             //чтобы body под модальным окном не скролировался
             //document.body.style.overflow = "hidden";
             //класс из будстрепа
             document.body.classList.add('modal-open');   
             document.body.style.marginRight = `${scrollWidth}px`;//чтобы при появлении модального окна body документа не прыгало
        }
        else{
            modal.style.display = "none";
            //чтобы body  скролировался
            //document.body.style.overflow = "";
             //класс из будстрепа
            document.body.classList.remove('modal-open');
            document.body.style.marginRight ="0px";
        }
    }
    //привязка модального окна к определенному триггеру 
    //triggerSelector - селектор кнопки по которой будем кликать, modalSelector - модальное окно, которое будем показывать
    //closeSelector - селектор по которому будем закрывать окно, closeClickOverlay - будем ли закрывать по клику на подложку
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true){

        const   trigger = document.querySelectorAll(triggerSelector),
                modal = document.querySelector(modalSelector),
                close = document.querySelector(closeSelector);
                

        trigger.forEach(item =>{

            item.addEventListener('click', (event) => {
                if(event && event.target){
                    event.preventDefault();
                
                onModal(modal);
                }
            });

        });
        close.addEventListener('click', () => {
            onModal(modal,false);
        });
        //чтобы окно закрывалась по клику мимо окна
        modal.addEventListener('click', (event) => {
            if(event.target === modal && closeClickOverlay){
                onModal(modal,false);
            }

        });

    }

    function showModalByTime(selector,time){
        setTimeout(function(){
            let display; //в лог. контексте false
            //не будем показывать, если показано кокое-то модальное окно
            //получаем все модальные окна
            document.querySelectorAll('[data-modal]').forEach(item => {
                //обращаемся к computed style и спрашиваем - показано ли сейчас какое-то мод. окно
                if(getComputedStyle(item).display !== 'none'){
                    display = "block";//в лог. контексте true
                }
            });
            if(!display){
                onModal(document.querySelector(selector));
            }
        },time);
    }

    //чтобы при появлении модального окна body документа не прыгало. Т.к мы запрещаем прокрутку документа под модальным окном, скрол скрывается (поэтому и прыгает)
    //расчитаем ширину скрол бара и заменим маргином для документа справа
    function calcScroll(){
        //cоздаем фейковый скрытый div 
        let div = document.createElement('div');
        div.style.width = '50px';   //нужно задать высоту и ширину чтобы div появился
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div); //cтавим div на страницу
        let scrollWidth = div.offsetWidth - div.clientWidth; //div.offsetWidth - полная ширина,  div.clientWidth - ширина без прокрутки
        div.remove();  //удаляем фейковый див со страницы
        return scrollWidth;
    }


    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation','.popup-consultation','.popup-consultation .popup-close')
    showModalByTime('.popup-consultation', 5000);
};

export default modals;