import { getResource } from "../services/requests";
//index.html добавили в option атрибут value = "
const calc = (size, material,options, promocode, result) => {
    const   sizeBlock = document.querySelector(size),
            materialBlock = document.querySelector(material),
            optionsBlock = document.querySelector(options),
            promocodeBlock = document.querySelector(promocode),
            resultBlock = document.querySelector(result);
    let sum = 0;

    //из верстки
    // const calcFunction = () => {
    //     //+sizeBlock.value - из текста в число
    //     sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));
    //     //обязательно должны быть заполнены два поля (size и material). В верстке мы оставили пустой value для Выберите размер картины и Выберите материал картины
    //     if(sizeBlock.value == '' || materialBlock.value == ''){
    //         resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
    //     }
    //     else if(promocodeBlock.value === 'IWANTPOPART'){  //IWANTPOPART - промокод от заказчика
    //         resultBlock.textContent = Math.round(sum * 0.7);
    //     }
    //     else{
    //         resultBlock.textContent = sum;
    //     }
    // };

    //из dbCalc.json

    const calcFunction = () => {
        // getResource( 'http://localhost:3000/styles') //  http://localhost:3000/styles копируем из терминала после запуска JSON сервера (Resources)
        getResource( 'assets/dbCalc.json')          //без JSON сервера. Просто к файлу
        .then(res => {
            // console.log(res); //получили в консоль массив данных (JSON сервер)
            //console.log(res.calc);//без JSON сервера. Просто к файлу
            const resValue = res.calc[0];
            let selectedIndex = sizeBlock.options.selectedIndex;
            const sizeBlockValue = resValue.sizeValues[selectedIndex];
            // console.log(sizeBlockValue);
            selectedIndex = materialBlock.options.selectedIndex;
            const materialBlockValue = resValue.materialValues[selectedIndex];
            selectedIndex = optionsBlock.options.selectedIndex;
            const optionsBlockVkalue = resValue.optionsValues[selectedIndex];

           //обязательно должны быть заполнены два поля (size и material). В верстке мы оставили пустой value для Выберите размер картины и Выберите материал картины
            if(sizeBlockValue == '' || materialBlockValue == ''){
                resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
            }
            else
            {
                //+sizeBlock.value - из текста в число
                sum = Math.round((+sizeBlockValue) * (+materialBlockValue) + (+optionsBlockVkalue));
                if(promocodeBlock.value  === resValue.promocode){  //IWANTPOPART - промокод от заказчика
                     resultBlock.textContent = Math.round(sum * 0.7);
                }
                else{
                     resultBlock.textContent = sum;
                }
            }
            resultBlock.parentNode.setAttribute('data-calc',sum);// устанавливаем форме сумму в дата аттрибут
         
        }).catch(error => console.log(error));
    };

    sizeBlock.addEventListener('change',calcFunction);
    materialBlock.addEventListener('change',calcFunction);
    optionsBlock.addEventListener('change',calcFunction);
    promocodeBlock.addEventListener('input',calcFunction);

};
export default calc;