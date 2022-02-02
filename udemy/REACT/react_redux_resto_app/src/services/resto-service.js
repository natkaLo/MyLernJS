
// чтобы работал fetch надо поместить db.json в папку public
export default class RestoService{

    
    _apiBase = 'http://localhost:3000';
    async getResource(url){
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    async getMenuItems(){
        return await this.getResource('/menu/');
    }

    // getMenuItems= async () => {
    //     await fetch('db.json',{
    //             headers : { 
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //                     }
    //             }
    //         )  
    //         .then((response) => 
    //             response.json())
    //         .then((data) => {
    //            //console.log(data);
    //             return  data;
              
    //     })
    // }
}

     