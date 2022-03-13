import SliderBase from "./slider";

export default class MainSlider extends SliderBase{
    constructor(obj,showElementByTimeClassName){//получаем в конструктор объект с полями btns, page и значениями .next .page и параметр showElementByTimeClassName со значением.hanson
        super(obj);  //родительскому классу Slider отправляем объект
       // console.log(obj);
        //console.log(showElementByTimeClassName);
        this.showElementByTimeClassName = showElementByTimeClassName;//класс елемента, который нужно показать через 3 сек
    }
    showByTime(){
        this.showElementByTime.classList.add('animated');
        setTimeout(()=>{
            this.showElementByTime.style.opacity = '1';
            this.showElementByTime.classList.add('slideInUp');
        },3000);
    }
    //n - куда двигается наш слайд. Вперед 1, назад -1
    showSlides(n){
        //console.log(n);
        //console.log( this.slides.length);
        if(n > this.slides.length){
            this.slideIndex = 1;
        }
        if(n < 1){
            this.slideIndex = this.slides.length;
            //console.log(this.slideIndex);
        } 
        
        this.slides.forEach(slide => {
           slide.style.display = 'none';
        });
        let currentSlide = this.slides[this.slideIndex -1];

        currentSlide.style.display = 'block';
        try{
            this.showElementByTime = document.querySelector(this.showElementByTimeClassName); //елемент, который нужно показать через 3 сек
            if(this.showElementByTime){
                this.showElementByTime.style.opacity = '0';
                this.showElementByTime.classList.remove('slideInUp');
                if(this.showElementByTime.parentNode.parentNode.parentNode == currentSlide){
                    // console.log('modules');
                   this.showByTime();
               }
            }
        }catch(e){
        }
    }
    plusSlides(n){
        this.showSlides(this.slideIndex += n);
    }
    bindActions(){
         // console.log(this.page,this.slides);
         this.btns.forEach(btn =>{
                btn.addEventListener('click', () => {
                this.plusSlides(1);
            });
            btn.parentNode.previousElementSibling.addEventListener('click', (e) =>{  //при клике на логотип - переход к первому слайду
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
                });
            });
            this.next.forEach(item => {
                item.addEventListener('click', (e) =>{
                    e.stopPropagation();//чтобы событие клика не всплывало к верхнему элементу(если там есть обработчик на клик - клик сработает дважды)
                    e.preventDefault();
                    this.plusSlides(-1);
                });
            });
            this.prev.forEach(item => {
                item.addEventListener('click', (e) =>{
                    e.stopPropagation();//чтобы событие клика не всплывало к верхнему элементу(если там есть обработчик на клик - клик сработает дважды)
                    e.preventDefault();
                    this.plusSlides(1);
                });
            }); 
    }
    render(){
        if(this.container){
           
            this.bindActions();
            this.showSlides(this.slideIndex);
        }
    }
}