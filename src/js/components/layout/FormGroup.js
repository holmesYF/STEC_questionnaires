import React from "react";

export default class FormGroup extends React.Component{
    onChangeFunction(e){
        const content = e.target.value;
        const tag = this.props.name;
        this.props.onChangeFunction(tag, content);
    }
    render(){
        return(
            <div className="form-group row">
                <label className="col-form-label col-sm-2">{this.props.content}</label>
                <div className="col-sm-10">
                    <input type={this.props.type} name={this.props.name} className="form-control paramInput" value={this.props.input} onChange={this.onChangeFunction.bind(this)} required />
                </div>
            </div>
        )
    }
}