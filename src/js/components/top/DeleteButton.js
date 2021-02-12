import React from "react";

export default class DeleteButton extends React.Component{
    onClickFunction(){
        this.props.onClickFunction();
    }

    render(){
        return(
            <button className="btn btn-outline-secondary" type="button" onClick={this.onClickFunction.bind(this)}>
                削除
            </button>
        )
    }
}