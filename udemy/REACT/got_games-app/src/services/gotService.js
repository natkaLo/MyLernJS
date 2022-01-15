//https://anapioficeandfire.com/
export default class GotService{
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
   async getResource(url){
        const res = await fetch (`${this._apiBase}${url}`);
        if(!res.ok){
            //getResource('https://jsonplaceholder.typicode.com/posts/100000')
            throw new Error (`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();      //содержит ответ от сервера;
    }
    //получение персонажей
    async getAllCharacters(){
        //return this.getResource('https://www.anapioficeandfire.com/api/characters');//возвращает первую страницу где 10 персонажей
        //возвращает пятую страницу и хотим получить 10 персонажей  'https://www.anapioficeandfire.com/api/characters?page=5&pageSize=10'
        const res = await this.getResource('/characters?page=5'); //получаем массив персонажей
        return res.map(this._transformCharacter); //map перебирает массив (параметр - колбек функция)
    }
    //получение персонажа по id
    async getCharacter(id){
        const res = await this.getResource(`/characters/${id}`); //получаем объект
        return this._transformCharacter(res);
    }
    //получение домов https://www.anapioficeandfire.com/api/houses
    async getAllHouses(){
        const res = await  this.getResource('/houses?page=5');
        return res.map(this._transformHouse);
    }
    async getHouse(id){
        const res = await this.getResource(`/houses/${id}`);
        return this._transformHouse(res);
    }

    //получение книг  https://www.anapioficeandfire.com/api/books
    async getAllBooks(){
        const res = await this.getResource('/books?page=5');
        return res.map(this._trasformBook);
    }
    async getBook(id){
        const res = await this.getResource(`/books/${id}`);
        return this._trasformBook(res);
    }

    _transformCharacter(char){
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse (house){
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _trasformBook(book){
        return{
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}

 //const got = new GotService();
// got.getAllCharacters()
// //.then(res => console.log(res));
// .then(res => {(res.forEach(item => console.log(item.name)));
// });
 //got.getCharacter(130)
 //.then(res => console.log(res));