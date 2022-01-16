import React, { Component } from "react";
import { Button } from "reactstrap";
import './button.css'

export default class ButtonToggleRandom extends Component{

    render(){
        const {onToggleRandomCharcter} = this.props;
        return (
            <div className="btn-div">
           <Button color='primary'
           onClick={()=>onToggleRandomCharcter()}>
               Toggle random character
               </Button>
           </div>
         )
    }
}
