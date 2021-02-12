import React from "react";
import QBox from "./QBox";
import AddButton from "./AddButton";

export default class Top extends React.Component{
    constructor(){
        super();
        this.state = {
            question: {},
            error: null,
            isLoading: false,
        };
    }

    deleteFunction(id){
        if(confirm("本当に消去しますか？")){
            var url = "/ajax/Questionnaire?";
            url += "id=" + id;
            fetch(url,{
                method: "delete"
            })
            .then(res=>{
                if(res.ok){
                    console.log("delete!");
                    window.location.reload();
                }
            })
            .catch(error=>{
                console.log(error.message)
            })  
        }
    }

    detailFunction(param){
        this.changeMode("detail", param);
    }

    changeMode(mode_, param){
        this.props.changeMode(mode_, param);
    }

    //アンケートに学年テーブルごと入っているので、データを整形
    setTarget(question, grade){
        const target = Object.keys(grade).map(key=>{
            return grade[key].grade;
        })
        delete question.Grades;
        question["target"] = target;
        question["question"] = JSON.parse(question.question)
        return question;
    }

    //開始日と終了日のデータの整形
    setTimeAndDate(question){
        console.log(question);
        var start = question.startDate.split("T");
        var startDate = start[0];
        var startTime = start[1].split(":")[0]
        var end = question.endDate.split("T");
        var endDate = end[0];
        var endTime = end[1].split(":")[0];

        question["startDate"] = startDate;
        question["startTime"] = startTime;
        question["endDate"] = endDate;
        question["endTime"] = endTime;

        return question;
    }

    componentDidMount(){
        this.setState({ isLoading : true });

        fetch("/ajax/Questionnaires", {method: "get"})
        .then(res=> res.json())
        .then((questions)=>{
            for(var i=0; i<questions.length; i++){
                var question = questions[i];
                var grade = question.Grades;
                questions[i] = this.setTarget(question, grade);
                question[i] = this.setTimeAndDate(question);
            }
            this.setState({
                question:questions,
                isLoading: false
            });
        })
        .catch(error=>{
            this.setState({
                error,
                isLoading: false
            })
        })
    }

    render(){
        const { error, isLoading, question } = this.state;
        if(error){
            return(<p>{error.message}</p>)
        }else if(isLoading){
            return(<p>Loading...</p>)
        }

        var output = [];
            if(this.props.sortBy == "new"){
                for(var i=0; i<question.length; i++){
                    const questionnaire = question[i]
                    output.unshift(<div className="col-lg-4 col-sm-12 ">
                                    <QBox deleteFunction={this.deleteFunction.bind(this)} changeMode={this.changeMode.bind(this)} detailFunction={this.detailFunction.bind(this)} questionnaire={questionnaire}/>
                                </div>
                                );
                }
            }

            if(this.props.sortBy == "old"){
                for(var i=0; i<question.length; i++){
                const questionnaire = question[i]
                output.push(<div className="col-lg-4 col-sm-12 ">
                                <QBox deleteFunction={this.deleteFunction.bind(this)} changeMode={this.changeMode.bind(this)} detailFunction={this.detailFunction.bind(this)} questionnaire={questionnaire}/>
                            </div>
                            );
                }
            }
        
        return (
            <div className="questionsArea bg-light">
                <div className="container">
                    <div className="row align-items-center">
                        <AddButton changeMode={this.changeMode.bind(this)}/>
                        {output}
                    </div>
                </div>
            </div>
        );
    }
}