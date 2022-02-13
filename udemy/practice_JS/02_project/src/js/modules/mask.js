const mask = (selector) => {

    //установка позиции курсора в инпуте на котором фокус (elem). pos - позиция курсора, кот. надо установить
    let setCursorPosition = (pos, elem) => {
        elem.focus(); //вручную установили фокус на элементе
        
        //вручную установим выделение в инпуте. Если начальная и конечная позиции выделения одинаковы - поставиться курсор
        // if(elem.setSelectionRange) - если у елемента есть такой метод (у старых браузеров нет)
        //для Internet Explorer - elem.createTextRange (делаем то же самое что и elem.setSelectionRange)
        if(elem.setSelectionRange){
            elem.setSelectionRange(pos,pos);
        }else if(elem.createTextRange){
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character',pos);
            range.moveStart('character',pos);
            range.select();
        }
    };

    function createMask(event){
        let matrix = '+7 (___) ___ __ __',      
            i = 0,                          //итератор
            def = matrix.replace(/\D/g,''),   //(статичное на основе матрицы)получаем все не цифры, которые есть в matrix и заменяем на пустое место
            val = this.value.replace(/\D/g,''); //(динамичное - ввел пользователь)обращаемся к элементу, на кот. происходит событие (элемент в кот. польз. вводит) и заменяем его value
            //если после удаления не цифр в матрице, кол-во цифр больше, чем ввел пользователь, мы должны заменить нга стандартное
            //(если пользователь, например, удалил 7 и + мы ему это сделать не дадим)
            if(def.length >= val.length){
                val = def;
            }
        //заменим в матрице нижние подчеркивания на значения, которые ввел поль-тель
        //  /./g  - пройдемся по всем элементам строки. Вызываем колбек ф-йю для каждого элемента строки
        this.value = matrix.replace(/./g, function(a){
            //проверим, является ли символ цифрой и мы еще не вышли за длину строки которую ввел польз(после замены не цифр), . У регулярного выражения есть ф-ция test
            //если true - возвращаем следующий символ. Если false - если вышли за пределы строки - вернем пустой символ, если еще не вышли - вернем тот же символ
            return (/[_\d]/.test(a) && i < val.length)? val.charAt(i++): (i >= val.length)?'':a;
        });

        if(event && event.target){
            if(event.type === 'blur'){          //если фокус ушел из импута
                if(this.value.length == 2){
                    this.value = '';    //очистим инпут
                }
             } 
             else {
                let curPos =  event.target.selectionStart;
                console.log(curPos);
                if(event.type === 'mouseup' && curPos <=3 ){
                    curPos = this.value.length;
                }
                setCursorPosition(curPos, this);
            }
        }
    }

    let inputs = document.querySelectorAll(selector); //получим все инпуты переданные сюда из main.js
    // повесим на них обработчики
    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
        input.addEventListener('mouseup',createMask); //чтобы нельзя было поставить курсор в первые 3 позиции
    });
};

export default mask;