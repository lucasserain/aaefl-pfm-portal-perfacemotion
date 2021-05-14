import React from 'react';
import Webcam from 'react-webcam';
import {Button, Tooltip, Popconfirm} from 'antd'
import {
    DownloadOutlined,
    CameraOutlined,
    PictureOutlined,
    ClearOutlined,
    VideoCameraOutlined,
    CloudDownloadOutlined
  } from '@ant-design/icons';
import '../App.css';
import { uuid } from 'uuidv4';
import { putRequestWithBodyUploadFile } from '../teste';

const ButtonGroup = (props) =>{

    const {images, onScreenshot, onDownload, onBurst, onVideo, endVideo, isRecording, deleteAllMedia} = props;
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const formData = new FormData();

    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = React.useCallback(() => {
      if (recordedChunks.length) {
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        sendFramesToApi(url);
        alert("alerta boxsta, mas video foi enviado")
        setRecordedChunks([]);
      }
    }, [recordedChunks]);

    var downloadTooltip = 'Download';

    if (images.length > 1 ) {
        downloadTooltip = 'Download All';
    }

    async function sendFramesToApi(url) {
      await fetch(url).then(r => r.blob().then(rs => formData.append("file",rs,uuid())));
      formData.append('codAluno','8462bb48-0d8a-46cf-88f4-648fc5b41180');
      formData.append('codAula','2c026be0-f169-4d21-b34e-2e0d1f36dab3');
      const requestOptions = putRequestWithBodyUploadFile(formData)
      console.log(requestOptions)
      return fetch(
        `http://localhost:8080/videos`,
        requestOptions
      )
    }

    return <div className='buttonGroup'>
        <div style={{width: '99%', display: 'flex', justifyContent: 'center'}}>
        <Tooltip title="Burst">
            <Button shape="circle" onClick={onBurst}>
                <PictureOutlined className='burst' style={{marginLeft: 0}}/>
                <PictureOutlined className='burst' style={{marginLeft: 5}}/>
                <PictureOutlined className='burst' style={{marginLeft: 10}}/>
            </Button>
        </Tooltip>
        <Tooltip title="Photo">
            <Button shape="circle" onClick={onScreenshot} style={{margin: '0 10px 0 10px'}}>
                <CameraOutlined/>
            </Button>
        </Tooltip>
        <Tooltip title="Video">
        <Webcam
                audio={true}
                ref={webcamRef}
                mirrored
                style={{
                    width: "0%", height: "0%"
                }}Webcam/>
              <Button shape="circle" onClick={handleStartCaptureClick} type={capturing ? 'danger' : 'default'} >
                  {capturing ? (
                    <VideoCameraOutlined shape="circle" onClick={handleStopCaptureClick} style={{margin: '5px 0 0 3px'}}></VideoCameraOutlined>
                  ) : (
                    <VideoCameraOutlined shape="circle" onClick={handleStartCaptureClick} style={{margin: '5px 0 0 3px'}}></VideoCameraOutlined>
                  )}
                  {recordedChunks.length > 0 && (
                    <CloudDownloadOutlined  shape="circle"onClick={handleDownload} style={{margin: '5px 0 0 3px'}}></CloudDownloadOutlined>
                  )
                }
            </Button>
        </Tooltip>
        </div>
        {images.length > 0
        ? <div>
            <Tooltip title={downloadTooltip}>
                <Button shape="circle" style={{marginRight: 10}} onClick={()=>onDownload(null)}>
                    <DownloadOutlined/>
                </Button>
            </Tooltip>
            <Popconfirm title="Confirmar?" onConfirm={deleteAllMedia}>
                <Tooltip title='Limpa tudo' overlayStyle={{zIndex: 10}}>
                    <Button shape="circle">
                        <ClearOutlined />
                    </Button>
                </Tooltip>
            </Popconfirm>
        </div>
        : null
        }
    </div>

};

export default ButtonGroup;
