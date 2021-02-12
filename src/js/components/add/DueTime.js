import React from "react";

export default class DueTime extends React.Component{
    onChangeFunction(e){
        const content = e.target.value;
        const tag = this.props.name;
        this.props.onChangeFunction(tag, content);
    }

    render(){
        var output = [];
        const input = this.props.input;
        for(var i=0; i<=23; i++){
            if(i == input){
                output.push(<option selected>{i}</option>)
            }else{
                output.push(<option>{i}</option>)
            }
        }
        return(
            <div className="form-group row">
                <label className="col-sm-2" htmlFor={this.props.name}>{this.props.content}</label>
                <div className="col-sm-10">
                    <select id={this.props.name} className="form-control" name={this.props.name} onChange={this.onChangeFunction.bind(this)}>
                        {output}
                    </select>
                </div>
            </div>
        )
    }
}