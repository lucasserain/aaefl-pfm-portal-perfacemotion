import React, { useRef, useCallback, useState, Component } from 'react';
import Webcam from 'react-webcam';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { uuid } from 'uuidv4';
import Popup from 'reactjs-popup';
import Button from '../../components/Button';
import { putRequestWithBodyUploadFile } from '../Recorder/teste.js';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import {
  Container,
  Content,
  Background,
  Header,
  TitleHeader,
  VideoClassPlayer,
  VideoCaptureWeb,
} from './styles';

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const webcamRef = useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const player = useRef<ReactPlayer>(null);
  const formData = new FormData();

  async function sendFramesToApi(url: string) {
    await fetch(url).then((r) =>
      r.blob().then((rs) => formData.append('file', rs, uuid())),
    );
    console.log(url);
    formData.append('codAluno', '8462bb48-0d8a-46cf-88f4-648fc5b41180');
    formData.append('codAula', '2c026be0-f169-4d21-b34e-2e0d1f36dab3');
    const requestOptions = putRequestWithBodyUploadFile(formData);
    console.log(requestOptions);
    return fetch(
      `https://aaefl-pfm-api-midias.herokuapp.com/videos`,
      requestOptions,
    );
  }

  const handleDownload = React.useCallback(() => {
    console.log('merda');
    alert(recordedChunks.length);
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      });
      const url = URL.createObjectURL(blob);
      sendFramesToApi(url);
      alert('Vídeo enviado');
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

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
      mediaRecorderRef.current?.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
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

  return (
    <>
      <Header>
        <FiArrowLeft />
        <a href="Back">Voltar</a>
      </Header>
      <Container>
        <TitleHeader>
          <h1>Internet das Coisas</h1>
          <h1>Turma: 8ºCiclo</h1>
          <p>
            <span>Aula 5 - Introdução a IOT</span>
            <span>19/05/2021</span>
          </p>
        </TitleHeader>
        <VideoClassPlayer>
          <ReactPlayer
            className="react-player"
            ref={player}
            onProgress={(e) => {
              // onCurrentTimeChange(e);
              // console.log(e)
              // showImage()
            }}
            url="https://youtu.be/hmQSYY01iWs"
            onPlay={handleStartCaptureClick}
            onPause={handleStopCaptureClick}
          />
          <p>
            <span>Anotações:</span>
            <span>
              A Internet das Coisas (Internet of Things, ou IoT) é um conceito
              que dispõe que a maioria dos dispositivos que utilizamos
              diariamente está conectada entre si e pela Internet. Há uma
              revolução no momento que envolve a conexão de nossos mundos
              físicos e digitais. O crescimento da Internet das Coisas e da
              transformação digital está mudando drasticamente a maneira como os
              consumidores interagem com seus carros, casas e eletrodomésticos,
              mas também tem importantes implicações para a indústria.
            </span>
          </p>
        </VideoClassPlayer>
        <VideoCaptureWeb>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="video-recorder"
          />
        </VideoCaptureWeb>
        {recordedChunks.length > 0 && (
          <Button className="btnSend" onClick={handleDownload}>
            Enviar vídeo
          </Button>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
