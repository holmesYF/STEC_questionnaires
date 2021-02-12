import React from "react";

export default class Atab extends React.Component{
    constructor(){
        super();
    }
    
    clickFunction(){
        const mode = this.props.mode;
        this.props.changeMode(mode);
    }

    render(){
        return(
        <a className="nav-link" onClick={this.clickFunction.bind(this)}>{this.props.content}</a>
        );
    }
} 