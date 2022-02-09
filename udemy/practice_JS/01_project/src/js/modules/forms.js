import CheckNumInputs from './checkNumImputs';
const forms = (state) => {
    //получим все формы на странице и все импуты для их очистки после отправки данных на сервер
    const   form = document.querySelectorAll('form'),
            inputs = document.querySelectorAll('input');

    CheckNumInputs('input[name = "user_phone"]');// - для того, чтобы в поле телефона пользователь мог ввести только цифры

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    // чтобы javaScript знал что ф-ция имеет асинхронные операции  и ждал используем async await
    //async пишется перед ф-цией в которой есть асинхронные операции(например fetch) a await пишется непостредственно перед асинхронной операцией
    const postData = async(url, data) => {
        document.querySelector('.status').textContent = message.loading;
         //т.к  отправим в формате FormData, заголовок устанавливать не нужно
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        //res.text() тоже асинхронная операция. Поэтому пишем await
        return await res.text();
    };

    const clearImputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();
            //создадим на форме оповещение пользователя
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);//поместим элемент на форму

            // собираем данные, которые введены на форме. При помощи объекта FormData
            const formData = new FormData(item);
            //в index.html добавили для конечной формы калькулятора дата аттрибут data-calc = 'end'. Это для того, чтобы если мы пытаемся отправить
            // эту форму связанную с калькулятором, нужно добавить еще данные, которые ввел пользователь в калькулятор. Их передали сюда из main.js (state)
            if(item.getAttribute('data-calc') === 'end'){
                for(let key in state){
                    formData.append(key,state[key]);
                }
            }

            //отправляем данные на сервер (нужно знать, в каком формате сервер принимает данные. Если в фор-те JSon - надо перевести данные в JSON)
            //cейчас просто отправим в формате FormData

            postData('assets/server.php',formData)      //возвращается промис (res в текстовом виде)
            .then(res => {
                console.log(res);
                statusMessage.textContent = message.success;
            })
            .catch(()=>statusMessage.textContent = message.failure)
            .finally(()=>{
                clearImputs();
                //удалим оповещение пользователя
                setTimeout(()=>{
                    statusMessage.remove();
                },5000);
            });
        });
    });
};

export default forms;