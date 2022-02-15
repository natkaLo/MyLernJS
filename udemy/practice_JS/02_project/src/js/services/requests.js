
    // чтобы javaScript знал что ф-ция имеет асинхронные операции  и ждал используем async await
    //async пишется перед ф-цией в которой есть асинхронные операции(например fetch) a await пишется непостредственно перед асинхронной операцией
    const postData = async(url, data) => {
        //т.к  отправим в формате FormData, заголовок устанавливать не нужно
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        //res.text() тоже асинхронная операция. Поэтому пишем await
        return await res.text();
    };

    //get запрос
    const getResource = async(url) => {
       
        let res = await fetch(url);
        if(! res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
      
        return await res.json();
    };

    export {postData, getResource}; //именованный экспорт