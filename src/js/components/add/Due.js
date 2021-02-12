import React from "react";
import FormGroup from "../layout/FormGroup";

export default class Due extends React.Component{
    render(){
        return(
            <FormGroup type="date" tag={this.props.tag} content={this.props.content} name={this.props.name} input={this.props.input} onChangeFunction={this.props.onChangeFunction.bind(this)}/>
        )
    }
}