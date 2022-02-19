const scrolling = (upSelector) =>{
    const upElem = document.querySelector(upSelector); //кнопка стрелочка прокрутки до верха документа
    window.addEventListener('scroll', () =>{
        if(document.documentElement.scrollTop > 1650){ //отскролили от верха документа
           upElem.classList.add('animated', 'fadeIn');
           upElem.classList.remove('fadeOut');
        }
        else{
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });
 //скроллинг на простом java sript
    //плавный скрол по клику на кнопку стрелочку
    // const   element = document.documentElement,
    //         body = document.body;
    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(event){
    //         //какое расстояние отскролировано сверху
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop); // для старых браузеров может то или то не существовать

    //         // проверим, что мы кликнули по ссылке. Тогда хеш (виден в адресной строке) не может быть пустым
    //         if(this.hash !== ''){
    //             event.preventDefault();
    //             //нужно получить елемент, к которому будем скролить
    //             let hashElement = document.querySelector(this.hash), 
    //                 hashElementTop = 0; //сколько нужно еще пролистать пикселей до родителя этого хеш элемента (на сколько пикселей отстоит хеш элемент от его родительского элемента) 
    //             //hashElement.offsetParent - свойство обозначает тот элемент, относительно которого позиционируется хеш элемент (как бы родитель)
    //             //переберем всех родителей искомого (хеш) элемента и узнаем, сколько пикселей нам нужно проскролить
    //             while(hashElement.offsetParent){
    //                 hashElementTop += hashElement.offsetTop; //определяем, сколько пикселей осталось до верхней границы хеш элемента 
    //                 hashElement = hashElement.offsetParent; //cледующий родитель хеш элемента
    //             }

    //             hashElementTop = Math.round(hashElementTop);

    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };
    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed;
        
    //     //в какую сторону будем скролить
    //     if(to> from){       //сверху вниз
    //         speed = 30;
    //     }
    //     else{               //снизу вверх
    //         speed = -30;
    //     }

    //     let move = setInterval(function(){
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop); 
    //         if(prevScrollTop === scrollTop || (to > from && scrollTop >= to) || (to < from && scrollTop <= to)){
    //             //долистали до нужного елемена
    //             clearInterval(move);
    //             //изменяем адресную строку
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g,'')+hash);
    //         }
    //         else{
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     },timeInterval);

    // };
    // calcScroll();


    //скроллинг на request animation frame
    //получаем все элементы ссылки по аттрибуту. Карретка ^ - означает - что данное значение аттрибута должно быть прямо сначала строки
    //то есть ищем все ссылки, которые начинаются с # (по факту - локальные ссылки)
    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;
    
    links.forEach(link => {
        link.addEventListener('click', function(event){
            event.preventDefault();
            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top, //получаем верх
                start = null;
            requestAnimationFrame(step); //step - колбек ф-ция

            //step вызывается несколько раз
            //time сюда передается автоматически
            function step(time){
                if(start === null){     //если ф-ция запустилась первый раз
                    start = time;
                }
                let progress = time - start,
                //кол-во пикселей на которые нам надо прилистать в течении этой анимации и в какую сторону
                r = (toBlock<0?Math.max(widthTop - progress/speed, widthTop+ toBlock): Math.min(widthTop + progress/speed, widthTop+ toBlock));

                document.documentElement.scrollTo(0,r);
                //когда анимация должна остановиться (r будет равен widthTop+toBlock)
                if(r != widthTop+toBlock){
                    //если еще не долистали
                    requestAnimationFrame(step);
                }
                else{
                    location.hash = hash;
                }

            }
        });
    });


   
};

export default scrolling;