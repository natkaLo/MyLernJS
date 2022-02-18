const accordion = (triggersSelector) => {
    const   btns = document.querySelectorAll(triggersSelector);

    //способ создания аккардиона с помощью java script
    // в main.css закоментили в .often-questions .accordion-block все,кроме цвета и добавили другие
    // и добавили .often-questions .accordion-block.active-content в main.css

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            const bCurrentBtnActive = this.classList.contains('active-style');
            btns.forEach(btnClicked => {
                 //закроем все кто был открыт
                if(btnClicked.classList.contains('active-style'))
                {
                    btnClicked.classList.remove('active-style');
                    btnClicked.nextElementSibling.classList.remove('active-content');
                    btnClicked.nextElementSibling.style.maxHeight = '0px'
                }
            });
            if(!bCurrentBtnActive) {     //если кликнутая была закрыта - откроем
            
                this.classList.add('active-style');
                this.nextElementSibling.classList.add('active-content'); //следующий элемент за кнопкой ( блок который нужно показать)
                 // в main.css мы для блока установили изначально высоту 0. Здесь мы его показываем.
                //this.nextElementSibling.scrollHeight - высота контента
                 // 80 - paddings, которые мы установили в main.css
                 this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
            }
        });

        //если не сворачивать активную (получиться много открытых)
        // btn.addEventListener('click', function(){
        //     this.classList.toggle('active-style');
        //     this.nextElementSibling.classList.toggle('active-content'); //следующий элемент за кнопкой ( блок который нужно показать)

        //     if(this.classList.contains('active-style')){
        //         // в main.css мы для блока установили изначально высоту 0. Здесь мы его показываем.
        //         //this.nextElementSibling.scrollHeight - высота контента
        //         // 80 - paddings, которые мы установили в main.css
        //         this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
        //     }
        //     else{
        //         this.nextElementSibling.style.maxHeight = '0px'
        //     }
        // })
    });
};


    //способ создания аккардиона с помощью css 
    // const accordion = (triggersSelector, itemsSelector) => {
    // const   btns = document.querySelectorAll(triggersSelector);
    // const   blocks = document.querySelectorAll(itemsSelector);
    // // добавим анимацию блокам
    // blocks.forEach(block => {
    //     block.classList.add('animated','fadeInDown');
    // });

    // btns.forEach(btn => {
    //     btn.addEventListener('click', function(){
    //         if(!this.classList.contains('active')){
    //             btns.forEach(btn => btn.classList.remove('active', 'active-style'));//удалим сразу два класса
    //             this.classList.add('active', 'active-style');// добавим два класса
    //         }
    //     });
    // });
    //остальное - показ блоков - допишем в файле main.css
    //.often-questions .accordion-heading.active+.accordion-block
    //.accordion-heading - класс заголовка
    //.accordion-heading.active - у него есть класс active
    //+.accordion-block - говорим, что за этим активным заголовком есть  следующий элемент .accordion-block
    //там поставили display block

    // а там где просто .often-questions .accordion-block (не активный)
    // написали display none
// };

export default accordion;