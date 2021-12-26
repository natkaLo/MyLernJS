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
export default modal;
//именованный экспорт
export {ShowHideModalWindow};
