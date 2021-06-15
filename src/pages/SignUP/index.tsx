/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo_small.png';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/apiUsuarios';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpFormData {
  nome: string;
  email: string;
  cod_tipo_usua: number;
  password: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório!'),
          email: Yup.string()
            .required('E-mail obrigatório!')
            .email('Digite um e-mail válido!'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // Temporario set user type 1
        // eslint-disable-next-line no-param-reassign
        data.cod_tipo_usua = 1;
        await api.post('/usuarios', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no Parfacemotion!',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro!',
          description:
            'Ocorreu um erro ao enviar dados, por favor tente novamente.',
        });
      }
    },
    [history, addToast],
  );
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Parfacemotion" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
          <Input name="nome" icon={FiUser} placeholder="Nome" />
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
        <Link to="/">
          <FiArrowLeft />
          Voltar para login
        </Link>
      </Content>
      <Background />
    </Container>
  );
};

export default SignUp;
