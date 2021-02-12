import React from "react";
import CardDue from "./CardDue";
import DeleteButton from "./DeleteButton";
import DetailButton from "./DetailButton";
import DownloadButton from "./DownloadButton";

export default class QBox extends React.Component{
    deleteFunction(){
        const id = this.props.questionnaire.id;
        this.props.deleteFunction(id);
    }

    detailFunction(){
        const questionnaire = this.props.questionnaire;
        this.props.detailFunction(questionnaire)
    }

    render(){
        var questionnaire = this.props.questionnaire;
        const title = questionnaire.title;
        const participants = 10;
        var start = questionnaire.startDate
        var end = questionnaire.endDate
        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <CardDue start={start} end={end}/>
                    <p className="card-text">参加者：{participants}</p>
                </div>
                <div className="row justify-content-end">
                    <DownloadButton/>
                    <DeleteButton onClickFunction={this.deleteFunction.bind(this)}/>
                    <DetailButton onClickFunction={this.detailFunction.bind(this)} />
                </div>
            </div>
        )
    }
}