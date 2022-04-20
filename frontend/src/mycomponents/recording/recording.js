import "./recording.css";
import React from 'react'
import { useRecordWebcam } from 'react-record-webcam'


const Recording = () => {
   
  //--------------------Timer----------------------------//
    const hoursMinSecs = {minutes: 0, seconds: 10}
    const { minutes = 0, seconds = 3 } = hoursMinSecs;
    const [[ mins, secs], setTime] = React.useState([minutes, seconds]);

    const message1 = {msg: "Show your brush"};
    const { msg = ""} = message1;
    const [message, setMessage] = React.useState([msg]);
   
    const isLast1 = {last: true};
    const { last = true} = isLast1;
    const [islast1, setIsLast1] = React.useState([last]);
    
  //--------------------Recorder----------------------------//
    const date = new Date().toLocaleString() + "user_name"
    const OPTIONS = { 
        filename: date,
        fileType: 'mp4',
        width: 415,
        height:215
    }

    const recordWebcam = useRecordWebcam(OPTIONS);

//----------------------Timer------------------------------------//    
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
    

  //------------------------------Ontap on button for recording start to stop------------------------------------------//
    window.onload=function(){
      var oc = document.getElementById("openCamera");
      oc.click()

      var sc = document.getElementById("startCamera");
      setTimeout( function() {sc.click()}, 3000);

      var cc = document.getElementById("closeCamera");
      setTimeout( function() {cc.click()}, 95000);

      var ur = document.getElementById("uploadRecording");
      setTimeout( function() {ur.click()}, 96000);
    }
    const openCamera =  ()=>{
      console.log("Open camera");
      recordWebcam.open()
    }
  
    const startCamera = ()=>{
      recordWebcam.start()
      console.log("Start Camera");
    }

    const closeCamera = ()=>{
      console.log("Close Camera");
      recordWebcam.stop()
    }

    const uploadRecording = async ()=>{

      const blob = await recordWebcam.getRecording(); 
      const formData = new FormData();
      formData.append('file', blob);
      fetch('http://127.0.0.1:8000/user/rec', {
        method: "POST",
        body:formData
      }).then((resp)=>{
        resp.json().then((result)=>{
          console.warn("result", result)
        })
      })
      console.log("Recording uploaded");
    }
 
    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    return (
        <div className="recordingMain">
        <p>Camera status: {recordWebcam.status}</p>
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
            <div className="videoFrame">
            <video ref={recordWebcam.webcamRef} autoPlay muted />
            </div>
            <div className="bottomVideoCorner">
              <div className="bottomVideoLeftCorner"></div>
              <div className="bottomVideoRightCorner"></div>
            </div>
          </div>
          </div>
      <button id="openCamera" onClick={openCamera} hidden>Open camera</button>
      <button id="startCamera" onClick={startCamera} hidden>Start recording</button>
      <button id="closeCamera" onClick={closeCamera} hidden>Stop recording</button>
      <button id="uploadRecording" onClick={uploadRecording} hidden>Save file to server</button>
      {/* <button onClick={recordWebcam.download} hidden>Download recording</button> */}
      </div>
      </div>
    );
}

export default Recording;
