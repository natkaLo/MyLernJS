window.addEventListener('DOMContentLoaded', () => {
    const   tabs = require('./modules/tabs'),
            modal = require('./modules/modal'),
            cards = require('./modules/cards'),
            timer = require('./modules/timer'),
            calc = require('./modules/calc'),
            slider = require('./modules/slider');

    tabs();
    modal();
    cards();
    timer();
    calc();
    slider();
});
//npx json-server --watch db.json
//npx webpack