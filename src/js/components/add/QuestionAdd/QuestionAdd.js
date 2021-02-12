import React from "react";
import Option from "./Option";
import Title from "../../layout/Title";
//import TermsAdmin from "./TermsAdmin";
import MultiOption from "./MultiOption";
import FreeAnswer from "./FreeAnswer";

export default class QuestionAdd extends React.Component{
    constructor(){
        super();
        this.state = {
            isFreeAnswer: false,
            //isNeededterms: false
        }
    }
    onClickFunction(){
        var inputs = document.getElementsByClassName("paramInput");
        //var selects = document.getElementsByTagName("select");
        try{
            if(inputs[0].value.length == 0){
                console.log(1)
                throw new Error("タイトルが記入されていません")
            }

            // 「条件付き」で必要
            // if(selects[0]){
            //     console.log(2)
            //     if(selects[0].value === void 0){
            //         throw new Error("条件が何も選択されていません")
            //     }
            // }

            for(var i=0; i<inputs.length; i++){
                console.log(3)
                if(inputs[i].value.length == 0){
                    throw new Error("記入されていない選択肢があります")
                }
            }
            console.log(4)
            this.setOption(inputs);
            //this.setOption(inputs, selects);
        }
        catch(e){
            alert(e);
        }
    }

    //setOption(inputs, selects){
    setOption(inputs){
        //リファクタリングの余地大いに有り
        var param = {};
        var option = {};
        //var terms = {};
        param.title = inputs[0].value;
        //param.existTerms = this.state.isNeededterms;
        param.isFreeAnswer = this.state.isFreeAnswer;
        console.log(5)
        //console.log(this.state.isNeededterms)
        console.log(typeof(this.state.isNeededterms))
        // if(this.state.isNeededterms){
        //     console.log("hello")
        //     terms["Question"] = parseInt(selects[0].value);
        //     terms["Option"] = selects[1].value;
        //     param["terms"] = terms;
        // }
        
        if(!this.state.isFreeAnswer){
            param.multiOption = inputs[1].checked;
            console.log(9)
            const num = inputs.length;
            console.log(num)
            for(var i=2; i<num; i++){
                console.log(inputs[i])
                var index = i -1;
                option[index] =  inputs[i].value;
            }
            param.option = option;
        }
        this.props.onClickFunction("add", param);
    }

    FreeAnswerFunction(param){
        this.setState({isFreeAnswer: param})
    }

    // TermsAdminFunction(param){
    //     this.setState({isNeededterms: param})
    // }

    render(){
        var question = this.props.question
        console.log(question)
        var content = [];
        if(!this.state.isFreeAnswer){
            content.push(
                <MultiOption content="複数選択"/>,
                <Option content="選択肢"/>
            )
        }
        console.log(this.state.isNeededterms)
        return(
            <div className="form formPage">
                <Title title="質問内容"/>
                {/*<TermsAdmin question={question} onClickFunction={this.TermsAdminFunction.bind(this)}/>*/}
                <FreeAnswer onClickFunction={this.FreeAnswerFunction.bind(this)}/>
                {content}
                <button className="btn btn-primary btn-block col-12" onClick={this.onClickFunction.bind(this)}>登録！</button>
            </div>
        )
    }
}