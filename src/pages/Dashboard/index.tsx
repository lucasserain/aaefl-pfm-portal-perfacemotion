import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { uuid } from 'uuidv4';
import Button from '../../components/Button';
import { putRequestWithBodyUploadFile } from '../Recorder/teste.js';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import {
  Container,
  Header,
  TitleHeader,
  VideoClassPlayer,
  VideoCaptureWeb,
} from './styles';

interface Aulas {
  codAula: string;
  codDisciplina: string;
  nomeDisciplina: string;
  descricao: string;
  codProfessor: string;
  urlFundo: string;
  nomeAula: string;
  duracaoAula: number;
  inicioAula: string;
  finalAula: string;
  urlVideo: string;
}

interface AulasParam {
  aula: string;
}

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { params } = useRouteMatch<AulasParam>();
  const webcamRef = useRef<Webcam | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = React.useState(false);

  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const player = useRef<ReactPlayer>(null);
  const [aulas, setAulas] = useState<Aulas>();
  const formData = new FormData();

  useEffect(() => {
    api.get(`aulas/${params.aula}`).then((response) => {
      setAulas(response.data);
    });
  }, [params.aula]);

  async function sendFramesToApi(url: string) {
    const codigoUsuarioFromDB = localStorage.getItem('@Perfacemotion:usuario');
    let codUsuario = '';
    if (codigoUsuarioFromDB) {
      codUsuario = JSON.parse(codigoUsuarioFromDB).cod_usua;
    }
    await fetch(url).then((r) =>
      r.blob().then((rs) => formData.append('file', rs, uuid())),
    );
    console.log(url);
    formData.append('codAluno', codUsuario);
    formData.append('codAula', params.aula);
    const requestOptions = putRequestWithBodyUploadFile(formData);
    console.log(requestOptions);
    return fetch(
      `https://aaefl-pfm-api-midias.herokuapp.com/videos`,
      requestOptions,
    );
  }

  const handleDownload = React.useCallback(() => {
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
        <a href="/listadisciplinas">Voltar</a>
      </Header>
      <Container>
        <TitleHeader>
          <h1>{aulas?.nomeAula}</h1>

          <p>
            <span>{aulas?.descricao}</span>
            <span>{aulas?.inicioAula}</span>
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
            url={aulas?.urlVideo}
            onPlay={handleStartCaptureClick}
            onPause={handleStopCaptureClick}
          />
          <p>
            <span>Descrição:</span>
            <span>{aulas?.descricao}</span>
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
