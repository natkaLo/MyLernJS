const timer = (id,deadline) =>{

    const getTimeReamining = (endTime) => {
        //Date.parse(endTime) - в мсек
        //при создании объекта Date (new Date()) в него записывается наше текущее время до млсек
        const   time = Date.parse(endTime) - Date.parse(new Date()), //получаем разницу в млсек между deadline и текущим временем
                seconds = Math.floor((time/1000)%60),     //time/1000 - кол-во секутд. ((time/1000)%60) - остаток от минут
                minutes = Math.floor((time/1000/60)%60),    //time/1000 - кол-во секутд.((time/1000)/60) - коль-во минут .(time/1000/60)%60 - кол-во часов и нужный нам остаток минут
                hours =   Math.floor((time/(1000*60*60))%24),
                days =  Math.floor((time/(1000*60*60*24)));
        //вернем объект
        return {
            'total' :time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };
    const addZero = (num) => {
        if(num <= 9){
            return '0' + num;
        }
        else{
            return num;
        }
    };
    const setClock = (selector, endTime) => {
        const   timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock,1000);
        
        updateClock();//запустим вручную, чтобы на страницу не подставлялись изначально данные из верстки (timer запуститься через секунду)

        function updateClock(){
            const t = getTimeReamining(endTime);

            days.textContent = addZero((t.total > 0)?t.days:0);
            hours.textContent = addZero((t.total > 0)? t.hours:0);
            minutes.textContent = addZero((t.total > 0)?t.minutes:0);
            seconds.textContent = addZero((t.total > 0)?t.seconds:0);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    };
   setClock(id,deadline);
};
export default timer;