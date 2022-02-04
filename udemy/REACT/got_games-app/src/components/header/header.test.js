import React from "react";
import Header from './header';
import {shallow} from 'enzyme';
describe('Testing<Header/>', () => {
    //тест кейс. Начинается с ключевого слова it
    it('Header have rendered correctly', () => {
        //создаем компонент который надо протестировать. Создаем с помощью renderer из библиотеки react-test-renderer
        const header = shallow(<Header/>); //получаем джейсон объект
        //хотим создать снимок как этот компонент должен выглядеть
        expect(header).toMatchSnapshot();
        //запуск теста - в терминале
        //npm run test

    })
});