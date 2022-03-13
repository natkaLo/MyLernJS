import Slider from "./slider";

export default class MiniSlider extends Slider{
    constructor(obj){
        super(obj);
    }

    animate(activeElem)
    {
        if(!this.animateElements ){
            return;
        }
        this.slides.forEach(slide => {
            this.animateElements.forEach(elem => {
                 slide.querySelector(elem).style.opacity = (slide == activeElem)?'1':0.4;
               });
        });
    }

    decorizesSlides(){
        if(this.activeClass.length > 0){
             //удаляем класс активности со всех слайдов
             this.slides.forEach(slide => {
                slide.classList.remove(this.activeClass);
            });
             //устанавливаем активный слайд
            const activeSlide = this.slides[0];
            activeSlide.classList.add(this.activeClass);
            this.animate(activeSlide);
        }
    }

    nextSlide(){
        //console.log(this.autoplay);
        this.container.appendChild(this.slides[0]); // при этом он сам удаляется с позицию и перемещается на нужную
        this.updateSlidersArr();
         this.decorizesSlides();
    }
    prevSlide(){
        let lastSlide = this.slides[this.slides.length -1];
            this.container.insertBefore(lastSlide,this.slides[0]);// при этом он сам удаляется с позицию и перемещается на нужную
            this.updateSlidersArr();
            this.decorizesSlides();
    }
    activateAnimation(){
        if(this.autoplay){
            this.timerID  =  setInterval(()=>this.nextSlide(), 1000);
       }
    }
    stopAnimation(){
        if(this.autoplay){
            clearInterval(this.timerID );
       }
    }

    bindTriggers(){
        //когда переключаем слайд вперед - наш первый слайд добавляется в конец
        this.next.forEach(item => {
            item.addEventListener('click', () => this.nextSlide());
            item.addEventListener('mouseenter', () => this.stopAnimation());
            item.addEventListener('mouseleave', () => this.activateAnimation());
        });
       
        //нужно последний слайд поместить перед первым
        this.prev.forEach(item => {
            item.addEventListener('click',()=> this.prevSlide());
            item.addEventListener('mouseenter', () => this.stopAnimation());
            item.addEventListener('mouseleave', () => this.activateAnimation());
        });
       
        this.container.addEventListener('mouseenter', () => this.stopAnimation());
        this.container.addEventListener('mouseleave', () => this.activateAnimation());
    }
   
    init(){
        try{
       // console.log(this.container,this.prev,this.next);
        this.container.style.cssText = `
            display:flex;
            flex-wrap:wrap;
            overflow:hidden;
            align-items:flex-start;
        `;
        this.bindTriggers();
        this.decorizesSlides();
        this.activateAnimation();
        }catch(e){}
    }
}