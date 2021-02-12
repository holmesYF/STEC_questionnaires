import React from "react";

export default class Terms2 extends React.Component{
    render(){
        var option = [];
        this.props.option.forEach(element => {
            option.push(<option>{element}</option>);
        });

        return(
            <div className="form-group">
                <div className="row justify-content-end">
                    <div className="col-sm-2">
                        <label className="control-label">対象の<br></br>選択肢</label>
                    </div>
                    <div className="col-sm-10">
                        <select className="form-control">
                            {option}
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}