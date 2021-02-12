import React from "react";
import Title from "../layout/Title";
import Due from "./Due";
import DueTime from "./DueTime";
import QuestionAdmin from "./QuestionAdmin";
import Target from "./Target";
import SubmitButton from "./SubmitButton";

export default class Form extends React.Component{
    onClickFunction(){
        try{
            const title = document.getElementsByName("title")[0].value;
            var startDate = new Date(document.getElementsByName("startDate")[0].value);
            const startTime = document.getElementsByName("startTime")[0].value;
            startDate.setHours(startTime);
            var endDate = new Date(document.getElementsByName("endDate")[0].value);
            const endTime = document.getElementsByName("endTime")[0].value;
            endDate.setHours(endTime);

            if(title.length == 0){
                throw new Error("アンケートのタイトルが記入されていません");
            }
            if(startDate == "Invalid Date"){
                throw new Error("開始日が記入されていいません");
            }
            if(endDate == "Invalid Date"){
                throw new Error("終了日が記入されていいません");
            }
            if(startDate >= endDate){
                throw new Error("開始日よりも終了日を遅くしてください")
            }
            var form = document.getElementsByTagName("form")[0];
            var input = document.createElement("input");
            var json = JSON.stringify(this.props.question);
            input.setAttribute("name", "question");
            input.setAttribute("type", "hidden");
            input.setAttribute("value", json);
            form.setAttribute("action", "/questionnaire");
            form.setAttribute("method", "post");
            form.appendChild(input);
            form.submit();
        }catch(e){
            alert(e.message)
            return false;
        }
    }

    changeMode(mode, state){
        this.props.changeMode(mode, state);
    }

    render(){
        console.log(this.props.questionnaire);
        return(
            <form className="formPage justify-content-center" >
                <Title tag="title" title="タイトル" onChangeFunction={this.props.changeState.bind(this)} input={this.props.questionnaire.title}/>
                <Target content="対象学年" name="target" onChangeFunction={this.props.changeState.bind(this)} input={this.props.questionnaire.target}/>
                <Due content="開始日" name="startDate" onChangeFunction={this.props.changeState.bind(this)} input={this.props.questionnaire.startDate}/>
                <DueTime name="startTime"  content="開始時間" onChangeFunction={this.props.changeState.bind(this)} input={this.props.questionnaire.startTime}/>
                <Due content="終了日"  name="endDate" onChangeFunction={this.props.changeState.bind(this)} input={this.props.questionnaire.endDate}/>
                <DueTime name="endTime"  content="終了時間" onChangeFunction={this.props.changeState.bind(this)} input={this.props.questionnaire.endTime}/>
                <p>質問の追加</p>
                <QuestionAdmin deleteQuestion={this.props.deleteQuestion.bind(this)} changeMode={this.changeMode.bind(this)} question={this.props.question} count={this.props.count} state={this.props.questionnaire}/>
                <SubmitButton onClickFunction={this.onClickFunction.bind(this)} mode={this.props.button}/>
            </form>
        )
    }
}