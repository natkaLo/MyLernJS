import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ButtonToggleRandom from '../Button';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import CharDetails from '../charDetails';
import ItemList from '../itemList';
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
//componentDidCatch() - ловит ошибки в приложении
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class  App extends Component {
    gotService = new GotService();
    constructor(props){
        super(props);
        this.onToggleRandomCharcter = this.onToggleRandomCharcter.bind(this);
    }
 
    state = {
        shadowRandomChar: true,
        error:false
    }
   
    componentDidCatch(){
        console.log('error');
        this.setState({error: true})
    }

    onToggleRandomCharcter(){
       this.setState({shadowRandomChar: !this.state.shadowRandomChar })
    } 
    render(){
        const {shadowRandomChar} = this.state;
        const randomCharacter = shadowRandomChar?<RandomChar/>:null;
        if(this.state.error){
            return <ErrorMessage/>
        }

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
                   <CharacterPage/>
                    <Row>
                        <Col md = '6'>
                            <ItemList 
                             onItemSelected = {this.onItemSelected}
                             getData = {this.gotService.getAllBooks} // это не вызов ф-йи (нет круглых скобок), а передаем ее в качестве пропсов в ItemList. Он ее и вызывае
                              //паттерн - рендер функция - позволяет коттролировать - что именно отображать в наших компонентах
                             renderItem = {(item) => item.name}
                            //можно использовать и разметку
                           // renderItem = {(item) => (<><span>{item.name}</span><button> Click Me</button></>)}
                             />
                        </Col>
                        <Col md = '6'>
                            <CharDetails charId = {this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md = '6'>
                            <ItemList onItemSelected = {this.onItemSelected} 
                             getData = {this.gotService.getAllHouses} // это не вызов ф-йи (нет круглых скобок), а передаем ее в качестве пропсов в ItemList. Он ее и вызывае
                             renderItem = {(item) => item.name}
                              />
                        </Col>
                        <Col md = '6'>
                            <CharDetails charId = {this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
             </>
        )
    }
}

// без паттернов
// export default class  App extends Component {
//     constructor(props){
//         super(props);

//         this.state = {
//             visibleRandomCharacter:true,
//             error: false
//         }

//         this.onToggleRandomCharcter = this.onToggleRandomCharcter.bind(this);
//     }
//     componentDidCatch(){
//         console.log('error');
//         this.setState({error: true})
//     }

//     onToggleRandomCharcter(){
//        this.setState({visibleRandomCharacter: !this.state.visibleRandomCharacter })
//     } 



//     render(){
//         const {visibleRandomCharacter} = this.state;
//         const randomCharacter = visibleRandomCharacter?<RandomChar/>:null;
//         if(this.state.error){
//             return <ErrorMessage/>
//         }

//          return (
//             <> 
//                 <Container>
//                     <Header />
//                 </Container>
//                 <Container>
//                     <Row>
//                         <Col lg={{size: 5, offset: 0}}>
//                            {randomCharacter}
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col> <ButtonToggleRandom onToggleRandomCharcter = {this.onToggleRandomCharcter}/></Col>
//                     </Row>
//                    <CharacterPage/>

//                  </Container>
//              </>
//         )
//     }
// }

