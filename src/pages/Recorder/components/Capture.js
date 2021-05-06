import React, {Component} from 'react';
import ButtonGroup from './ButtonGroup';
import {connect} from 'react-redux';
import {updateSettings, addImage, removeImage, deleteAll, setStream} from '../actions';
import ImageContainer from './ImageContainer';
import {saveAs} from 'save-as';

var JSZip = require("jszip");

class Capture extends Component {

    state = {
        showScreenshot: false,
        interval: null,
        isRecording: false
    }

    componentDidMount = () => {

        if (this.props.settings.enableFeed){
            this.hasGetUserMedia()
        } else {
            this.onCutFeed()
        }
    }

    componentDidUpdate = (prevProps, prevState) =>{
        if (this.props.settings.enableFeed !== prevProps.settings.enableFeed){
            if (this.props.settings.enableFeed){
                this.hasGetUserMedia()
            } else {
                this.onCutFeed()
            }
        }
    }

    hasGetUserMedia = () => {
        if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia){
            alert('Unable to enable camera.')
        } else {
            navigator.getUserMedia({video: true}, this.handleVideo, this.videoError);
        }
    }

    videoError = (e)=>{
        console.log(e)
    }

    handleVideo = (stream) => {
        this.props.setStream(stream)
        var video = document.querySelector("video");
        video.srcObject = stream
      }

    onScreenshot = () => {
        this.setState({showScreenshot: true}, ()=>{
            var img = document.querySelector('#tempImg')
            var video = document.querySelector('#video')
            var canvas = document.createElement('canvas')
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            var dataUrl = canvas.toDataURL('image/png');
            img.src = dataUrl
            this.props.addImage(dataUrl)
        })
        setTimeout(()=>{
            this.setState({showScreenshot: false})
        }, 1000)
    }

    handleRemoveImage = (img) =>{
        this.props.removeImage(img)
    }

    onVideo1 = () =>{
        var video = document.querySelector('video')
        video.captureStream = video.captureStream || video.mozCaptureStream;
        return new Promise(resolve => video.onplaying = resolve)
        .then(()=>this.onVideo2(video.captureStream))
        .then(chunks=>{
            let recordedBlob = new Blob(chunks, { type: "video/webm" });
            var video = URL.createObjectURL(recordedBlob)
            this.setVideos(video, true)
        })
    };

    onVideo2 = (boi) =>{
        this.setState({isRecording: true})
        let recorder = new MediaRecorder(boi);
        let data = [];

        recorder.ondataavailable = event => data.push(event.data);
        recorder.start();

        let stopped = new Promise((resolve, reject) => {
            recorder.onstop = resolve;
            recorder.onerror = event => reject(event.name);
        });

        let recorded = this.getProm().then(
            () => recorder.state === "recording" && recorder.stop()
        );

        return Promise.all([
            stopped,
            recorded
        ])
        .then(() => data);
    };

    getProm = () =>{
        return new Promise(resolve => resolve)
    };

    setVideos = (a, b) =>{
        var {videos} = this.state
        if (b){
            videos.push(a)
        } else {
            videos = videos.filter(x=>x !== a)
        }
        this.setState({videos})
    }

    endVideo = () =>{
        var {stream} = this.props
        stream.getTracks().forEach(track => track.stop());
        this.setState({isRecording: false}, ()=>{
            this.hasGetUserMedia()
        })
    }

    onDownload = (x) => {
        const {images} = this.props
        const {format} = this.props.settings
        if (x){
            this.handleDownload(x, 'react-photobooth-image' + format)
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
            this.handleDownload(images[0], 'react-photobooth-image' + format)
        }
    };

    handleDownload = (data, name) => {
        var download = document.createElement('a');
        download.href = data
        download.download = name
        download.style.display = 'none';
        document.body.appendChild(download);
        download.click();
        document.body.removeChild(download);
    };

    deleteAllMedia = () =>{
        this.props.deleteAll()
    }

    onBurst = () =>{
        var count = 0

        var interval = setInterval(()=>{
            this.onScreenshot()
            count++
            if (count === this.props.settings.burst){
                clearInterval(this.state.interval)
                this.setState({interval: null})
            }
        }, this.props.settings.burstRate * 1000)

        this.setState({interval})
    }

    onCutFeed = () =>{
        var video = document.querySelector("video");
        this.props.setStream(null)
        if (video.srcObject){
            video.srcObject.getVideoTracks().forEach(track => track.stop())
        }
    }

    render() {

        const {state, onDownload, clearAll, onScreenshot, onBurst, onVideo,endVideo, deleteAllMedia} = this;
        const { showScreenshot, isRecording} = state

        const {format, enableFeed} = this.props.settings

        const {updateSettings, images, stream, videos} = this.props;

        return (<>
            <div className='container' style={{border: !stream ? 'solid 1px black' : null}}>
                <video autoPlay id="video"/>
                {!stream
                    ? <div className="dummyContainer" onClick={!enableFeed ? ()=> updateSettings({enableFeed: true}) : null}>
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
                    onClearAll={clearAll}
                    images={images}
                    onScreenshot={onScreenshot}
                    onBurst={onBurst}
                    onVideo={onVideo}
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
        handleRemoveImage={this.handleRemoveImage}
        format={format}
        handleDownload={this.handleDownload}/>
    </>)
    }

};

const mapStateToProps = (state) =>({
    settings: state.settings,
    images: state.images,
    videos: state.videos,
    stream: state.stream
})

const mapDispatchToProps = dispatch => {
    return {
      updateSettings: (payload)=>dispatch(updateSettings(payload)),
      addImage: (payload)=>dispatch(addImage(payload)),
      removeImage: (payload)=>dispatch(removeImage(payload)),
      deleteAll: (payload)=>dispatch(deleteAll(payload)),
      setStream: (payload)=>dispatch(setStream(payload))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Capture);
