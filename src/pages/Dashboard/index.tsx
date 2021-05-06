import React, { useRef, useCallback, useState, Component } from 'react';
import Webcam from 'react-webcam';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const webcamRef = useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStopCaptureClick = React.useCallback(() => {
    if (webcamRef.current?.stream) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      mediaRecorderRef.current?.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const tiraAPorraDaSS = React.useCallback(() => {
    if (webcamRef.current?.stream) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc);
      // setImgSrc(imageSrc);
    }
  }, [webcamRef, setCapturing, mediaRecorderRef, setImgSrc]);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);

    const jooj = setInterval(() => tiraAPorraDaSS, 20000);

    // tiraAPorraDaSS();
    if (mediaRecorderRef && webcamRef) {
      if (webcamRef.current?.stream) {
        mediaRecorderRef.current = new MediaRecorder(
          webcamRef.current?.stream,
          {
            mimeType: 'video/webm',
          },
        );

        mediaRecorderRef.current.addEventListener(
          'dataavailable',
          handleDataAvailable,
        );

        mediaRecorderRef.current.start();
      }
    }
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });

      const teste = new FormData();
      teste.append('video', blob);
      api.post('/videos/123132', teste);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      // a.style = 'display: none';
      a.href = url;
      a.download = 'react-webcam-stream-capture.webm';
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);
  return (
    <>
      <h1>Dashboard</h1>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      {capturing ? (
        <Button onClick={handleStopCaptureClick}>Stop Capture</Button>
      ) : (
        <Button onClick={handleStartCaptureClick}>Start Capture</Button>
      )}
      {recordedChunks.length > 0 && (
        <Button onClick={handleDownload}>Download</Button>
      )}
      {imgSrc && <img src={imgSrc} alt="tes" />}
    </>
  );
};

export default Dashboard;
