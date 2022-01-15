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

    getAllCharacters(){
        //return this.getResource('https://www.anapioficeandfire.com/api/characters');//возвращает первую страницу где 10 персонажей
        //возвращает пятую страницу и хотим получить 10 персонажей  'https://www.anapioficeandfire.com/api/characters?page=5&pageSize=10'
        return this.getResource('/characters?page=5');
    }
    //получение персонажа по id
    getCharacter(id){
        return this.getResource(`/characters/${id}`);
    }
}

// const got = new GotService();
// got.getAllCharacters()
// //.then(res => console.log(res));
// .then(res => {(res.forEach(item => console.log(item.name)));
// });
// got.getCharacter(130)
// .then(res => console.log(res));