function slider(){
    
     //////////////////////////////////////////////////////////////////////////////
    //cлайдер
    //////////////////////////////////////////////////////////////////////////////

    //1 variant
    // const offerSlider = document.querySelector('.offer__slider');
    // const currentElement = offerSlider.querySelector('.offer__slider-counter #current');
    // const offerSlides = offerSlider.querySelector('.offer__slider-wrapper').querySelectorAll('.offer__slide');
    // const totalSlides = offerSlides.length;
    // offerSlider.querySelector('.offer__slider-counter #total').textContent = (totalSlides < 10)? `0${totalSlides}`:totalSlides;
    // currentElement.textContent = '01';

   
    // function getCurrent(element){
    //     return +element.textContent;
    // }
    // const setCurrent = (current,element,total = totalSlides)=>{
    //     //console.log(getCurrent(element));
    //     //console.log(current);
    //     if(current <= 0){ current = total;}
    //     else if(current> total){current = 1;} 
    //     element.textContent = (current < 10)? `0${current}`:current;
        
    //     offerSlides.forEach((slide,index)=>{
    //         if(!slide.classList.contains('hide')){
    //             slide.classList.add('hide');
    //         }
    //         if(slide.classList.contains('show')){
    //             slide.classList.remove('show');
    //         }
    //         if(index == current -1){
    //             slide.classList.remove('hide');
    //             slide.classList.add('show');
    //         }
    //     });
    // };
    // offerSlider.querySelector('.offer__slider-counter').addEventListener('click', (e)=>{
    //     e.preventDefault();
    //     if(e.target){
    //         let current = getCurrent(currentElement);
    //         if(e.target.matches('.offer__slider-prev')){
    //             setCurrent(--current, currentElement);
    //         }
    //         else if(e.target.matches('.offer__slider-next')){
    //             setCurrent(++current, currentElement);
    //         }
    //     }
    // });
    // //init
    // setCurrent(getCurrent(currentElement), currentElement);

    //////////////////////////////////////////////////////////////////////////////
    //2 variant лента слайдов

    function deleteNotDigits(str){
        return +str.replace(/\D/g,'');
    }
    const  slidesWraper = document.querySelector(".offer__slider-wrapper"), // общая обертка для всех слайдов
            prev = document.querySelector('.offer__slider-prev'),           //кнопка prev
            next = document.querySelector(".offer__slider-next"),           //кнопка next
            total = document.querySelector('#total'),                       //поле total
            current = document.querySelector('#current'),                   //поле current
            slides = document.querySelectorAll('.offer__slide'),            //каждый отдельный слайд
            slidesField = document.querySelector(".offer__slider-inner"),   // общая обертка для всех слайдов внутри slidesWraper
            width = window.getComputedStyle(slidesWraper).width,            //видимая ширина ленты слайдов вычисленная автоматически при загрузке
           // widthInt = +width.slice(0, width.length -2);                   //видимая ширина ленты число (width - это строка ..px)
           widthInt = deleteNotDigits(width);                               // все не числа заменяем пустыми символами (удаляем)
    const  slider = document.querySelector('.offer__slider'),
           dots = [];
    
    let slideIndex = 1; // текущий слайд
    let offset = 0; //отступ от начала ленты

    total.textContent = (slides.length < 10)?`0${slides.length}`:slides.length;

    slidesField.style.width = 100*slides.length + '%'; // сделаем ширину иннера в процентах 
    //выстраиваем слоайды в одну линию
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    //ограничим показ внутри wrapper, остальные слайды в линии скроем
    slidesWraper.style.overflow = 'hidden';

    slides.forEach(slide =>{
        // у каждого слайда(картинки может быть разная ширина. Поставим всем одинаковую как у врапера)
        slide.style.width = width;
    });

    next.addEventListener('click', ()=>{
        //сдвигаем слайд
        if(offset == widthInt * (slides.length -1)){        //если это поледний слайд
            offset = 0;
        }
        else{
            offset += widthInt;
        }
        slideIndex =(slideIndex == slides.length)? 1:++slideIndex;
        setCurrent();
     });

    prev.addEventListener('click', ()=>{
        //сдвигаем слайд
        if(offset == 0){        //если это первый слайд
            offset = widthInt * (slides.length -1);
        }
        else{
            offset -= widthInt;
        }
        slideIndex =(slideIndex == 1)? slides.length:--slideIndex;
        setCurrent();
    });

      ///////////////////////////////////////////////////////////////////////////////////////////
    //точки для слайдера
    ///////////////////////////////////////////////////////////////////////////////////////////
  
    slider.style.position = 'relative';
    //создаем оберетку для точек и выставляем стили
    const indicatorDots = document.createElement('ol');
    indicatorDots.classList.add('carousel-indicators');
    //mожно добавить ему свойства в css файл, а можно javascriptом
    indicatorDots.style.cssText =`
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicatorDots);
    //создаем точки

    const clickDot = (e)=>{
        if(e && e.target){
            const dot = e.target;
            slideIndex = +(e.target.getAttribute('data-slide-to'));
            offset = widthInt * (slideIndex -1);
            setCurrent();
        }
    };


    for(let i = 0; i< slides.length;i++){
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to',i+1);// к какому слайду точка относиться
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        indicatorDots.append(dot);
        dot.addEventListener('click', clickDot);
        dots.push(dot);
    }
   
    const setCurrent = ()=> {
        //картинки
        slidesField.style.transform =`translateX(-${offset}px)`;
        //нумерация - текстовое поле
        current.textContent = (slides.length < 10)?`0${slideIndex}`:slideIndex; 

        //точки
        dots.forEach((dot,index)=>{
            if(index == slideIndex-1){//активаня точка
                dot.style.opacity = 1;
            }
            else{
                dot.style.opacity = '.5';
            }
        });
       
    };

    setCurrent();

}
module.exports = slider;