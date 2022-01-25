import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ButtonToggleRandom from '../Button';
import ErrorMessage from '../errorMessage';
import {CharacterPage, HousesPage,BooksPage, BooksItem } from '../pages';

import GotService from '../../services/gotService';
import {BrowserRouter as Router,Routes, Route,useParams } from 'react-router-dom';

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
       
        function BookItems ({ serv: Service })
        {
            let { id } = useParams();
           // console.log(id);
           //чтобы не терялся background у body -  в index css надо писат со слешом<link rel="stylesheet" href="/index.css"></link>
            return (
                 <BooksItem 
                     bookId = {id}
                     getSelPageDataProps = {Service} // передаем их в качестве пропсов в bookItem.
                 />
             )
        }
        

         return (
            <Router>
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
                        <Routes>
                            <Route path= '/characters' element = {<CharacterPage  getAllPageDataProps = {this.gotService.getAllCharacters} getSelPageDataProps = {this.gotService.getCharacter} // это не вызов ф-йи (нет круглых скобок), а передаем их в качестве пропсов в characterPage. Он их передаст в itemList
                             />} />
                            <Route path= '/houses' element = {<HousesPage getAllPageDataProps = {this.gotService.getAllHouses} getSelPageDataProps = {this.gotService.getHouse} 
                            />} /> 
                            <Route path= '/books'  element = {<BooksPage getAllPageDataProps = {this.gotService.getAllBooks} // это не вызов ф-йи (нет круглых скобок), а передаем их в качестве пропсов в bookPage. Он их передаст в itemList
                            />} />
                            <Route path= 'books/:id/*'  element = {<BookItems serv={this.gotService.getBook} // это не вызов ф-йи (нет круглых скобок), а передаем  в качеcтве параметров в ф-цию компонент
                            />} />
                        </Routes>
                    </Container>
              
             </Router>
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

