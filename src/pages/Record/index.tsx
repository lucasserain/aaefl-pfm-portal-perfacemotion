/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo_small.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/AuthContext';

const Record: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Parfacemotion" />
        <h1>oi</h1>
        <h1>Faça o seu login</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          type="password"
          icon={FiLock}
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
        <Link to="/signup">
          <FiLogIn />
          Criar conta
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default Record;
