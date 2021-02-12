import React from "react";
import Terms1 from "./Terms1";
import Terms2 from "./Terms2";

export default class TermsAdmin extends React.Component{
    constructor(){
        super();
        this.state = {
            terms: false,
            termsID: null,
            termsExist: false
        };
    }

    changeState(termsID){
        if(!this.props.question[termsID]){
            var termsExist = false;
        }else{
            var termsExist = true;
        }
        this.setState({
            termsID,
            termsExist
         })
    }

    onClickFunction(){
        var terms = document.getElementsByClassName("radioTerms");
        for(var i=0; i<terms.length; i++){
            if(terms[i].checked){
                const temp = terms[i].value;
                if(temp == "true"){
                    console.log("ture");
                    var param = true;
                }else{
                    console.log("false");
                    var param = false;
                }
                this.setState({terms: param})
                this.props.onClickFunction(param)
            }
        }
    }

    selectTerms(question){
        var option2 = [];
        const termsID = this.state.termsID;
        if(this.state.termsExist){
            for(var i in question[termsID].option){
                option2.push(question[termsID].option[i]);
            }
        }
        return option2;

    }

    render(){
        var option1 = {};
        const question = this.props.question;
        for(var num in question){
            option1[num] = question[num].title;
        }
        const option2 = this.selectTerms(question);

        switch(this.state.terms){
            case(true):
                var output = [
                    <Terms1 option={option1} changeState={this.changeState.bind(this)}/>,
                    <Terms2 comment="を選択した場合" option={option2}/>
                ]
                break

                case(false):
                    var output = []
                    break
            }
                return(
                    <div className="form-group">
                        <div className="row">
                            <legend className="col-form-label col-sm-2 pt-0">条件</legend>
                                <div className="col-sm-10">
                                    <div className="form-check">
                                        <input id="radioTrue" type="radio" name="gridRadios" onClick={this.onClickFunction.bind(this)} className="form-check-input radioTerms" value={true}></input>
                                        <label htmlFor="radioTrue" className="form-check-label" >条件を指定する</label>
                                    </div>
                                    <div className="form-check">
                                        <input id="radioFalse" type="radio" name="gridRadios" onClick={this.onClickFunction.bind(this)} className="form-check-input radioTerms" defaultChecked={true} value={false}></input>
                                        <label htmlFor="radioFalse" className="form-check-label ">条件を指定しない</label>
                                    </div>
                                </div>
                        </div>
                        {output}
                    </div>
                )
        
        
    }
}