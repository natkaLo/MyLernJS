import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import filter from './modules/filter';
import pictureSize from './modules/pictureSize';
import burger from './modules/burger';
import accordion from './modules/accordion';
import scrolling from './modules/scrolling';
import drop from './modules/drop';

window.addEventListener("DOMContentLoaded", () =>{
    'use strict';
    modals();
    sliders('.feedback-slider-item','horizontal','.main-prev-btn','.main-next-btn');
    sliders('.main-slider-item','vertical');

    forms();

    mask('[name="phone"]'); //передаем селектор по аттрибуту

    checkTextInputs('[name = "name"]');
    checkTextInputs('[name = "message"]');
    //показ скрытых в верстке карточек
    // showMoreStyles('.button-styles', '.styles-2');
    // показ карточек, загруженных из db.json через JSON сервер
    showMoreStyles('.button-styles', '#styles .row'); // вставляем в элемент с классом row, который нах-ся в элементе с id style
    calc('#size','#material','#options','.promocode','.calc-price');

    filter();
    pictureSize('.sizes-block');
    burger('.burger-menu', '.burger');

      //способ создания аккардиона с помощью css 
    // accordion('.accordion-heading', '.accordion-block');
    //с помощью java script
    accordion('.accordion-heading');

    //плавный скролл
    scrolling('.pageup');
    drop();
});