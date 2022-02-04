import React from "react";
import ItemList from './itemList';
import GotService from "../../services/gotService";
import {mount} from 'enzyme';


describe('testing <ItemList/>',() => {
    const service = new GotService();
    const list = mount(<ItemList
                        getData = {service.getAllHouses}
                        renderItem = {({name})=>name}
                        />)
    it('Click on item list must rerender all list in 1 instance', () => {
        list.setState({itemList:[{name: 'skdfjks', id:1},{name: 'skdf', id:2}]});
        list.find('.list-grou-item:first-child').simulate('click');
        expect(list.find('ul')).toHaveLength(1);

    });
});