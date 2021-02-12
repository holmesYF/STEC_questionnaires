import React from "react";
import Table from "./Table";
import QuestionnaireOrUser from "./QuestionnaireOrUser";
import Target from "./Target";

export default class Analysis extends React.Component{
    constructor(){
        super();
        this.state = {
            mode: "questionnaire",
            data: []
        }
    }

    componentDidMount(){
        switch(this.state.mode){
            case("questionnaire"):
                var url = "/ajax/Questionnaires";
                break

            case("user"):
                var url = "ajax/Users";
                break
        }
        fetch(url, {method: "get"})
        .then(res=> res.json())
        .then(data => {
            //this.setState({data});
        })
    }

    componentDidUpdate(props, prevState){
        
    }

    QuestionnaireOrUserFunction(target){
        const presentState = this.state.mode;
        console.log(presentState);
        if(presentState !== target){
            switch(presentState){
                case("questionnaire"):
                    var url = "/ajax/Questionnaires";
                    break
    
                case("user"):
                    var url = "ajax/Users";
                    break
            }
            fetch(url, {method: "get"})
            .then(res=> res.json())
            .then(data => {
                this.setState({data, mode:target});
            })
        }
    }

    render(){
        return(
            <div className="container">
                <section className="topPage text-center">
                <div className="container">
                    <h1>アンケート結果の分析ページ</h1>
                    <div className="row">
                        <QuestionnaireOrUser onChangeFunction={this.QuestionnaireOrUserFunction.bind(this)}/>
                        <Target data={this.state.data}/>
                    </div>
                </div>
            </section>
                <Table/>
            </div>
        )
    }
}