export default class Difference{
    constructor(officerBlock,itemsClassName){
        this.officerBlock = document.querySelector(officerBlock);
        try{ this.items = this.officerBlock.querySelectorAll(itemsClassName);}catch(e){}
       
        this.Counter = 0;
    }
    bindTriggers(){
        try{ 
            this.officerBlock.querySelector('.plus').addEventListener('click', () =>{

                this.items[this.Counter].style.display ='flex';
                this.items[this.Counter].classList.add('animated','fadeIn');
                if(this.Counter == this.items.length -2){
                    this.items[this.items.length -1].remove();
                }
                this.Counter++;
            });
     }catch(e){}
    }

    hideCardItems(){
        try{
            //нужно скрыть все карточки, кроме последней , где есть кнопка Click to show
            //arr - ссылка на массив, который сейчас перебираем, i - индекс
            this.items.forEach((item,i,arr) =>{
                if(i !== (arr.length -1)){
                    item.style.display = "none";
                }
            });
     }catch(e){}
    }
    init(){
        this.hideCardItems();
        this.bindTriggers();
    }

}