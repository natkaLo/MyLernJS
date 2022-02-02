import React, {Component} from "react";
import MyContext from "./Context";

//cпостоб для функциональных компонентов(описанных функцией а не классом)
//если передали просто строку - My name is {value} и в классе {this.context}
const Name = () => {
    return(

        <MyContext.Consumer>
            {
                (value) => {
                    return (
                        <div className = 'name'>
                            My name is {value.name}
                         </div>
                    )
                }
            }
        </MyContext.Consumer>
     
    )
}
//cпостоб для классов компонентов(описанных классом а не ф-цией)
class LastName extends Component {
    render(){
        return(
            <div className = 'name'>
               My last name is {this.context.lastName}
            </div>
        )
    }
}
LastName.contextType = MyContext;

export {Name, LastName};
