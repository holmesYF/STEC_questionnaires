import React from "react";
import Question from "./Question";
import AddButton from "./AddButton";

export default class QuestionAdmin extends React.Component{
    changeMode(mode, state){
        this.props.changeMode(mode, state);
    }

    deleteQuestion(count){
        var _delete = confirm("本当に削除しますか？");
        if(_delete){
            this.props.deleteQuestion(count);
        }
    }

    render(){
        var output = [];
        const questions = this.props.question;
        const count = Object.keys(questions).length;
        for(var i=0; i<count; i++){
            var num = i + 1;
            var title = this.props.question[i].title;
            var option = this.props.question[i].option;
            output.push(<Question deleteQuestion={this.deleteQuestion.bind(this)} count={num} title={title} option={option} />)
        }
        return(
            <div className="container">
                <div className="row align-items-center col-sm-12">
                    <AddButton changeMode={this.changeMode.bind(this)} state={this.props.state}/>
                    {output}
                </div>
            </div>
        )
    }
}