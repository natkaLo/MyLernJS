const filter = () => {

    const   menu = document.querySelector('.portfolio-menu'),
            items = document.querySelectorAll('li'),
            wrapper = document.querySelector('.portfolio-wrapper'),
            no =  document.querySelector('.portfolio-no');

    let prevActiveClassName = "";

    items.forEach((item) => {
        if(item.classList.contains('active')){
            prevActiveClassName = item.classList.item(0);
        }
    }); 

    const hideElement = (elem) => {
        if(elem){
            elem.style.display = "none";
            elem.classList.remove('animated', 'fadeIn');//добавили анимации
        }
    };
    const showElement = (elem) => {
        if(elem){
            elem.style.display = "block";
            elem.classList.add('animated', 'fadeIn');//добавили анимации
        }
    };

    const typeFilter = (markType, markClassName) => {
        if(markClassName == prevActiveClassName){
            return;
        }
         //скрываем все элементы
        let marPrevious = wrapper.querySelectorAll("."+ prevActiveClassName);
        marPrevious.forEach(mark => hideElement(mark));
        // элемент с классом portfolio-no не находиться в all. Поэтому скроем его отдельно
        hideElement(no);
        //покажем элементы, которые находяться в переданном псевдомассива
        if(markType.length){           //если не undefinedZ
            markType.forEach(mark => showElement(mark));
        }
        else{
          showElement(no);
        }
        prevActiveClassName = markClassName;
    };
    const onFilter = (className) => {
        const mark = wrapper.querySelectorAll("."+ className);
        typeFilter(mark,className);
    };

    menu.addEventListener('click', (event) => {
        let target = event.target;
        if(target && target.tagName == "LI"){
            items.forEach(item => {
                if(item.classList.contains('active')){
                    prevActiveClassName = item.classList.item(0);
                    item.classList.remove('active');
                }
            });
            target.classList.add('active');
           
            onFilter(target.classList.item(0));
        }
    });

};
export default filter;

