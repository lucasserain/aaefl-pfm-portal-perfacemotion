import React, { useRef, useCallback, useState, Component } from 'react';
import Webcam from 'react-webcam';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import CaptureFunctional from './components/CaptureFunctional.js';

const Recorder: React.FC = () => {
  return (
    <>
      <h1>jooj</h1>
      <CaptureFunctional />
    </>
  );
};

export default Recorder;
