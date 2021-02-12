import React from "react";

export default class Terms1 extends React.Component{
    onChangeFunction(){
        const select = document.getElementsByTagName("select")[0].value;
        this.props.changeState(select);
    }

    render(){
        var output = [];
        var option = this.props.option;
        for(var num in option){
            output.push(<option value={num}>{option[num]}</option>)
        }

        return(
            <div className="form-group">
                <div className="row justify-content-end">
                    <div className="col-sm-2">
                        <label className="control-label">対象の<br></br>アンケート</label>
                    </div>
                    <div className="col-sm-10">
                        <select className="form-control" onClick={this.onChangeFunction.bind(this)} onChange={this.onChangeFunction.bind(this)}>
                            {output}
                        </select>
                    </div>
                </div>
                <p>{this.props.comment}</p>
            </div>
        )
    }
}