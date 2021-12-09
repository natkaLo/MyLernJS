window.addEventListener('DOMContentLoaded', ()=>{
//////////////////////////////////////////////////////////////////////////////
//tabs
//////////////////////////////////////////////////////////////////////////////
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    //скрывание ненужных табов (картинок)
    function hideTabContent(){
        tabsContent.forEach(item => {
           item.classList.add('hide');
           item.classList.remove('show', 'fade');
        });
        //убираем класс активности tabheader__item_active
        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }
    //в шестом стандарте можно использовать параметры по умолчанию (i = 0)
    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        //ставим класс активности tabheader__item_active
        tabs[i].classList.add('tabheader__item_active');  
    }
    tabsParent.addEventListener('click', (event)=>{
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
           tabs.forEach((item,i)=>{
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                   
                }
            });
        }
    });
    hideTabContent();
    showTabContent();
 //////////////////////////////////////////////////////////////////////////////
//timer
//////////////////////////////////////////////////////////////////////////////
    const deadLine = '2022-05-11';
    //ф-ция определяет разницу между дедлайном и текущем временем
    function getTimeRemaining(endtime){
        //endtime приходит в формате строки '2022-05-11'
        //получим разницу между endtime и текущей датой в кол-ве миллисек
        const t = Date.parse(endtime) - Date.parse(new Date());
        //разницу нужно превратить в кол-во дней,часов,минут
        //Math.floor() - округление до ближайщего целого
        const days = Math.floor(t/(1000*60*60*24));//1000*60*60*24 - кол-во миллисек. в сутках
        
    }
});