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



export default class  App extends Component {
    constructor(props){
        super(props);

        this.state = {
            visibleRandomCharacter:true
        }

        this.onToggleRandomCharcter = this.onToggleRandomCharcter.bind(this);
    }
    onToggleRandomCharcter(){
       this.setState({visibleRandomCharacter: !this.state.visibleRandomCharacter })
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
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
             </>
        )
    }
}

