import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';

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
});