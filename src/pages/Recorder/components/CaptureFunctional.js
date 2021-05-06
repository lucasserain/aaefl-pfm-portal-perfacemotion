import React, {useState, useEffect, useRef} from 'react';
import ButtonGroup from './ButtonGroup';
import { useDispatch, useSelector } from "react-redux";
import {updateSettings, addImage, removeImage, deleteAll, setStream} from '../actions';
import ImageContainer from './ImageContainer';
import {saveAs} from 'save-as';
import {
    VideoCameraOutlined,
    LoadingOutlined,
    VideoCameraAddOutlined
} from '@ant-design/icons';
var JSZip = require("jszip");

const CaptureFunctional = () =>{

    const settings = useSelector(state => state.settings);
    const stream = useSelector(state => state.stream);
    const images = useSelector(state => state.images);
    const videos = useSelector(state => state.videos);
    const dispatch = useDispatch();

    const {burst, burstRate, enableFeed, format} = settings;

    const interval = useRef(null);
    const [showScreenshot, setShowScreenshot] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    useEffect(()=>{
        if (enableFeed){
            hasGetUserMedia()
        } else {
            onCutFeed()
        }
    },[enableFeed])

    useEffect(()=>{
        if (showScreenshot){
            var img = document.querySelector('#tempImg')
            var video = document.querySelector('#video')
            var canvas = document.createElement('canvas')
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            var dataUrl = canvas.toDataURL('image/png');
            img.src = dataUrl
            dispatch(addImage(dataUrl))
        }
    }, [showScreenshot])

    useEffect(()=>{

    }, [interval])

     const hasGetUserMedia = () => {
        if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia){
            alert('Unable to enable camera.')
        } else {
            navigator.getUserMedia({video: true}, handleVideo, (e)=>console.log(e));
        }
    }

    const handleVideo = (stream) => {
        dispatch(setStream(stream))
        var video = document.querySelector("video");
        video.srcObject = stream
    }

    const onScreenshot = () => {
        setShowScreenshot(true)
        setTimeout(()=>{
            setShowScreenshot(false)
        }, burstRate * 1000)
    }

    const handleRemoveImage = (img) =>{
        dispatch(removeImage(img))
    }

    const onVideo1 = () =>{
        var video = document.querySelector('video')
        video.captureStream = video.captureStream || video.mozCaptureStream;
        return new Promise(resolve => video.onplaying = resolve)
        .then(()=>onVideo2(video.captureStream))
        .then(chunks=>{
            let recordedBlob = new Blob(chunks, { type: "video/webm" });
            var video = URL.createObjectURL(recordedBlob)
            setVideos(video, true)
        })
    };

    const onVideo2 = (boi) =>{
        setIsRecording(true)
        let recorder = new MediaRecorder(boi);
        let data = [];

        recorder.ondataavailable = event => data.push(event.data);
        recorder.start();

        let stopped = new Promise((resolve, reject) => {
            recorder.onstop = resolve;
            recorder.onerror = event => reject(event.name);
        });

        let recorded = getProm().then(
            () => recorder.state === "recording" && recorder.stop()
        );

        return Promise.all([
            stopped,
            recorded
        ])
        .then(() => data);
    };

    const getProm = () =>{
        return new Promise(resolve => resolve)
    };

    const setVideos = (a, b) =>{
        // var {videos} = this.state
        // if (b){
        //     videos.push(a)
        // } else {
        //     videos = videos.filter(x=>x !== a)
        // }
        // this.setState({videos})
    }

    const endVideo = () =>{
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false)
        hasGetUserMedia()
    }

    const onDownload = (x) => {
        if (x){
            handleDownload(x, 'react-photobooth-image' + format)
        } else if (images.length > 1){
            var zip = new JSZip();
            var img = zip.folder("photobooth-images");
            images.forEach((x, i)=>{
                var content = x.split("base64,")[1]
                img.file("image" + i + format, content, {base64: true})
            })
            zip.generateAsync({type:"blob"})
            .then(function(content) {
                saveAs(content, "react-photobooth-images.zip")
            });
        } else {
            handleDownload(images[0], 'react-photobooth-image' + format)
        }
    };

    const handleDownload = (data, name) => {
        var download = document.createElement('a');
        download.href = data
        download.download = name
        download.style.display = 'none';
        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);
    };

    const deleteAllMedia = () =>{
        dispatch(deleteAll())
    }

    const onBurst = () =>{
        var count = 0
        interval.current = setInterval(() => {
            onScreenshot()
            count++
            if (count > burst){
                clearInterval(interval.current);
            }
       }, burstRate * 1000)
    }

    const onCutFeed = () =>{
        var video = document.querySelector("video");
        dispatch(setStream(null))
        if (video.srcObject){
            video.srcObject.getVideoTracks().forEach(track => track.stop())
        }
    }


    return (
        <>
            <div className='container' style={{border: !stream ? 'solid 1px black' : null}}>
                <video autoPlay id="video"/>
                {!stream
                    ? <div className="dummyContainer" onClick={!enableFeed ? ()=> dispatch(updateSettings({enableFeed: true})) : null}>
                        <div>
                            {enableFeed ? <VideoCameraOutlined/> : <VideoCameraAddOutlined style={{cursor: 'pointer'}} /> }
                            {enableFeed ? <h3>Establishing Feed <LoadingOutlined/></h3> : <h3> Click To Start Feed </h3>}
                        </div>
                    </div>
                    : null
                }
                {showScreenshot ? <img id="tempImg"/> : null}
                <div>
                {!showScreenshot && stream
                ? <ButtonGroup
                    onDownload={onDownload}
                    images={images}
                    onScreenshot={onScreenshot}
                    onBurst={onBurst}
                    onVideo={onVideo1}
                    endVideo={endVideo}
                    isRecording={isRecording}
                    deleteAllMedia={deleteAllMedia}
                />
                : null
                }
            </div>
        </div>
        <ImageContainer
        videos={videos}
        images={images}
        handleRemoveImage={handleRemoveImage}
        format={format}
        handleDownload={handleDownload}/>
    </>
    )
}

export default CaptureFunctional;
