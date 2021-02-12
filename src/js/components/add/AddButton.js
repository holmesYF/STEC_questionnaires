import React from "react";

export default class AddButton extends React.Component{
    onClickFunction(){
        const state = this.props.state;
        this.props.changeMode("questionAdd", state);
    }
    
    render(){
        return(
            <div className="col-md-6 col-sm-12 addButton">
                <div className="row justify-content-center">
                    <button type="button" className="btn rtn-lg btn-outline-info" onClick={this.onClickFunction.bind(this)}>+</button>
                </div>
            </div>
        )
    }
}