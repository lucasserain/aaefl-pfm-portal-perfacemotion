/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FiLogIn, FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo_small.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Parfacemotion" />

      <form action="">
        <h1>Faça seu cadastro</h1>
        <div className="radio-button">
          <input
            type="radio"
            id="radioAluno"
            value="Aluno"
            name="tipo_usuario"
          />
          <label htmlFor="radioAluno">Aluno</label>
          <input
            type="radio"
            id="radioProfessor"
            value="Professor"
            name="tipo_usuario"
          />
          <label htmlFor="radioProfessor">Professor</label>
        </div>
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          type="password"
          icon={FiLock}
          placeholder="Senha"
        />
        <div className="termo-aceite">
          <input type="checkbox" id="termo" name="termo" />
          <label htmlFor="termo">
            <a href="google.com">
              Declaro que li e aceito os termos de exibição de imagem
            </a>
          </label>
        </div>
        <Button type="submit">Cadastrar</Button>
      </form>
      <a href="login">
        <FiArrowLeft />
        Voltar para login
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignUp;
