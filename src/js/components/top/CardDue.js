import React from "react";

export default class CardDue extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col-5">
                    <p className="text-center">期日：</p>
                </div>
                <div className="col-7">
                    <div className="row card-text"><p>{this.props.start}</p></div>
                    <div className="row card-text"><p>~</p></div>
                    <div className="row card-text"><p>{this.props.end}</p></div>
                </div>
            </div>
        )
    }
}