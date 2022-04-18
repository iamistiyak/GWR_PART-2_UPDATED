import "./recording.css";
import React from 'react'



const Recording = () => {
   
     const hoursMinSecs = {minutes: 0, seconds: 20}
    const { minutes = 0, seconds = 0 } = hoursMinSecs;
    const [[ mins, secs], setTime] = React.useState([minutes, seconds]);
    
    // const [[ cont1], setCont] = React.useState([content]);
    
    const tick = () => {
   
        if ( mins === 0 && secs === 0) 
        reset()
       else if (secs === 0) {
        setTime([mins - 1, 59]);
       } else {
        setTime([mins, secs - 1]);
       }
    };
    // const content = () => {
   
        
    //   if (secs === 0) {
    //     setTime([mins - 1, 59]);
    //    } else {
    //     setTime([mins, secs - 1]);
    //    }
    // };



    // const reset = () => setTime([parseInt(minutes), parseInt(seconds)]);
    const reset = () => "";


    
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    
    // React.useEffect(() => {
    //     const contentTimerid = setInterval(() => content(), 20000);
    //     return () => clearInterval(contentTimerid);
    // });
    
    
    return (
        <div className="recordingMain">
        <div className="logoRecording">
          <img
            src={require("../image/gwr_logo.png")}
            alt="img"
            className="img-responsive"
            width={"120px"}
            height={"120px"}
          />
        </div>
        <div className="containerRecording">
          <div className="instruction">Show your brush</div>
          <div className="timer">
          <p>{`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
          </div>
          <div className="videoFrameBackground">
          <div className="mainVideoCorner">
            <div className="upperVideoCorner">
              <div className="upperVideoLeftCorner"></div>
              <div className="upperVideoRightCorner"></div>
            </div>
            <div className="videoFrame"></div>
            <div className="bottomVideoCorner">
              <div className="bottomVideoLeftCorner"></div>
              <div className="bottomVideoRightCorner"></div>
            </div>
          </div>
          </div>
        </div>
        </div>
    );
}

export default Recording;
