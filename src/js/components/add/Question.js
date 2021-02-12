import React from "react";

export default class Question extends React.Component{
    deleteQuestion(){
        this.props.deleteQuestion(this.props.count);
    }

    render(){
        var option = [];
        for(var key in this.props.option){
            option.push(
            <p>{key}: {this.props.option[key]}</p>
            )
        }
        return(
            <div className="col-md-6 col-sm-12">
                <div className="card" onDoubleClick={this.deleteQuestion.bind(this)}>
                <h4>Q{this.props.count}</h4>
                <div className="card-body">
                    <h5>{this.props.title}</h5>
                    <p style={{textAlign:"center"}}>{option}</p>
                </div>
            </div>
            </div>
        )
    }
}