function timer(id,deadLine){
  //////////////////////////////////////////////////////////////////////////////
    //timer
    //////////////////////////////////////////////////////////////////////////////
   
    //ф-ция определяет разницу между дедлайном и текущем временем
    function getTimeRemaining(endtime) {
        //endtime приходит в формате строки '2022-05-11'
        //получим разницу между endtime и текущей датой в кол-ве миллисек
        const t = Date.parse(endtime) - Date.parse(new Date());
        //разницу нужно превратить в кол-во дней,часов,минут
        //Math.floor() - округление до ближайщего целого
        const days = Math.floor(t / (1000 * 60 * 60 * 24)); //1000*60*60*24 - кол-во миллисек. в сутках
        const hours = Math.floor((t / (1000 * 60 * 60) % 24)); //колт-во часов
        const minutes = Math.floor((t / (1000 * 60) % 60)); //колт-во часов
        const seconds = Math.floor((t / (1000) % 60)); //колт-во часов
        //вернем объект из ф-ции
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //подставляем 0 впереди
    function getZero(num) {
        if (num >= 0 && num < 10) {
            //превращаем число в строку и подставляем впереди 0, если число меньше 10
            return `0${num}`;
        } else {
            return num;
        }
    }
    //ф-ция, которая будет устанавливать время на страницу
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        //один раз запустим  updateClock(), чтобы не было мигания верстки
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime); //запускаем таймер и получаем объект
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            //останавливаем таймер
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadLine);
}
//module.exports = timer;//можно писать так
// можно эксортировать по умолчанию
export default timer;