import React from "react";
import './errorMessage.css';

//если картинка лежит в папке public - <img src = {process.env.PUBLIC_URL + '/img/error.png'} alt="error"></img>. Импорт ее делать не надо
// return(
//     <>
//         <img src = {process.env.PUBLIC_URL + '/img/error.png'} alt="error"></img>
//          <span> Something goes wrong </span>
//     </>
// )
//если картинка лежит в этой папке
import img from './err.png'

const ErrorMessage = () =>{
    return(
        <>
           <img src = {img} alt="error"></img>
           <span> Something goes wrong </span>
        </>
    )
}
export default ErrorMessage;