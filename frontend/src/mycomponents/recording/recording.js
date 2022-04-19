import "./recording.css";
import React from 'react'



const Recording = () => {
   
     const hoursMinSecs = {minutes: 0, seconds: 3}
    const { minutes = 0, seconds = 3 } = hoursMinSecs;
    const [[ mins, secs], setTime] = React.useState([minutes, seconds]);


    const message1 = {msg: "Show your brush"};
    const { msg = ""} = message1;
    const [message, setMessage] = React.useState([msg]);
   
    const isLast1 = {last: true};
    const { last = true} = isLast1;
    const [islast1, setIsLast1] = React.useState([last]);
    
    const tick = () => {
   
       if ( mins === 0 && secs === 0) 
        reset()
       else if (secs === 0) {
        setTime([mins - 1, 59]);
       } 
       else {
        setTime([mins, secs - 1]);
       }
    };
 
    const reset = () =>{
      if(islast1){
        resetAgain()  
      }
      else if(islast1 ===""){
        
      }
      else{
        resetAgainAgain()
      }
    };

    const resetAgain = () =>{
      setTime([parseInt(1), parseInt(0)]);
      setMessage("Brush your teeth");
      setIsLast1(false);
    };
    const resetAgainAgain = () =>{
      setTime([parseInt(0), parseInt(20)]);
      setMessage("Rinse your mouth");
      setIsLast1("")
    };

    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    
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
          <div className="instruction">{message}</div>
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
