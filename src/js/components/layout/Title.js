import React from "react";
import FormGroup from "./FormGroup";

export default class Title extends React.Component{
    onChangeFunction(param, value){
        this.props.onChangeFunction(param, value);
    }
    render(){
        return(
            <FormGroup type="text" tag={this.props.tag} content={this.props.title} input={this.props.input} onChangeFunction={this.onChangeFunction.bind(this)} name="title"/>
        )
    }
}