import React from 'react'
import { useRecordWebcam } from 'react-record-webcam'
import { saveAs } from 'file-saver';


const ImportedWebCam = () => {
    const date = new Date().toLocaleString() + "user_name"
    const OPTIONS = { 
        filename: date,
        recordingLength: 83,
        fileType: 'mp4',
        width: 415,
        height:215
    }

    const recordWebcam = useRecordWebcam(OPTIONS);

    const saveFile = async () => {
        const blob = await recordWebcam.getRecording();
        URL.createObjectURL(blob);

        saveAs(blob,'Meet.mp4')
        //console.log(blob);
      
      };

    return (
    <div className="imporetdWebCamMain">
     <p>Camera status: {recordWebcam.status}</p>
      <button onClick={recordWebcam.open}>Open camera</button>
      <button onClick={recordWebcam.start}>Start recording</button>
      <button onClick={recordWebcam.stop}>Stop recording</button>
      <button onClick={recordWebcam.retake}>Retake recording</button>
      <button onClick={recordWebcam.download}>Download recording</button>
      <button onClick={saveFile}>Save file to server</button>
      <video ref={recordWebcam.webcamRef} autoPlay muted />
      <video ref={recordWebcam.previewRef} autoPlay muted loop />
      <video id="video" width="200" height="200" controls />
    </div>
    );
}

export default ImportedWebCam;

