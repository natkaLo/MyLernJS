const drop = () => {
    //если 8 событий, которые связаны с перетаскиванием
    //drag *
    //dragend *
    //dragenter - событие возникает, когда пертаскиваемый объект находится над drop area (втащили)(drop area - любой элемент, который воспринимает это событие)
    //dragexit *
    //dragleave - оьъект за пределами drop area (выташили)
    //dragover  - срабатывает каждые несколько млсек пока объект находиться над drop area
    //dragstart *
    //drop  - возникает, когда пользователь отпустил кнопку мыши и наш объект отправлен в drop area
    // * - события срабатывают на элементе, который мы перетаскиваем

    const fileInputs = document.querySelectorAll('[name = "upload"]'); // по аттрибуту
    // чтобы не вешать каждое событие отдельно
    //создадим массив событий
    ['dragenter','dragleave','dragover', 'drop'].forEach(evenName => {
        fileInputs.forEach(input => {
            input.addEventListener(evenName, preventDefauls, false);
        });
    });

    function preventDefauls(event){
        event.preventDefault();
        event.stopPropagation();
    }

    //подсветим элемент, на который тащим
    function higlight(item){
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0,.7)";
    }
    //уберем подсветку
    function unhiglight(item){
        item.closest('.file_upload').style.border = "none";
        if(item.closest('.calc_form')){
            item.closest('.file_upload').style.backgroundColor = "#fff";
        }
        else{
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
     }

    ['dragenter','dragover'].forEach(evenName => {
        fileInputs.forEach(input => {
            input.addEventListener(evenName, ()=>higlight(input), false);
        });
    });
    ['dragleave','drop'].forEach(evenName => {
        fileInputs.forEach(input => {
            input.addEventListener(evenName, ()=>unhiglight(input), false);
        });
    });
    fileInputs.forEach(input => {
        input.addEventListener('drop', (event)=>{
            input.files = event.dataTransfer.files;
            
            const arr = input.files[0].name.split('.');
            let dots = (arr[0].length > 6)?"...": ".";
            const name = arr[0].substring(0,6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });

};
export default drop;