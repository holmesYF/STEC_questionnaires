import React from "react";

export default class FreeAnswer extends React.Component{
    onClickFunction(){
        const input = document.getElementById("FreeAnswer");
        this.props.onClickFunction(input.checked)
    }

    render(){
        var question = this.props.question
        return(
            <div className="row form-group">
                <div className="col-sm-2">
                    <label htmlFor="FreeAnswer" className="form-group">自由回答</label>
                </div>
                <div className="col-sm-10">
                    <input className="form-group" type="checkbox" id="FreeAnswer" onClick={this.onClickFunction.bind(this)}></input>
                </div>
            </div>
        )
    }
}