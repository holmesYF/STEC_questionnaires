import React from "react";

export default class DetailButton extends React.Component{
    onClickFunction(){
        this.props.onClickFunction();
    }

    render(){
        return(
            <button className="btn btn-outline-secondary" type="button" onClick={this.onClickFunction.bind(this)}>
                詳細
            </button>
        )
    }
}