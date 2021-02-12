import React from "react";

export default class AddButton extends React.Component{
    onClickFunction(){
        this.props.changeMode("add");
    }

    render(){
        return(
            <div className="col-lg-4 col-sm-12 addButton">
                <div className="row justify-content-center">
                    <button type="button" className="btn rtn-lg btn-outline-info" onClick={this.onClickFunction.bind(this)}>+</button>
                </div>
            </div>
        )
    }
}