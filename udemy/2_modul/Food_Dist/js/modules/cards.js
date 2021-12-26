import{ShowHideModalWindow} from'./modal';
import {postData} from '../services/services';

function cards(modalSelector){
    //////////////////////////////////////////////////////////////////////////////
    //Наше меню на день - используем классы для карточек
    //////////////////////////////////////////////////////////////////////////////
    const modalWindow = document.querySelector(modalSelector);

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes; //массив
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        // из долларов в гривны
        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        // формирование верстки
        render() {
            const element = document.createElement('div');
            //обработаем массив classes
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = ` 
                <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element); //помещаем элемент на страницу в родительский элемент
        }
    }

    // const vegy = new MenuCard("img/tabs/vegy.jpg","vegy",'Меню "Фитнес"','Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей.
    // Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',229,'.container');
    //console.log(document.querySelector('.menu .menu__field .container'));

    //создаем карточки с помощью функции getResource
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .menu__field .container',
    //     'menu__item',
    //     'big'

    // ).render();
    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     15,
    //     '.menu .menu__field .container'

    // ).render();
    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     12,
    //     '.menu .menu__field .container',
    //     'menu__item'
    // ).render();
   
    const forms = document.querySelectorAll('form');

    //красивое оповещение пользователя
    function showThanksModal(message) {
        //будем скрывать существующее модальное окно и создавать новое со статусом
        const prevModalDialog = modalWindow.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');

        if (!modalWindow.classList.contains('show')) {
            ShowHideModalWindow(modalWindow);
        }
        //cоздание нового окна
        const thankModal = document.createElement('div');
        thankModal.classList.add('modal__dialog');
        thankModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
            </div>
        `;

        modalWindow.append(thankModal);

        setTimeout(() => {
            thankModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            ShowHideModalWindow(modalWindow);
        }, 4000);

    }

    const message = {
        //loading: 'Загрузка',
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    forms.forEach(item => {
        //postData(item); //старая закоменченная функция
        bindpostData(item);

    });

    axios.get('http://localhost:3000/menu')
    .then(data =>{
             data.data.forEach(({img,altimg,title,descr,price}) =>{
                 new MenuCard(img,altimg,title,descr,price,'.menu .menu__field .container').render();
             });
     });

    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            //сообщение с картинкой
            const statusMessageImg = document.createElement('img');
            statusMessageImg.src = message.loading;
            statusMessageImg.style.cssText = `
                     display:block;
                     margin:0 auto;
                 `;
            form.insertAdjacentElement('afterend', statusMessageImg);

            const formData = new FormData(form);
            //нужно превратить FormData в обычный объект для JSON
            //старый способ
            //const object = {};
            // formData.forEach(function(value,key){
            //       object[key] = value;
            //  });
            //
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    //показ формы о загрузке
                    showThanksModal(message.success);
                    //убираем сообщение о статусе
                    statusMessageImg.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    //очистка полей формы
                    form.reset();

                });
        });
    }
}
//module.exports = cards;//можно писать так
// можно эксортировать по умолчанию
export default cards;