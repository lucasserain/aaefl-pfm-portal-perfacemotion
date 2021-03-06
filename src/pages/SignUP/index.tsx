/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo_small.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(async (data: object) => {
    console.log(data);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        porra: Yup.boolean().oneOf([false], 'Must Accept Terms and Conditions'),
      });
      await schema.validate(data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Parfacemotion" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <div className="radio-button">
            <input
              type="radio"
              id="radioAluno"
              value="Aluno"
              name="tipo_usuario"
              defaultChecked
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
          <input type="checkbox" name="porra" />
          <div className="termo-aceite">
            <input type="checkbox" id="termo" name="termo_aceite" />
            <label htmlFor="termo">
              <a href="google.com">
                Declaro que li e aceito os termos de exibição de imagem
              </a>
            </label>
          </div>
          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="login">
          <FiArrowLeft />
          Voltar para login
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignUp;
