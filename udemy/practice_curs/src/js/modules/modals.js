const modals = () => {

    function onModal(modal,  bShow = true){
        const windows = document.querySelectorAll('[data-modal]');//в index.html мы пометили все модальные окна дата аттрибутом data-modal. чтобы закрыть все модальные окна если их открыто в документе несколько
        windows.forEach(item => {
            item.style.display = "none";  
        });

        if(bShow){
            modal.style.display = "block";
             //чтобы body под модальным окном не скролировался
             //document.body.style.overflow = "hidden";
             //класс из будстрепа
             document.body.classList.add('modal-open');   
        }
        else{
            modal.style.display = "none";
            //чтобы body  скролировался
            //document.body.style.overflow = "";
             //класс из будстрепа
            document.body.classList.remove('modal-open');
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
            onModal(document.querySelector(selector));
        },time);
    }

    bindModal('.popup_engineer_btn','.popup_engineer','.popup_engineer .popup_close');
    bindModal('.phone_link','.popup','.popup .popup_close');
   // showModalByTime('.popup', 60000);

    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
   
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close',false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close',false);
};

export default modals;