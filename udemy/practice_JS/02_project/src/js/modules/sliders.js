//slides - селектор, dir- в какую сторону двигается слайдер, prev, next - кнопки
const sliders = (slides, dir, prev, next ) => {
    let     slideIndex = 1, //текущий слайд
            paused = false;// делаем паузу для слайдера при наведении мыши на него
    const items = document.querySelectorAll(slides); 
   
    function showSlides(n){//n - индекс слайда, который должны показать
        if(n < 1 || n > items.length){
            n = (n < 1)?items.length:1;
        }
        slideIndex = n;
       
        //нужно скрыть все остальные слайды
        items.forEach(item => {
            item.classList.add("animated"); //ставим animated класс для того, чтобы ставить классы slideInRight...
            item.style.display = "none";  
        });
        //показать только под индексом slideIndex (slideIndex  у нас = 1, поэтому -1)
        items[slideIndex -1].style.display = 'block';
    }
    //покажем сначала первый слайд
    showSlides(slideIndex);

    function plusSlides(n){
      showSlides(slideIndex += n);
    };

    function setStyles(item,addClassStyle,removeClassStyle){
        item.classList.remove(removeClassStyle);
        item.classList.add(addClassStyle);
    }

    try{
        //если селекторы кнопок не были переданы, попадем в catch и не обрушиться все
        const   prevBtn = document.querySelector(prev),
                nextBtn = document.querySelector(next);
        prevBtn.addEventListener('click', ()=>{
            plusSlides(-1);
            setStyles( items[slideIndex-1],'slideInRight','slideInLeft');
          
        });
        nextBtn.addEventListener('click', ()=>{
            plusSlides(1);
            setStyles( items[slideIndex-1],'slideInLeft','slideInRight');
        });
    }catch(e){}

    function activateAnimation(){
        paused = setInterval(function(){
            plusSlides(1);
            (dir === 'vertical')?items[slideIndex-1].classList.add('slideInDown'):setStyles( items[slideIndex-1],'slideInLeft','slideInRight');
        },3000);
    }
    items[0].parentNode.addEventListener('mouseenter', () =>{
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener('mouseleave', () =>{
        activateAnimation();
    });
    //первичная инициализация анимации
    activateAnimation();
};
export default sliders;