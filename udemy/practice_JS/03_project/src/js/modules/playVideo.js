export default class VideoPlayer{
    constructor(triggers, overlayWindow){       //triggers - тригеры, по которым будем запускать видео, overlayWindow - окно в кот. будем показывть видео
        this.btns = document.querySelectorAll(triggers);
        this.overlayWindow = document.querySelector(overlayWindow);
        this.closeBtn = this.overlayWindow.querySelector('.close');
        //жестко привязываем контекст вызова
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }
    bindTriggers() {
        this.btns.forEach((btn,i )=> {
           try{
                // по заданию на странице modules.html нужно разблокировать просмотр следующего видио после того, как видео запущенное (this.activeBtn) просмотрено до конца
                //получим первого родителя у видео с активной кнопкой(closest) и его первого соседа по верстке(nextElementSibling). Нам нужно поставить аттрибут заблокированного видео(у него тот же родитель)
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;
                if(i%2 == 0){
                    blockedElem.setAttribute('data-disabled',true);
                }
           }catch(e){}
            btn.addEventListener('click', (e)=>{
               if(!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true'){
                    this.activeBtn = btn; // запомним кнопку на которую кликнули
                    if(document.querySelector('iframe#frame')){ //если мы уже нажимали кнопку - video frame уже создался(чтобы не создавать много раз объект плеера)
                        this.overlayWindow.style.display = 'flex';  //просто покажем окно
                        if(this.path !==  btn.getAttribute('data-url')){ //ксли кликнули по другой кнопке (путь к видео другой)
                            this.path = btn.getAttribute('data-url'); //идентификатор видео лежит в кнопке в аттрибуте data-url
                            //загружаем новое видео в наш плеер
                            this.player.loadVideoById({videoId:this.path});
                        }
                    }
                    else{
                        this.path = btn.getAttribute('data-url'); //идентификатор видео лежит в кнопке в аттрибуте data-url
                        this.createPlayer(this.path);    
                    }   
               }
                
            });
        });
    }
    bindCloseBtn(){
        this.closeBtn.addEventListener('click', (e)=>{
            this.overlayWindow.style.display = 'none';
            this.player.stopVideo();
        });
    }
    createPlayer(url){
        //создание плеера - url из кнопки по кот. нажали
        this.player = new YT.Player('frame',{       //frame cкопировали из index.htm. Он находиться  в <div class="overlay">
            height: '100%',
            width: '100%',
            videoId: `${url}`, //уникальное id видео, которое будем подгружать с youtube
            events:{        //нам нужны события от плеера - просмотрено видео до конца, поставлено на паузу и др
                'onStateChange':this.onPlayerStateChange
            }
        });
       //console.log(this.player);
        this.overlayWindow.style.display = 'flex';
    }

    onPlayerStateChange(state){
      try{
            // по заданию на странице modules.html нужно разблокировать просмотр следующего видио после того, как видео запущенное (this.activeBtn) просмотрено до конца
            //получим первого родителя у видео с кликнутой кнопкой play(closest) и его первого соседа по верстке(nextElementSibling). Нам нужно изменить стили у заблокированного видео(у него тот же родитель)
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
            //получим иконку из кнопки play. Мы ее должны будем поместить в заблокированную кнопку
            //cкопируем ноду с svg - true - применим глубокое копирование (все, что находиться в ноде)
            const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
            if(state.data === 0){ // 0 - видео закончено
                if(blockedElem.querySelector('.play__circle').classList.contains('closed')){//если следующий элемент заблокирован
                    blockedElem.querySelector('.play__circle').classList.remove('closed');
                    //удалим значек замочка
                    blockedElem.querySelector('svg').remove();
                    //установим значек стрелочки
                    blockedElem.querySelector('.play__circle').appendChild(playBtn);
                    blockedElem.querySelector('.play__text').textContent = 'play video';
                    blockedElem.querySelector('.play__text').classList.remove('attention');
                    blockedElem.style.opacity = 1;
                    blockedElem.style.filter = 'none';
                    blockedElem.setAttribute('data-disabled','false');
                }
            }
      }catch(e){}
    }

    init(){
        //если мы получили кнопки по переданному тригеру
        if(this.btns.length > 0){
            //инициализация плеера
            //асинхронное подключение скрипта с api video (iframe_api)
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0]; //получаем первый элемент с тегом script, который уже есть в документе
            firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);//вставляем перед ним наш тег со скриптом api video (iframe_api) 
            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}