const tabs = (headerSelector,tabSelector,contentSelector, activeClass, display = 'block') => {

    const   header = document.querySelector(headerSelector),
            tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);
    
    function hideTabContent(){
        content.forEach(item => {
            item.style.display = 'none';
        });
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    function showTabContent(i =0){
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    }
    //изначально инициализируем активным первый таб
    hideTabContent();
    showTabContent();

    //клик на табе. Навешиваем обработчик на элемент содержащий в себе все табы
    header.addEventListener('click', (e) => {
        const target = e.target;
        //проверяем, что кликнули на табе. По нему самому или по элементу внутри него (дочернему для которого таб будет parentNode)
        //tabSelector передавали с точкой для  document.querySelectorAll(tabSelector)
        //чтобы classList.contains нужно убрать точку. Убираем с помощью регулярного выражения
        if(target && (target.classList.contains(tabSelector.replace(/\./,"")) || target.parentNode.classList.contains(tabSelector.replace(/\./,"")))){
            //определяем в какой именно таб по индексу мы кликнули
            tab.forEach((item,i) => {
                if(target == item || target.parentNode == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};
export default tabs;