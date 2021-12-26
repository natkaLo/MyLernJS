function myModule(){
    this.hello = function(){
        console.log('Hello');
    };
    this.goodbay = function(){
        console.log('goodbay');
    };

}

module.exports = myModule; //экспортируем функцию