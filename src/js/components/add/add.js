import React from "react";
import Jumbotron from "../layout/Jumbotron";
import Form from "./form";
import QuestionAdd from "./QuestionAdd/QuestionAdd";

export default class Add extends React.Component{
    constructor(){
        super();
        this.state = {
            mode:"add",
            question:{},
            questionnaire: {
                title: "",
                target:"",
                startDate: "",
                startTime: "",
                endDate: "",
                endTime: ""
            }
        };
    }

    changeState(param, value){
        const copy = Object.assign({}, this.state.questionnaire)
        copy[param] = value;
        this.setState({questionnaire: copy});
    }

    changeMode(mode, state){
        this.setState({mode, state});
    }

    changeMode_(mode){
        this.setState({mode});
    }

    setQuestion(param){
        var question = this.state.question;
        const count = Object.keys(question).length;
        question[count] = param;
        this.setState({question});
    }

    onClickFunction(mode, param){
        this.setQuestion(param);
        this.changeMode_(mode);
    }

    back(){
        this.setState({mode:"add"});
    }

    deleteQuestion(count){
        var index = count - 1;
        const questions = this.state.question;
        console.log(questions);

        var num = Object.keys(questions).length - 1;
        var question = Object.assign({}, this.state.question)
        delete question[index];
        var newQuestion = {};
        var values = Object.values(question);
        for(var i=0; i<num;i++){
            newQuestion[i] = values[i];
        }
        this.setState({
            question: newQuestion
        })
    }

    render(){        
        switch(this.state.mode){
            case("add"):
                var text = <p>追加した質問はダブルクリックすると消すことができます</p>
                var explain = [text];
                return(
                    <div className="container">
                        <Jumbotron content="アンケートの追加" explain={explain}/>
                        <Form deleteQuestion={this.deleteQuestion.bind(this)} changeMode={this.changeMode.bind(this)} button="add" changeState={this.changeState.bind(this)} question={this.state.question} questionnaire = {this.state.questionnaire}/>
                    </div>
                )
            case("questionAdd"):
                var backButton = <button onClick={this.back.bind(this)} className="btn btn-outline-info">戻る</button>;
                var explain = [backButton]
                return(
                    <div className="container">
                        <Jumbotron content="質問の追加" back={this.back.bind(this)} explain={explain}/>
                        <QuestionAdd onClickFunction={this.onClickFunction.bind(this)} question={this.state.question}/>
                    </div>
                )
        }
        
    }
}