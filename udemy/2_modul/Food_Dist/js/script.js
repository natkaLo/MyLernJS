 
 //используем стандарт IE6. В подключаемых скриптах у нас экспорт по умолчанию
 import  tabs from './modules/tabs';
 import  modal from './modules/modal';
 import  cards  from './modules/cards';
 import  timer  from './modules/timer';
 import  calc  from './modules/calc';
 import  slider from './modules/slider';
 import {ShowHideModalWindow} from './modules/modal';

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
    const modalTimerID = setInterval(() => ShowHideModalWindow('.modal', modalTimerID), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]','.modal',modalTimerID);
    cards('.modal');
    timer('.timer', '2022-05-11');
    calc();
    //slider();
    slider({
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