import { getResource } from "../services/requests";

//показ скрытых в верстке карточек
// const showMoreStyles = (trigger, styles) => {
//     const   cards = document.querySelectorAll(styles),
//             btn = document.querySelector(trigger);

    
    // cards.forEach(card => {
    //     card.classList.add('animated','fadeInUp');// добавим анимации карточкам
    // });

    // btn.addEventListener('click', () => {
    //     cards.forEach(card => {
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //      //кнопка должна исчезнуть со страницы
    //      //btn.style.display = 'none';
    //      btn.remove();
    //      });
    // }); 


    // показ карточек, загруженных из db.json через JSON сервер(его надо запустить)
    const showMoreStyles = (trigger, wrapper) => {
        const   btn = document.querySelector(trigger);
    //в index.html закоментировали карточки
    btn.addEventListener('click', function() {
       // getResource( 'http://localhost:3000/styles') //  http://localhost:3000/styles копируем из терминала после запуска JSON сервера (Resources)
        getResource( 'assets/db.json')          //без JSON сервера. Просто к файлу
        .then(res => {
           // console.log(res); //получили в консоль массив данных (JSON сервер)
          // createCards(res); //  (JSON сервер)
          createCards(res.styles);//без JSON сервера. Просто к файлу
        }).catch(error => console.log(error));
        //надо удалить кнопку
        this.remove(); // не сработает если написано 'click', () => {  Стрелочная функция  в обработчике не будет ссылаться на тот контекст, для кот. этот обработчик написан
        // нужно поменять стрелочную ф-цию на function() {
    });

    //responce - ответ от сервера (массив)
    function createCards(responce){
        responce.forEach(item =>{
            let card = document.createElement('div');
            card.classList.add('animated','fadeInUp','col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1'); //классы из верстки + 'animated','fadeInUp'
            card.innerHTML = `
                <div class="styles-block">
                    <img src= ${item.src} alt="style">
                    <h4>${item.title}</h4>
                    <a href=${item.link}>Подробнее</a>
                </div>
            `;
            document.querySelector(wrapper).appendChild(card);
        });
    }
};
export default showMoreStyles;