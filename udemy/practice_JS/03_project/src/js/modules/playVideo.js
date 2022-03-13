export default class VideoPlayer{
    constructor(triggers, overlayWindow){       //triggers - тригеры, по которым будем запускать видео, overlayWindow - окно в кот. будем показывть видео
        this.btns = document.querySelectorAll(triggers);
        this.overlayWindow = document.querySelector(overlayWindow);
        this.closeBtn = this.overlayWindow.querySelector('.close');
    }
    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', (e)=>{
                if(document.querySelector('iframe#frame')){ //если мы уже нажимали кнопку - video frame уже создался(чтобы не создавать много раз объект плеера)
                    this.overlayWindow.style.display = 'flex';  //просто покажем окно
                }
                else{
                    const path = btn.getAttribute('data-url'); //идентификатор видео лежит в кнопке в аттрибуте data-url
                    this.createPlayer(path);    
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
        });
       //console.log(this.player);
        this.overlayWindow.style.display = 'flex';
    }
  
    init(){
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