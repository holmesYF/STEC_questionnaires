import React from "react";

export default class Table extends React.Component{
    onChangeFunction(){
        var target = document.getElementById("QuestionnairerUser").value;
        console.log(target);
        this.props.onChangeFunction(target);
    }

    render(){
        return(
            <div className="form-group">
                <select className="form-control" id="QuestionnairerUser" onChange={this.onChangeFunction.bind(this)}>
                    <option value="questionnaire">アンケート</option>
                    <option value="user">ユーザー</option>
                </select>
            </div>
        )
    }
}