import "./recording.css";
import React from 'react'
import { useRecordWebcam } from 'react-record-webcam'


const Recording = () => {
   
  //--------------------Timer----------------------------//
    const hoursMinSecs = {minutes: 0, seconds: 3}
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
        recordingLength: 83,
        fileType: 'mp4',
        width: 415,
        height:215
    }

    const recordWebcam = useRecordWebcam(OPTIONS);

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

    const upload = (e) =>{
      console.warn(e.target.files)
      const files = e.target.files
      const formData = new FormData();
      formData.append('img', files[0]);
      fetch('http://127.0.0.1:8000/user/rec', {
        method: "POST",
        body:formData
      }).then((resp)=>{
        resp.json().then((result)=>{
          console.warn("result", result)
        })
      })
    }
 
    const saveFile = async () => {
      const blob = await recordWebcam.getRecording();
      // URL.createObjectURL(blob);

      // saveAs(blob,'Meet.mp4')
      console.log(blob);
    };
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
          <div className="uploadFile">
            <input type="file" onChange={(e)=> upload(e)} name="img"/>
          </div>
      <button onClick={recordWebcam.open}>Open camera</button>
      <button onClick={recordWebcam.start}>Start recording</button>
      <button onClick={recordWebcam.stop}>Stop recording</button>
      <button onClick={recordWebcam.download}>Download recording</button>
      <button onClick={saveFile}>Save file to server</button>
        </div>
        </div>
    );
}

export default Recording;
