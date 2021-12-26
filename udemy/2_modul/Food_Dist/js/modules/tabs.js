function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    //////////////////////////////////////////////////////////////////////////////
    //tabs
    //////////////////////////////////////////////////////////////////////////////
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    //скрывание ненужных табов (картинок)
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        //убираем класс активности tabheader__item_active
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    //в шестом стандарте можно использовать параметры по умолчанию (i = 0)
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        //ставим класс активности tabheader__item_active
        tabs[i].classList.add(activeClass);
    }
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);

                }
            });
        }
    });
    hideTabContent();
    showTabContent();
}

//module.exports = tabs;//можно писать так
// можно эксортировать по умолчанию
export default tabs;