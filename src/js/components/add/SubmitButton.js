import React from "react";

export default class SubmitButton extends React.Component{
    render(){
        switch(this.props.mode){
            case("add"):
                var output = [
                    <button className="btn btn-primary btn-block col-12" type="button" onClick={this.props.onClickFunction.bind(this)} formAction="/questionnaire/submit" formMethod="post">下書き作成</button>
                    ]
                break

            case("detail"):
             var output = [
                    <button className="btn btn-primary btn-block col-12" type="button" onClick={this.props.onClickFunction.bind(this)} formAction="/questionnaire/submit" formMethod="post">下書き編集</button>
             ]
             break
        }
        return(
            <div>
            {output}
            </div>
        )
    }
}