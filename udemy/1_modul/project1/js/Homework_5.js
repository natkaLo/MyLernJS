/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

// Возьмите свой код из предыдущей практики

//скрипт будет выполняться, когда все элементы страницы загружены. Если есть тяжелые картинки, скрипты... они будут грузиться дальше в фоновом режиме
document.addEventListener('DOMContentLoaded', ()=>{
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    const   adv = document.querySelectorAll(".promo__adv img"),//nodeList у которого есть метод forEach
            poster = document.querySelector(".promo__bg"),
            getnre = poster.querySelector(".promo__genre"),
            promoInteractiveList = document.querySelector('.promo__interactive-list'),
            addForm = document.querySelector('form.add'),
            addInput = addForm.querySelector('.adding__input'),
            checkbox = addForm.querySelector('[type="checkbox"]');//по типу
    //const inputsAdd = AddForm.querySelectorAll("input");
   //const btnAdd = AddForm.querySelector('button');
    
    //удаление рекламы
    const deleteAdv = (arr)=>{
        //console.log(adv);
        arr.forEach(item=>{
            item.remove();
         });
    };
    const makeChanges = ()=>{
        getnre.textContent ="драма";
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) =>{
        arr.sort();
    };
    
    let moviesCount = 0;
    const createMovieList = (films,parent)=>{
        if(moviesCount != films.length)
        {
            sortArr(films);
            
            parent.innerHTML = ''; //удаляем все элементы
            
            films.forEach((film,i)=>{
                parent.innerHTML += `
                    <li class="promo__interactive-item">${i+1 + ". " + film}
                        <div class="delete"></div>
                    </li>
                `;
            });
            moviesCount = films.length; 
            document.querySelectorAll('.delete').forEach((btn,i) =>{
                btn.addEventListener('click', ()=>{
                    DeleteFilmFromList(i,films);
                });
            });
        }
    };
//////
    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, promoInteractiveList);
//////
    
    const addFilmToList = (newFilm, checkLove)=>{
        
        if(newFilm) {
            if(newFilm.length > 21) {
               // newFilm = newFilm.substring(0,18) + "...";
                newFilm = `${newFilm.substring(0,18)}...`;
            }
            movieDB.movies.push(newFilm.toUpperCase());
    
            if(checkLove){
                console.log("Добавляем любимый фильм");
            }
        }
        createMovieList(movieDB.movies, promoInteractiveList);
    };

    const DeleteFilmFromList = (index, arr)=>{
        if(index >= 0 && index < arr.length)
        {
            //console.log(index);
            arr.splice(index,1);
        }
        createMovieList(arr, promoInteractiveList);
    };
    
    
    
    const AddNewFilm = (e)=>{
        e.preventDefault();
        // let inputAdd, inputCheck;
        // inputsAdd.forEach(inputControl=>{
        //     if(inputControl.type == 'text'){
        //         inputAdd = inputControl.value;
        //         inputControl.value = '';
        //     }
        //     else if(inputControl.type == 'checkbox'){
        //         inputCheck = inputControl.checked;
        //         inputControl.checked = false;
        //     }
           
        // });
        //addFilmToList(inputAdd,inputCheck);
        addFilmToList(addInput.value,checkbox.checked);
       // e.target.reset();
        addForm.reset();
    };
    // const ClickFilmsList = (event)=>{
    //    // console.log(event);
    //     const targ = event.target;
    //     if(targ.className == 'delete') {
    //        const parentLi = targ.parentElement;
    //        let prevLi = parentLi.previousElementSibling;
    //        let i = 0;
    //        while(prevLi)
    //        {
    //            prevLi = prevLi.previousElementSibling;
    //            i++;
    //        }
    //         // console.log(i);
    //         DeleteFilmFromList(i);
    //     }
    // };
    
    //btnAdd.addEventListener('click',AddNewFilm);
    //навешиваем на форму обработчик submit
    addForm.addEventListener('submit',AddNewFilm);
   // promoInteractiveList.addEventListener('click', ClickFilmsList);
    
});

