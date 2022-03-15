import MainSlider from "./modules/slider/slider-main";
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from "./modules/playVideo";
import Difference from './modules/difference';
import Form from './modules/form';
import ShowInfo from './modules/showInfo';
import Download from './modules/download'

window.addEventListener('DOMContentLoaded', () =>{
    //создание слайдера без наследования (только слайдер с первой страницы)
    // const slider= new Slider('.page','.next','.hanson');
    // slider.render();

    //создание слайдера с наследованием 
    //для первой страницы. Передаем объект с деструкторизацией. И параметр  showElementByTimeClassName 
    //Поэтому в MainSlider получаем в конструктор объект с полями btns, container и значениями .next .page и параметр showElementByTimeClassName со значением.hanson
    const slider = new MainSlider({btns:'.next', container: '.page'},'.hanson');
    slider.render();

    const modulePageSlider = new MainSlider({btns:'.next', container: '.moduleapp',next:".nextmodule", prev:".prevmodule"});
    modulePageSlider.render();

    const showUpSlider = new MiniSlider(
        {container:'.showup__content-slider',
         prev:'.showup__prev',
         next:'.showup__next',
         activeClass:'card-active',
         animateElements:['.card__title', '.card__controls-arrow']
        });
    showUpSlider.init();

    const modulesSlider = new MiniSlider(
        {container:'.modules__content-slider', 
        prev:'.modules__info-btns .slick-prev',
        next:'.modules__info-btns .slick-next',
        activeClass:'card-active',
        animateElements:['.card__title', '.card__controls-arrow'],
        autoplay:true
        });
    modulesSlider.init();

    const feedSlider = new MiniSlider(
        {container:'.feed__slider', 
         prev:'.feed__slider .slick-prev',
         next:'.feed__slider .slick-next',
         activeClass:'feed__item-active',
        });
    feedSlider.init();

    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video-item .play', '.overlay').init();

    const oldDifference = new Difference('.officerold','.officer__card-item');
    oldDifference.init();
    new Difference('.officernew','.officer__card-item').init();

    new Form('.form').init();

    new ShowInfo('.plus__content').init();
    new Download('.download').init();
   
});