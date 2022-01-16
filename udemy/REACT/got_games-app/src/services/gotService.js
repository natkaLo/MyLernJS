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
            name: (char.name && char.name.length)? char.name: 'no data :(',
            gender: (char.gender && char.gender.length)? char.gender: 'no data :(',
            born: (char.born && char.born.length)? char.born: 'no data :(',
            died: (char.died && char.died.length)? char.died: 'no data :(',
            culture: (char.culture && char.culture.length)? char.culture: 'no data :('
        }
    }

    _transformHouse (house){
        return {
            name: (house.name && house.name.length)? house.name: 'no data :(',
            region:(house.region && house.region.length)? house.region: 'no data :(',
            words:(house.words && house.words.length)? house.words: 'no data :(',
            titles: (house.titles && house.titles.length)? house.titles: 'no data :(',
            overlord: (house.overlord && house.overlord.length)? house.overlord: 'no data :(',
            ancestralWeapons:(house.ancestralWeapons && house.ancestralWeapons.length)? house.ancestralWeapons: 'no data :('
        }
    }

    _trasformBook(book){
        return{
            name: (book.name && book.name.length)? book.name: 'no data :(',
            numberOfPages: (book.numberOfPages && book.numberOfPages.length)? book.numberOfPages: 'no data :(',
            publiser: (book.publiser && book.publiser.length)? book.publiser: 'no data :(',
            released: (book.released && book.released.length)? book.released: 'no data :('
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