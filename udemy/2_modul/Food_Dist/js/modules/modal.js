function modal(){

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
}
module.exports = modal;