import React from "react";

export default class MultiOption extends React.Component{
    onClickFunction(){
        const input = document.getElementById("MultiOption")
        this.props.onClickFunction(input.checked)
    }
    render(){
        return(
            <div className="form-group">
                <div className="row justify-content-end">
                    <div className="col-sm-2">
                        <label htmlFor="MultiOption">複数選択を許容しますか？</label>
                    </div>
                    <div className="col-sm-10">
                        <input type="checkbox" className="form-group paramInput" id="MultiOption"/>
                    </div>
                </div>
            </div>
        )
    }
}