const checkTextInputs = (selector) => {

    const check  = (value) => {
         // match - соответсвует
        //  /[]/  - диапазон символов
        // ^ - начало строки (каретка)
        // русский алфавит а-яё  и цифры 
        //ig - во всей сроке вне зависимости от регистра
        return value.match(/[^а-яё 0-9]/ig);
    };
    //пользователь может вводить данные только на русском языке
    const txtInputs = document.querySelectorAll(selector);
    txtInputs.forEach(input => {
        //e.key- нажатая клавиша
       
        input.addEventListener('keypress',function(e){
            if(check(e.key)){
                e.preventDefault();
            }
        });
        //если пытаемся вставить из выпадающих ранее введенных
        input.addEventListener('change',function(e){
            if(e && e.target){
                if(check(e.target.value)){
                    e.target.value = "";
                }
            }
         });
    });
};

export default checkTextInputs;
