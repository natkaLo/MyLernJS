//context исползуется, чтобы не пробрасывать множество пропсов сверху вниз
//установленные в Provider будут доступны во всех обернутых им компонентах
// все, что мы хотим передать ниже, должно быть с названием value
//  <MyContext.Provider value={'natka'}> - передаем просто строку
// <MyContext.Provider value={ {}}></MyContext.Provider> - объект
//consumer нужен, чтобы считать значение, установленное в provider
{/* <App>
    <Provider value = {lang}>
        <MainPage>
            <Blog>

            </Blog>
        </MainPage>
        <ContactsPage>
        //cпостоб для функциональных компонентов(описанных функцией а не классом)
             <Consumer>
                    {
                        (lang) => {
                            return(
                                <Address lang = {lang} // у Address будет пропорти lang, значение которого приходит от Provider
                                >
                                 </Address>
                            )
                        }
                    }

            </Consumer>
        </ContactsPage>
    </Provider>
</App> */}
//cпостоб для классов компонентов(описанных классом а не ф-цией)
// class LastName extends Component {
//     render(){
//         return(
//             <div className = 'name'>
//                My last name is {this.context}
//             </div>
//         )
//     }
// }
// LastName.contextType = MyContext;