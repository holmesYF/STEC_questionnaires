import React from "react";

export default class Table extends React.Component{
    onChangeFunction(){
        var target = document.getElementById("QuestionnairerUser").value;
        console.log(target);
        this.props.onChangeFunction(target);
    }

    render(){
        var data = this.props.data;
        var output = data.map(element => {
            console.log(element)
        });

        return(
            <div className="form-group">
                <select className="form-control" id="QuestionnairerUser" onChange={this.onChangeFunction.bind(this)}>
                    {output}
                </select>
            </div>
        )
    }
}