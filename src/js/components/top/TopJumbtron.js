import React from "react";
import Jumbotron from "../layout/Jumbotron"

export default class TopJumbotron extends React.Component{
    render(){
        var explain = [
            <form>
              <div className="justify-content-end row">
              <input className="form-control top-search" type="search" placeholder="Search" name="search"/>
              <button className="btn btn-outline-secondary" type="button" onClick={this.props.searchQuestionnaire.bind(this)}>検索</button>
              </div>
            </form>,
            <div className="justify-content-end row">
            <select className="form-control top-order" name="order" onChange={this.props.changeOrder.bind(this)}>
                <option value="new">new</option>
                <option value="old">old</option>
            </select>
            </div>
          ];
        return(
            <Jumbotron content={"アンケートの管理"} explain={explain}/>
        )
    }
}