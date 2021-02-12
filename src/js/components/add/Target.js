import React from "react";

export default class Target extends React.Component{
    onChangeFunction(e){
        var target = document.getElementsByName("target");
        var content = [];
        for(var i=0; i<target.length; i++){
            console.log(target[i].checked)
            if(target[i].checked){
                content.push(target[i].value)
            }
        }
        const tag = this.props.name;
        this.props.onChangeFunction(tag, content);
    }

    render(){
        var option = {b1:"学科1年",b2:"学科2年",b3:"学科3年",b4:"学科4年",m1:"修士1年",m2:"修士2年",d1:"博士1年",d2:"博士2年",d3:"博士3年",d4:"博士4年"};
        var target = this.props.input;
        var output = Object.keys(option).map(value => {
            if(target.includes(value)){
                return <div className="form-check">
                        <label className="" htmlFor={value}>{option[value]}</label>
                        <input className="" type="checkbox" id={value} name="target" checked value={value} onClick={this.onChangeFunction.bind(this)}/>
                        </div>
            }else{
                return <div className="form-check">
                        <label className="" htmlFor={value}>{option[value]}</label>
                        <input className="" id={value} type="checkbox" name="target"  value={value} onClick={this.onChangeFunction.bind(this)}/>
                        </div>
            }
            
        })
        return(
            <div className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">
                        対象学年
                    </legend>
                    <div className="col-sm-10 ">
                        {output}
                    </div>
                </div>
            </div>
        )
    }
}