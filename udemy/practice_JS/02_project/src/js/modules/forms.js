import { postData } from "../services/requests";

const forms = () => {
    //получим все формы на странице и все импуты для их очистки после отправки данных на сервер. Получим инпуты для загрузки изображений по аттрибуту
    const   form = document.querySelectorAll('form'),
            inputs = document.querySelectorAll('input'),       
            upload = document.querySelectorAll('[name = "upload"]'); //Получим инпуты для загрузки изображений по аттрибуту upload

   // CheckNumInputs('input[name = "user_phone"]');// - для того, чтобы в поле телефона пользователь мог ввести только цифры

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };
    //пути, на которые отправятся наши сообщения
    const path = {
        designer : 'assets/server.php',
        question: 'assets/question.php'
    };


    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };
    //повесим обработчик событий input на инпуты для загрузки изображений
    upload.forEach(item => {
        item.addEventListener('input', () =>{
           // console.log(item.files[0]);
           //если название слишком длинное, обрежем его и добавим троеточие
           
           const arr =  item.files[0].name.split('.');//разрежем имя файла(получим имя и расширение)
           const dots = (arr[0].length > 6) ? "...":"."; 
           const name = arr[0].substring(0,6) + dots + arr[1];
           item.previousElementSibling.textContent = name;
        });
    });


    form.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();
            //создадим на форме оповещение пользователя
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);//поместим элемент на родителя формы (это .popup-content)
            //саму форму (form) скроем
            item.classList.add('animated','fadeOutUp');//она станет прозрачной
            //но чтобы элемнеты не ломались (форма не занимала физического места на странице), ее надо скрыть
            setTimeout(()=>{
                item.style.display = 'none';
            },400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated','fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            // собираем данные, которые введены на форме. При помощи объекта FormData
             const formData = new FormData(item);
         
            //  //определимся, по какому адресу отправляем данные. Проверим у form (она у нас item) есть ли у нее родитель ( c классом popup-design)
            //для формы калькулятора в index.html добавили класс calc_form
             let api = (item.closest('.popup-design') || item.classList.contains('calc_form'))?path.designer:path.question;
             console.log(api);

           // устанавливаем форме сумму в дата аттрибут в calc js
            if(item.getAttribute('data-calc')){
               formData.append("sum",item.getAttribute('data-calc'));
               console.log(item.getAttribute('data-calc'));
            }
            
            // //отправляем данные на сервер (нужно знать, в каком формате сервер принимает данные. Если в фор-те JSon - надо перевести данные в JSON)
            // //cейчас просто отправим в формате FormData

             postData(api,formData)      //возвращается промис (res в текстовом виде)
             .then(res => {
                 console.log(res);
                 statusImg.setAttribute('src', message.ok);
                 textMessage.textContent = message.success;
             })
             .catch(()=>{
                 statusImg.setAttribute('src', message.fail);
                 textMessage.textContent = message.failure;
             })
             .finally(()=>{
                 clearInputs();
                 //удалим оповещение пользователя
                  setTimeout(()=>{
                      statusMessage.remove();
                      item.style.display = 'block';
                      item.classList.remove('fadeOutUp');
                      item.classList.add('fadeInUp');
                  },5000);
             });
        });
    });
};

export default forms;