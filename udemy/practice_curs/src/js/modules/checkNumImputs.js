const CheckNumInputs= (selector) => {
    const numImputs = document.querySelectorAll(selector);
    numImputs.forEach(item => {
        item.addEventListener('input', () =>{
            //заменим все не числа на пустую строку. /\D/ - ищем все не цифры
            item.value = item.value.replace(/\D/,'');
        });
    });

}
export default CheckNumInputs;
