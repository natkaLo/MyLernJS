import CheckNumInputs from './checkNumImputs';
//передаем сюда state из main.js
const changeModalState = (state) => {
    //везде берем querySelectorAll чтобы в bindActionToElems работал forEach. Чтобы везде были псевдомассивы
    const   windowForm = document.querySelectorAll('.balcon_icons_img'), 
            windowWidth = document.querySelectorAll('#width'),
            windowHeight = document.querySelectorAll('#height'),
            windowType = document.querySelectorAll('#view_type'),
            windowProfile = document.querySelectorAll('.checkbox');

    CheckNumInputs('#width');// - для того, чтобы в поле  пользователь мог ввести только цифры
    CheckNumInputs('#height');// - для того, чтобы в поле  пользователь мог ввести только цифры

    function bindActionToElems(event, elem, prop){
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                //нужно проверить какой элемент (elem) мы получили. Проверяем по nodeName. nodeName приходит в верхнем регистре
                // у ноды INPUT может быть аттрибут type checkbox и может его не быть
                switch(item.nodeName){
                    case 'SPAN':
                        //console.log('span');
                        //в span приходит псевдомассив element в котором несколько элементов (windowForm напр)
                        state[prop] = i; // в пустом изначально объекте state (переданном из main.js) создается новое поле  и присваивается ему индекс кликнотого
                        break;
                    case 'INPUT':
                        if(item.getAttribute('type') === 'checkbox'){
                            //console.log('checkbox');
                            //chekbox у нас два
                            state[prop] = (i === 0)?"Холодное":"Tеплое";
                            //cбросим галочки с некликнутых элементов
                            elem.forEach((box,j) => {
                                box.checked = false;
                                if(i == j){
                                    box.checked = true;
                                }
                            });
                        }
                        else{
                            //console.log('input');
                             //если передали псевдомассив element в котором один элемент input (windowWidth напр)
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        //console.log('select');
                        state[prop] = item.value;
                        break;
                }
                console.log(state);
               
            });
        });
    }
    bindActionToElems('click',windowForm,'form');
    bindActionToElems('input',windowWidth,'width');
    bindActionToElems('input',windowHeight,'height');
    bindActionToElems('change',windowType,'type');
    bindActionToElems('change',windowProfile,'profile');
    
}
export default changeModalState;

