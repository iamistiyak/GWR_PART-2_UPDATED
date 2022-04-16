import "./timeline.css";
import { React } from "react";

import { Component } from "react"



class Timeline extends Component {

    
  render(){
    return (
      <div className="mainTimeline">
        <div className="timelineLogo">
          <img
            src={require("../image/gwr_logo.png")}
            alt="img"
            className="img-responsive"
            width={"120px"}
            height={"120px"}
          />
        </div>
        <div className="containerTimeline">
          <div className="success">Registered successfully!</div>
          <div className="prepare">Prepare with your brush</div>
          <div className="outside">
          <hr className="horizontalLine"></hr>
           <div className="floatContainer inside">
            <div className="timelineContainer">
                <div class="circle">01</div> 
                <div class="circleBelow">Show your brush</div> 
                <div class="time">03 seconds</div> 
              </div>
              <div className="timelineContainer">
                <div class="circle">02</div> 
                <div class="circleBelow">Brush your teeth</div> 
                <div class="time">01 minute</div> 
              </div>
              <div className="timelineContainer">
                <div class="circle">03</div> 
                <div class="circleBelow">Rinse your mouth</div> 
                <div class="time">20 seconds</div> 
              </div>
           </div>
          </div>
          <button className="timelineButton">Start Recording</button>
        </div>
      </div>
    );
  }
  
  }
  
export default Timeline;
