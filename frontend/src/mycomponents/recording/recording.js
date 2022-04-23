import "./recording.css";
import React from 'react'
import { useRecordWebcam } from 'react-record-webcam'
import 'bootstrap/dist/css/bootstrap.css';
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from "axios";


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

  //--------------------Uploading----------------------------//
  const isUpload = {upload: true};
  const {upload = true} = isUpload;
  const [isupload, setIsUpload] = React.useState([upload]);

  const percentage = {uploadPer: 0};
  const {uploadPer = 0} = percentage;
  const [isUploadPercentage, setUploadPercentage] = React.useState([uploadPer]);
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

  //Upload data//  
    const uploadRecording = async ()=>{
        
        setIsUpload(false);

        const blob = await recordWebcam.getRecording(); 
        const formData = new FormData();
        formData.append('file', blob);
  //---------------------Progress bar--------------------------------//

        axios.post('http://127.0.0.1:8000/user/rec', 
        formData,
        {
          onUploadProgress : (progressEvent)=>{
            const {loaded, total} = progressEvent;
            let percent = Math.floor( (loaded * 100) / total )
            console.log( `${loaded}kb of ${total}kb | ${percent}%` );
            if( percent < 100 ){
              setUploadPercentage(percent)
            }
          }
        }
        ).then((res)=>{
          console.log("Response", res);
          setUploadPercentage(100)        
          setTimeout(() => {setUploadPercentage(0)}, 1000);
          window.location = '/submit';
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
          {
            isupload?<div className="instruction">{message}</div>
            :<div className="instructionUploading">Don’t close this window, your video is being uploaded!</div>
          }
          
          {
            isupload?<div className="timer">
            <p>{`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
            </div>
            :<div className="timerUploader">
             { isUploadPercentage > 0 && <ProgressBar variant="SOME_NAME" now={isUploadPercentage}  animated  active label={`${isUploadPercentage}%`} /> }
            </div>
          }
         
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
      </div>
  
      </div>
    );
}

export default Recording;

  //  <div class="progress">
  //     <div class="progress__fill"></div>
  //     <span class="progress__text">0%</span>
  //   </div> 