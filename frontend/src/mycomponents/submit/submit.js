import "./submit.css";
import { React } from "react";

import { Component } from "react"

class Submit extends Component {
  render(){
    return (
      <div className="mainSubmit">
        <div className="submitLogo">
          <img
            src={require("../image/gwr_logo.png")}
            alt="img"
            className="img-responsive"
            width={"120px"}
            height={"120px"}
          />
        </div>
        <div className="containerSubmit">
         <div className="message1">Thanks for participating!</div>
         <div className="message2">Your response has been submitted successfully.</div>
         
        </div>
      </div>
    );
  }
  
  }
  
export default Submit;
