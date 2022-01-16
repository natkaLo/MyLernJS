import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ButtonToggleRandom from '../Button';

import GotService from '../../services/gotService';

//const got = new GotService();
// got.getAllCharacters()
// //.then(res => console.log(res));
// .then(res => {(res.forEach(item => console.log(item.name)));
// });
 //got.getBook(1)
// .then(res => console.log(res));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //componentDidMount() компонент появился и отрисовался на странице - здесь работаем с дом деревом и с сервером
// componentWillUnmount()компоненент удаляется со страницы. Вызывается до того, как dom структура будет удалена со страницы
//componentDidUpdate(prevProps) компоненент обновляется. Вызывается когда компонент должен быть обновлен - в 2 случаях - когда компонент получает новые пропорти и когда изменяется state
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class  App extends Component {
    constructor(props){
        super(props);

        this.state = {
            visibleRandomCharacter:true,
            selectedChar:null
        }

        this.onToggleRandomCharcter = this.onToggleRandomCharcter.bind(this);
    }
    onToggleRandomCharcter(){
       this.setState({visibleRandomCharacter: !this.state.visibleRandomCharacter })
    } 

    onCharSelected = (id) =>{
        this.setState({selectedChar:id})
    }

    render(){
        const {visibleRandomCharacter} = this.state;
        const randomCharacter = visibleRandomCharacter?<RandomChar/>:null;
         return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                           {randomCharacter}
                        </Col>
                    </Row>
                    <Row>
                        <Col> <ButtonToggleRandom onToggleRandomCharcter = {this.onToggleRandomCharcter}/></Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onCharSelected = {this.onCharSelected}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId = {this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
             </>
        )
    }
}

