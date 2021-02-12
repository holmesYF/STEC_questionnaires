import ReactDOM from "react-dom";
import React from "react";
import Navbar from "./components/layout/navbar";
import Top from "./components/top/top";
import Detail from "./components/detail/detail";
import Add from "./components/add/add";
import Analysis from "./components/analysis/analysis";
import TopJumbotron from "./components/top/TopJumbtron";
import 'bootstrap/dist/css/bootstrap.min.css';

class Content extends React.Component{
  constructor(){
    super();
    this.state = {
      mode:"top",
      sortBy:"new",
      questionnaire: false,
    }
  }

  setQuestion(){
    this.setState({question});
  }

  changeMode(mode_, questionnaire=false){
    this.setState({
      mode:mode_,
      questionnaire
    })
  }

searchQuestionnaire(){
  var key = document.getElementsByName("search")[0].value;
  var cards = document.getElementsByClassName("card");
  for(var index in cards){
    var card = cards[index];
    if(card.firstChild.firstChild.innerHTML == key){
      card.style.background = "#7fffd4";
    }
  }
  alert("")
}

changeOrder(){
  var key = document.getElementsByName("order")[0].value;
  this.setState({sortBy:key})
}

  render(){
    switch(this.state.mode){
      case("top"):
        return(
          <div>
            <header>
              <Navbar changeMode={this.changeMode.bind(this)}/>
            </header>
            <TopJumbotron searchQuestionnaire={this.searchQuestionnaire.bind(this)} changeOrder={this.changeOrder.bind(this)}/>
            <Top changeMode={this.changeMode.bind(this)} setQuestion={this.setQuestion.bind(this)} sortBy={this.state.sortBy}/>
          </div>
        )
      
      case("detail"):
        return(
          <div>
            <header>
              <Navbar changeMode={this.changeMode.bind(this)}/>
            </header>
              <Detail questionnaire={this.state.questionnaire} changeMode={this.changeMode.bind(this)}/>
          </div>
         )

        case("add"):
          return(
            <div>
              <header>
                <Navbar changeMode={this.changeMode.bind(this)}/>
              </header>
                <Add changeMode={this.changeMode.bind(this)}/>
            </div>
         )

         case("analysis"):
          return(
            <div>
              <header>
                <Navbar changeMode={this.changeMode.bind(this)}/>
              </header>
              <Analysis/>
            </div>
        )
    }
  }
}

const content = document.getElementById("content");
ReactDOM.render(<Content />, content);