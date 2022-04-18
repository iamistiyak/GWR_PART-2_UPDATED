import React from 'react'
import './index_recorder.css'
const IndexRecording = () => {
    
    const HEIGHT = 500;
	const WIDTH = 500;

    let video_local = null
    let camera_stream = null;
    let media_recorder = null;
    let blobs_recorded = [];
    let video = document.getElementsByClassName('videoFrame');
    let download_link = document.getElementsByClassName('downloadLink');

    const startCamera = async ()=>{
        camera_stream =  await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        video.srcObject = camera_stream;
        console.log(video.srcObject)
    }

    const startRecording = ()=>{
        console.log("START REC1000")
        // set MIME type of recording as video/webm
        media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });
        console.log("START REC1")

        // event : new recorded video blob available 
        media_recorder.addEventListener('dataavailable', function(e) {
            blobs_recorded.push(e.data);
            console.log("START REC2")
        });             

        // event : recording stopped & all blobs sent
        media_recorder.addEventListener('stop', function() {

            // create local object URL from the recorded video blobs
            video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/webm' }));
            download_link.href = video_local;
        });

        // start recording with each recorded blob having 1 second video
        media_recorder.start(1000);
        console.log("start")
    }

    const stopRecording = ()=>{
        media_recorder.stop(); 
    }
   
    return (
        <div className="indexMain">
        <button className="startCamera" id="start-camera" onClick={startCamera}>Start Camera</button>
        <div className="app__container">
				<video
					height={HEIGHT}
					width={WIDTH}
					muted
					autoPlay
					className="videoFrame"
				></video>
			</div>
        <button className="startRecording" id="start-record"  onClick={startRecording}>Start Recording</button>
        <button className="stopRecording" id="stop-record"  onClick={stopRecording}>Stop Recording</button>
        <a href= "" className="downloadLink" id="download-video" download="test.webm">Download Video</a>
        </div>
    );
}

export default IndexRecording;




