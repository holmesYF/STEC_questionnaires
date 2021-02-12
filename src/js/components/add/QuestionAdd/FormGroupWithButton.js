import React from "react";

export default class FormGroupWithButton extends React.Component{
    constructor(){
        super();
        this.state = {
            input: ""
        }
    }

    onClickFunction(){
        var number = this.props.number;
        this.props.onClickFunction(number);
    }

    onChangeFunction(e){
        var content = e.target.value;
        var number = this.props.number;
        this.props.onChangeFunction(content, number);
    }

    render(){
        return(
            <div className="form-group">
                <div className="row justify-content-end">
                    <div className="col-sm-2">
                        <label htmlFor="FormGroupWithButton">選択肢:{this.props.number + 1}</label>
                    </div>
                    <div className="col-sm-9">
                        <input id="FormGroupWithButton" onChange={this.onChangeFunction.bind(this)} className="form-control paramInput" value={this.props.content}></input>
                    </div>
                    <div className="col-sm-1">
                        <button className="btn btn-secondary" onClick={this.onClickFunction.bind(this)}>x</button>
                    </div>
                </div>
            </div>
        )
    }
}