export default class Slider{            //классы пишутся с большой буквы
    constructor(page, btns, showElementByTimeClassName){    //page- на какой странице слайдер, btns - кнопки переключения
        this.page = document.querySelector(page);       //создаем новое свойство класса page
        this.slides = this.page.children; // cлайды находятся внутри элемента page. Получаем иx
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
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
        if(n > this.slides.length){
            this.slideIndex = 1;
        }
        if(n < 1){
            this.slideIndex = this.slides.lenght;
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
    
    render(){
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
       this.showSlides(this.slideIndex);
    }
}