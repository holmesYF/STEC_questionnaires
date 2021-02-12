import React from "react";
import Atab from "./Atab";

export default class Navbar extends React.Component{
    onClickFunction(){
        this.props.changeMode("top");
    }

    render(){
        return(
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand" onClick={this.onClickFunction.bind(this)}>STEC</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Atab mode="top" content="トップ" changeMode={this.props.changeMode.bind(this)}></Atab>
                        </li>
                        <li className="nav-item">
                            <Atab mode="analysis" content="分析" changeMode={this.props.changeMode.bind(this)}></Atab>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
