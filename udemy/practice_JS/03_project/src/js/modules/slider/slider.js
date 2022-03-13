//создание слайдера с наследованием
class SliderBase{            //классы пишутся с большой буквы
  
    getSlidesArr()
    {
        // this.slides = this.container.children; // cлайды находятся внутри элемента, переданного как контейнер. Получаем иx

        // но из-за проблемы, что в слайдере .feed__slider находятся не только дивы со слайдами, но и кнопки, превратим HTMLElement Collection
        // в массив и исключим кнопки.
         // Create an array based on a property of DOM Elements
         try{
            //console.log(this.container);
         let array = Array.from(this.container.children);
         //console.log(this.container.children);
         this.slides = array.filter(child =>{
            return child.tagName != 'BUTTON';
         });
         //console.log(this.slides.length);
        }
        catch(e){}
         //console.log(this.slides);
    }
    constructor(container = null, btns = null, next =null, prev = null){ 
         this.container = document.querySelector(container);       //создаем новое свойство класса - container
         this.getSlidesArr();
         this.btns = document.querySelectorAll(btns);
         this.prev = document.querySelectorAll(prev);
         this.next = document.querySelectorAll(next);
         this.slideIndex = 1;
    }
}
export default class Slider extends SliderBase{            //классы пишутся с большой буквы
    //из дочернего класса передаем объект. Сдесь его сразу деструктурируем ( //container- контейнер для слайдера (на какой странице слайдер), btns - кнопки переключения). 
    //Дефолтное значение - пустой объект
    constructor({container = null, btns = null, next =null, prev = null, activeClass = '', animateElements = null, autoplay = false} = {}){ 
        // console.log(container,btns,prev,next);
         super(container, btns, prev,next);
         this.activeClass =activeClass;
         this.animateElements = animateElements;
         this.autoplay = autoplay;
         this.timerID = null;
    }
    updateSlidersArr()
    {
        //после каждого изменения дома элементов на странице (например  this.container.insertBefore) нужно менять и наш массив слайдов без кнопок
        this.getSlidesArr();
    }
}

//создание слайдера без наследования (только слайдер с первой страницы)
// export default class Slider{            //классы пишутся с большой буквы
//     constructor(page, btns, showElementByTimeClassName){    //page- на какой странице слайдер, btns - кнопки переключения
//         this.page = document.querySelector(page);       //создаем новое свойство класса page
//         this.slides = this.page.children; // cлайды находятся внутри элемента page. Получаем иx
//         this.btns = document.querySelectorAll(btns);
//         this.slideIndex = 1;
//         this.showElementByTimeClassName = showElementByTimeClassName;//класс елемента, который нужно показать через 3 сек
//     }
//     showByTime(){
//         this.showElementByTime.classList.add('animated');
//         setTimeout(()=>{
//             this.showElementByTime.style.opacity = '1';
//             this.showElementByTime.classList.add('slideInUp');
//         },3000);
//     }
//     //n - куда двигается наш слайд. Вперед 1, назад -1
//     showSlides(n){
//         if(n > this.slides.length){
//             this.slideIndex = 1;
//         }
//         if(n < 1){
//             this.slideIndex = this.slides.lenght;
//         }
//         this.slides.forEach(slide => {
//            slide.style.display = 'none';
//         });
//         let currentSlide = this.slides[this.slideIndex -1];

//         currentSlide.style.display = 'block';
//         try{
//             this.showElementByTime = document.querySelector(this.showElementByTimeClassName); //елемент, который нужно показать через 3 сек
//             if(this.showElementByTime){
//                 this.showElementByTime.style.opacity = '0';
//                 this.showElementByTime.classList.remove('slideInUp');
//                 if(this.showElementByTime.parentNode.parentNode.parentNode == currentSlide){
//                     // console.log('modules');
//                    this.showByTime();
//                }
//             }
//         }catch(e){
//         }
//     }
//     plusSlides(n){
//         this.showSlides(this.slideIndex += n);
//     }
    
//     render(){
//        // console.log(this.page,this.slides);
//        this.btns.forEach(btn =>{
//             btn.addEventListener('click', () => {
//                 this.plusSlides(1);
//             });
//         btn.parentNode.previousElementSibling.addEventListener('click', (e) =>{  //при клике на логотип - переход к первому слайду
//             this.slideIndex = 1;
//             this.showSlides(this.slideIndex);
//             });
//        });
//        this.showSlides(this.slideIndex);
//     }
// }