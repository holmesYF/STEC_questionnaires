import React from "react";
import FormGroupWithButton from "./FormGroupWithButton";

export default class Option extends React.Component{
    constructor(){
        super();
        this.state = {
            option: [""]
        };
    }

    FormGroupWithButtonFunction(number){
        var option = this.state.option;
        option.splice(number, 1);
        this.setState({option});
    }

    ButtonFunction(){
        var option = this.state.option;
        var index = option.length;
        option[index] = "";
        this.setState({option});
    }

    onChangeFunction(content, number){
        var option = this.state.option;
        option[number] = content;
        this.setState({option});
    }

    render(){
        var number = 0;
        var output = this.state.option.map(content => {
            return <FormGroupWithButton content={content} number={number++} onChangeFunction={this.onChangeFunction.bind(this)} onClickFunction={this.FormGroupWithButtonFunction.bind(this)}/>
        })
        return(
            <div id={this.props.id} className="form-group">
                {output}
                <button className="btn btn-link btn-block col-12" onClick={this.ButtonFunction.bind(this)}>追加</button>
            </div>
        )
    }
}