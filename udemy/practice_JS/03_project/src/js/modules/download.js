export default class Download{
    constructor(triggers){
        this.btns = document.querySelectorAll(triggers);
        this.path ='assets/img/mainbg.jpg';
    }

    downloadItem(path){
        //cоздадим элемент ссылки, поместим на страницу и вызовем клик на нем. Тогда начнется скачивание
        const element= document.createElement('a');
        element.setAttribute('href',path);
        element.setAttribute('download','nice_picture');//чтобы было скачивание надо установить аттрибут download
        element.style.display = 'none'; //элемент невидимый
        document.body.appendChild(element);
        element.click(); //инициируем клик по элементу
        document.body.removeChild(element);//удаляем элементg
    }
    init(){
        this.btns.forEach(btn => {
            btn.addEventListener('click',(e) => {
                e.stopPropagation();
                this.downloadItem(this.path);
            });
        });
    }
}