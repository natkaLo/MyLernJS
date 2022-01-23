//https://anapioficeandfire.com/
export default class GotService{
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
   getResource = async (url) => {
        const res = await fetch (`${this._apiBase}${url}`);
        if(!res.ok){
            //getResource('https://jsonplaceholder.typicode.com/posts/100000')
            throw new Error (`Could not fetch ${url}`+
            `, status: ${res.status}`);
        }
        return await res.json();      //содержит ответ от сервера;
    }
    //получение персонажей
    getAllCharacters = async() =>{
        //return this.getResource('https://www.anapioficeandfire.com/api/characters');//возвращает первую страницу где 10 персонажей
        //возвращает пятую страницу и хотим получить 10 персонажей  'https://www.anapioficeandfire.com/api/characters?page=5&pageSize=10'
        const res = await this.getResource('/characters?page=5'); //получаем массив персонажей
        //console.log(res);
        return res.map(this._transformCharacter); //map перебирает массив (параметр - колбек функция)
    }
    //получение персонажа по id
    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`); //получаем объект
        return this._transformCharacter(res);
    }
    //получение домов https://www.anapioficeandfire.com/api/houses
    getAllHouses = async () =>{
        const res = await  this.getResource('/houses/');
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const res = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(res);
    }

    //получение книг  https://www.anapioficeandfire.com/api/books
   getAllBooks =  async () =>{
        const res = await this.getResource('/books/');
        return res.map(this._trasformBook);
    }
    getBook = async (id) =>{
        const res = await this.getResource(`/books/${id}/`);
        return this._trasformBook(res);
    }

    isSet(data){
        return (data)? data: 'no data :(';
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        //console.log(item);
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
       // console.log(char);
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse = (house) => {
        //console.log(house);
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region:this.isSet(house.region),
            words:this.isSet(house.words),
            titles: this.isSet(house.titles[0]),
            overlord:this.isSet(house.overlord),
            ancestralWeapons:this.isSet(house.ancestralWeapons)
        }
    }

    _trasformBook = (book) => {
        return{
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publiser: this.isSet(book.publiser),
            released: this.isSet(book.released)
        }
    }
}

//проблема в том - что при использовании паттернов теряется контекст вызова (this.gotService.getAllCharacters) поэтому нужно превратить все ф-ции в стрелочные

// export default class GotService{
//     constructor(){
//         this._apiBase = 'https://www.anapioficeandfire.com/api';
//     }
//    async getResource(url){
//         const res = await fetch (`${this._apiBase}${url}`);
//         if(!res.ok){
//             //getResource('https://jsonplaceholder.typicode.com/posts/100000')
//             throw new Error (`Could not fetch ${url}, status: ${res.status}`);
//         }
//         return await res.json();      //содержит ответ от сервера;
//     }
//     //получение персонажей
//     async getAllCharacters(){
//         //return this.getResource('https://www.anapioficeandfire.com/api/characters');//возвращает первую страницу где 10 персонажей
//         //возвращает пятую страницу и хотим получить 10 персонажей  'https://www.anapioficeandfire.com/api/characters?page=5&pageSize=10'
//         const res = await this.getResource('/characters?page=5'); //получаем массив персонажей
//         return res.map(this._transformCharacter); //map перебирает массив (параметр - колбек функция)
//     }
//     //получение персонажа по id
//     async getCharacter(id){
//         const res = await this.getResource(`/characters/${id}`); //получаем объект
//         return this._transformCharacter(res);
//     }
//     //получение домов https://www.anapioficeandfire.com/api/houses
//     async getAllHouses(){
//         const res = await  this.getResource('/houses?page=5');
//         return res.map(this._transformHouse);
//     }
//     async getHouse(id){
//         const res = await this.getResource(`/houses/${id}`);
//         return this._transformHouse(res);
//     }

//     //получение книг  https://www.anapioficeandfire.com/api/books
//     async getAllBooks(){
//         const res = await this.getResource('/books?page=5');
//         return res.map(this._trasformBook);
//     }
//     async getBook(id){
//         const res = await this.getResource(`/books/${id}`);
//         return this._trasformBook(res);
//     }

//     _transformCharacter(char){
//         return {
//             name: (char.name && char.name.length)? char.name: 'no data :(',
//             gender: (char.gender && char.gender.length)? char.gender: 'no data :(',
//             born: (char.born && char.born.length)? char.born: 'no data :(',
//             died: (char.died && char.died.length)? char.died: 'no data :(',
//             culture: (char.culture && char.culture.length)? char.culture: 'no data :('
//         }
//     }

//     _transformHouse (house){
//         return {
//             name: (house.name && house.name.length)? house.name: 'no data :(',
//             region:(house.region && house.region.length)? house.region: 'no data :(',
//             words:(house.words && house.words.length)? house.words: 'no data :(',
//             titles: (house.titles && house.titles.length)? house.titles: 'no data :(',
//             overlord: (house.overlord && house.overlord.length)? house.overlord: 'no data :(',
//             ancestralWeapons:(house.ancestralWeapons && house.ancestralWeapons.length)? house.ancestralWeapons: 'no data :('
//         }
//     }

//     _trasformBook(book){
//         return{
//             name: (book.name && book.name.length)? book.name: 'no data :(',
//             numberOfPages: (book.numberOfPages && book.numberOfPages.length)? book.numberOfPages: 'no data :(',
//             publiser: (book.publiser && book.publiser.length)? book.publiser: 'no data :(',
//             released: (book.released && book.released.length)? book.released: 'no data :('
//         }
//     }
// }

 //const got = new GotService();
// got.getAllCharacters()
// //.then(res => console.log(res));
// .then(res => {(res.forEach(item => console.log(item.name)));
// });
 //got.getCharacter(130)
 //.then(res => console.log(res));