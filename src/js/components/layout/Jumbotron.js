import React from "react";

export default class Jumbotron extends React.Component{
    render(){
        return(
            <section className="topPage text-center">
                <div className="container">
                    <h1>{this.props.content}</h1>
                    <p>{this.props.explain}</p>
                </div>
            </section>
        )
    }
}