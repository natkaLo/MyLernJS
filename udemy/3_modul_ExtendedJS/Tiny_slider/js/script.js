'use strict';
// из github
//устанавливаем в проект 
//npm install tiny-slider--save

//импортируем
import {tns} from "tiny-slider";

tns({
    container: '.my-slider',
    items: 1, 
    slideBy: 'page',
    autoplay: true
});