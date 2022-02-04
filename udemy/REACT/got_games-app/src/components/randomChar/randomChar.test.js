import React from "react";
import RandomChar from './randomChar';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

//тест сьют
describe('Testing<RandomChar/>', () => {
    const char = shallow(<RandomChar/>); //создаем копию с помощью enzyme
   describe('Testing snap and state', () => {
            //тест кейс. Начинается с ключевого слова it
        it('RandomChar have rendered correctly', () => {
            //создаем компонент который надо протестировать. Создаем с помощью renderer из библиотеки react-test-renderer
            const char = renderer.create(<RandomChar/>).toJSON(); //получаем джейсон объект
            //хотим создать снимок как этот компонент должен выглядеть
            expect(char).toMatchSnapshot();
            //запуск теста - в терминале
            //npm run test

        });
        // it('should render a title', () => {
        //     const wrapper = shallow(<Document title = 'Some title'/>);
        //     expect(wrapper.prop('title')).toEqual('Some title');
        // })
       
        it('RandomChar  have rendered correctly', () => {
            expect(char).toMatchSnapshot();
        });
        // it('RandomChar state "char" is empty object', () => {
        //     expect(char.state().char).toBeObject();//toBeObject из Jest extended
        // });

        it('RandomChar state "loading" is true', () => {
            expect(char.state().loading).toBeTruthy();
        });
        it('RandomChar state "error" is false', () => {
            expect(char.state().error).toBeFalsy();
        });
   });
   //проверяем работу функций
   describe('Handlers tests', () =>{
        it('testing onCharLoade', () =>{
            char.instance().onCharLoaded(); //вызываем функцию
            expect(char.state().loading).toBeFalsy();//проверяем результат
        });
        it('testing onError', () =>{
            char.instance().onError(); //вызываем функцию
            expect(char.state().loading).toBeFalsy();//проверяем результат
            expect(char.state().error).toBeTruthy();//проверяем результат
        });
        it('testing updateChar', () =>{
            char.instance().updateChar(); //вызываем функцию
            expect(char.state().loading).toBeFalsy();//проверяем результат
           
        });
   });
});