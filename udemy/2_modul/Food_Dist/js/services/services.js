 function postData(){
 
    //////////////////////////////////////////////////////////////////////////////
    //отправка форм на сервер
    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    //API (готовые методы и свойства, которые мы можем использовать)
    //////////////////////////////////////////////////////////////////////////////
    //fetch API
    //////////////////////////////////////////////////////////////////////////////
    //https://jsonplaceholder.typicode.com

    //fetch -получить данные с url.(get запрос) fetch использует promise
    //получаем JSON объект
    //response.json() - превращает JSON объект в обычный объкт используя promise. когда выполниться promise, попадаем в then
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(json => console.log(json));
    // //post запрос. Отправка данных
    // fetch('https://jsonplaceholder.typicode.com/posts',{
    //     method: "POST",
    //     body: JSON.stringify({name:'Alex'}),
    //     headers:{
    //         'Content-type': 'application/json'
    //     }
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json));
    //////////////////////////////////////////////////////////////////////////////
     // перепишем function postData(form) из-за множества комментов  в bindpostData
    //отправка данных на сервер без перезагрузки страницы
    // function postData(form)
    // {
    //     form.addEventListener('submit',(e)=>
    //     {
    //         e.preventDefault();

    //         //простое некрасивое оповещение пользователя
    //         //создание нового блока на странице, куда будет выводиться сообщение о состоянии оправки формы
    //         // const statusMessage = document.createElement('div');
    //         // statusMessage.classList.add('status');
    //         // statusMessage.textContent = message.loading;
    //         // form.append(statusMessage);

    //         //сообщение с картинкой
    //         const statusMessageImg = document.createElement('img');
    //         statusMessageImg.src = message.loading;
    //         statusMessageImg.style.cssText = `
    //             display:block;
    //             margin:0 auto;
    //         `;
    //        // form.append(statusMessageImg);// иногда ломает верстку
    //        form.insertAdjacentElement('afterend',statusMessageImg);
    //         ////////////////////////////////////
    //         //XMLHttpRequest устаревший вариате
    //         // const request = new XMLHttpRequest();
    //         // request.open('POST', 'server.php');
    //         //
    //         //form data - получение данных из формы с помощью объекта FormData
    //         //и отправка на сервер в виде FormData
    //         //

    //         //здесь важно, чтобы в html файле у всех контролов формы (например у input) был аттрибут name
    //         //этот заголовок устанавливать  не нужно!!! Получим пустой объект от сервера
    //         // //request.setRequestHeader('Content-type','multipart/form-data');
    //         // const formData = new FormData(form);

    //         // request.send(formData);

    //         // request.addEventListener('load',()=>{
    //         //     if(request.status === 200){
    //         //         console.log(request.response);
    //         //         statusMessage.textContent = message.success;
    //         //         //очистка полей формы
    //         //         form.reset();
    //         //         //убираем сообщение о статусе
    //         //         setTimeout(()=>{
    //         //             statusMessage.remove();
    //         //         },2000);
    //         //     }
    //         //     else{
    //         //         statusMessage.textContent = message.failure;
    //         //     }

    //         // });
    //         //
    //         ///////////////////////////////////////////////////////
    //         //Отправка на сервер в формате JSON
    //         //
    //         //тут уже нужен заголовок
    //       //  request.setRequestHeader('Content-type','application/json');
    //         const formData = new FormData(form);

    //         //нужно превратить FormData в обычный объект для JSON
    //          const object = {};
    //          formData.forEach(function(value,key){
    //              object[key] = value;
    //          });

    //         // const json = JSON.stringify(object);

    //         // request.send(json);

    //         // request.addEventListener('load',()=>{
    //         //     if(request.status === 200){
    //         //         console.log(request.response);
    //         //           //показ формы о загрузке
    //         //           showThanksModal(message.success);
    //         //     //  statusMessage.textContent = message.success;
    //         //         //очистка полей формы
    //         //         form.reset();
    //         //         //убираем сообщение о статусе
    //         //         // setTimeout(()=>{
    //         //         //     statusMessage.remove();
    //         //         // },2000);
    //         //         //убираем спиннер
    //         //         setTimeout(()=>{
    //         //             statusMessageImg.remove();
    //         //         },2000);

    //         //     }
    //         //     else{
    //         //         //statusMessage.textContent = message.failure;
    //         //         //показ формы о загрузке
    //         //         showThanksModal(message.failure);
    //         //     }

    //         // });
    //         ///////////////////////////////////////////////
    //         //использует fetch для отправки на сервер
    //         //promise придет в then когда выполниться запрос

    //         fetch('server.php',{
    //              method: "POST",
    //              headers:{
    //              'Content-type':'application/json'
    //              },
    //             // body: formData           //если передаем form data и headers нужно закоментировать
    //             body:JSON.stringify(object) //если передаем JSON объект и headers нужно расскоментировать и в .php расскомент
    //         }).then(data=>data.text()) //ответ от сервера
    //         .then(data=>{
    //             console.log(data);
    //             //показ формы о загрузке
    //             showThanksModal(message.success);
    //             //убираем сообщение о статусе
    //             statusMessageImg.remove();
    //         }).catch(()=>{
    //             showThanksModal(message.failure);
    //         }).finally(()=>{
    //              //очистка полей формы
    //             form.reset();

    //         });
    //     });
    // }

    //////////////////////////////////////////////////////////////////////////////
    //JSON сервер
    //////////////////////////////////////////////////////////////////////////////

    // fetch('db.json')
    // .then(data=>data.json())
    // .then(res => console.log(res));

    //https://coderoad.ru/55547572/json-сервер-не-распознается-как-внутренняя-или-внешняя-команда
    //Во-первых, вам нужно проверить, установлен ли json-server глобально или нет. или вы можете установить его глобально с помощью
    //npm install -g json-server
    //Если вы устанавливаете его локально в своем проекте, используйте npx для его запуска
    //npx json-server --watch db.json
    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));
    //////////////////////////////////////////////////////////////////////////////
    //ф-ция отправляет (постит) запрос на сервер, возвращает объект json
    //необходимо использовать async await (подобие синхронного кода)
    //asinc - указывает, что ф-ция использует асинхронный код, а await - какого вызова нам нужно дождаться
    //await - дожидается окончания запроса и в res поместиться результат от сервера
    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json(); //это promice, поэтому тоже нужен await, а потом выполниться return
    };

   
    //получение ресурсов
    const getResource = async (url) => {
        const res = await fetch(url);
        //fetch не выдает catch, поэтому используем свойства
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json(); //это promice, поэтому тоже нужен await, а потом выполниться return
    };
  // getResource('http://localhost:3000/menu')
    // .then(data =>{
    //     data.forEach(({img,altimg,title,descr,price}) =>{
    //         new MenuCard(img,altimg,title,descr,price,'.menu .menu__field .container').render();
    //     });
    // });

    //ecли используем библиотеку axios

    
    //не использует классы, а создает классы налету
    // getResource('http://localhost:3000/menu')
    // .then(data =>createCard(data)); 
    // function createCard(data){
    //     data.forEach(({img,altimg,title,descr,price}) =>{
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <div class="menu__item">
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //                 <div class="menu__item-price">
    //                     <div class="menu__item-cost">Цена:</div>
    //                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                 </div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .menu__field .container').append(element);
    //     });
    // }
}
export{postData};