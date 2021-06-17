/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import Popup from 'reactjs-popup';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo_small.png';
import 'reactjs-popup/dist/index.css';

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

interface tipoUsuario {
  cod_tipo_usua: number;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [usuarioTipo, setTipoUsuario] = useState<tipoUsuario>();
  const [checkBox, setCheckBox] = useState<number>();
  let codUsua = 1;

  const handleInputChange = (score: number) => {
    codUsua = score;
    setCheckBox(score);
    setTipoUsuario({ cod_tipo_usua: score });
  };

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório!'),
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
        data.cod_tipo_usua = codUsua;

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
          console.log(errors);
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
              value={1}
              name="tipo_usuario"
              defaultChecked
              onChange={(e) => handleInputChange(1)}
            />
            <label htmlFor="radioAluno">Aluno</label>
            <input
              type="radio"
              id="radioProfessor"
              value={2}
              name="tipo_usuario"
              onChange={(e) => handleInputChange(2)}
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
          <div className="termo-aceite">
            <input type="checkbox" id="termo" name="termo_aceite" />
            <Popup
              trigger={
                <span>
                  {' '}
                  Declaro que li e aceito os termos de exibição de imagem{' '}
                </span>
              }
              modal
              nested
            >
              {(close: any) => (
                <div className="modal">
                  <div className="header"> Termo de aceite </div>
                  <div className="content">
                    {' '}
                    AUTORIZO o uso de minha imagem (ou do menor sob minha
                    responsabilidade) capturada a partir da plataforma
                    Perfacemotion, sem finalidade comercial, para ser utilizada
                    no trabalho de conclusão de curso do projeto Perfacemotion.
                    <br />A presente autorização é concedida a título gratuito,
                    abrangendo o uso da imagem acima mencionada em todo
                    território nacional e no exterior, em todas as suas
                    modalidades e, em destaque, das seguintes formas:
                    <br /> (I) trabalho escrito;
                    <br /> (II) plataforma virtual. Por esta ser a expressão da
                    minha vontade declaro que autorizo o uso acima descrito sem
                    que nada haja a ser reclamado a título de direitos conexos à
                    minha imagem ou a qualquer outro.
                  </div>
                  <div className="actions">
                    <Button
                      className="button"
                      onClick={() => {
                        console.log('modal closed ');
                        close();
                      }}
                    >
                      Fechar
                    </Button>
                  </div>
                </div>
              )}
            </Popup>
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
