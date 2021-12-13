'use strict';
// классы появились в стандарте ES6
//название класса обязательно с большой буквы
class Rectangle{
    constructor(height, width){
        this.height = height;
        this.width = width;
    }
    //методы
    calcArea(){
        return this.width * this.height;
    }
}
//наследование - указываем extends и родительский класс
class ColoredRectangleWithText extends Rectangle{
    constructor(height,width,text,bgColor){
        super(height,width);
        this.text = text;
        this.bgColor = bgColor;
    }
    showMyProps(){
        console.log(`Текст: ${this.text}, цвет${this.bgColor}`);
    }
}

const square = new Rectangle(10,10);
console.log(square.calcArea());
const long = new Rectangle(100,10);
console.log(long.calcArea());

const div = new ColoredRectangleWithText(23,19,'Hello World','red');
div.showMyProps();
console.log(div.calcArea());