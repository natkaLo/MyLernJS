const btns = document.querySelectorAll('button');//все кнопки по селектору
//console.log(btns[0].classList.length);//количество классов
//console.log(btns[0].classList.item(0));//получить класс под индексом
////console.log(btns[0].classList.add('red', 'skdfjsk'));//добавить классы
//console.log(btns[0].classList.remove('blue'));//удалить классы
//console.log(btns[0].classList.toggle('some'));//если класс есть на элементе - он будет удален, если нету - добавлен

//проверка есть ли класс на элементе
// if(btns[1].classList.contains('red'))
// {
//     console.log('red');
// }

btns[0].addEventListener('click', () =>{
    // if(!btns[1].classList.contains('red')){
    //     btns[1].classList.add('red');
    // }
    // else {
    //     btns[1].classList.remove('red');
    // }
    btns[1].classList.toggle('red');
});

//устаревшее свойство className
//console.log(btns[1].className);

//Делегирование событий
//берем элемент- родитель кнопок
const wrapper = document.querySelector('.btn-block');
wrapper.addEventListener('click', (event)=>{

    //  if(event.target && event.target.tagName == "BUTTON"){
    //      console.log(event);
    //  }
    // if(event.target && event.target.classList.contains('blue')){
    //          console.log(event);
    //  }
    if(event.target && event.target.matches("button.red")){
          console.log(event);
    }
});
const btn = document.createElement('button');
btn.classList.add('red');
wrapper.append(btn);
