import React, {
  useState,
  FormEvent,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  FiChevronRight,
  FiMail,
  FiLock,
  FiUser,
  FiArrowLeft,
} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import { Title, Repositories, Error } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button/index';

interface Disciplina {
  codDisciplina: string;
  nomeDisciplina: string;
  codProfessor: string;
  descricao: string;
  urlFundo: string;
}

const CDisciplinas: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [newDisciplina, setNewDisciplina] = useState('');
  const [inputError, setInputError] = useState('');
  const { addToast } = useToast();
  const history = useHistory();
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );
    if (storagedRepositories) {
      return [];
    }
    return [];
  });

  useEffect(() => {
    async function carregaDisciplinas() {
      const response = await api.get('/disciplina');
      setDisciplinas(response.data);
    }
    carregaDisciplinas();
  }, []);

  const handleSubmit = useCallback(
    async (data: Disciplina) => {
      try {
        formRef.current?.setErrors({});
        await api.post(`/disciplina/${data.codProfessor}`, data);
        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no Parfacemotion!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente!',
        });
      }
    },
    [addToast, history],
  );

  async function handleAddDisciplina(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newDisciplina) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Disciplina>(`/disciplina/`);

      const repository = response.data;

      setDisciplinas([...disciplinas, repository]);

      setNewDisciplina('');
      setInputError('');
    } catch (error) {
      setInputError('Erro na busca por esse repositório');
    }
  }
  return (
    <>
      <Title>Cadastre Disciplinas</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="nomeDisciplina"
          icon={FiUser}
          placeholder="Digite o nome da disciplina"
        />
        <Input
          name="codProfessor"
          icon={FiUser}
          placeholder="Digite o nome do professor"
        />
        <Input
          name="descricao"
          icon={FiUser}
          placeholder="Digite a descrição"
        />
        <Input name="urlFundo" icon={FiUser} placeholder="Digite a url" />
        <Button type="submit">Cadastrar</Button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {disciplinas.map((disciplina) => (
          <Link
            key={disciplina.codDisciplina}
            to={`/disciplinas/${disciplina.codDisciplina}`}
          >
            <img src={disciplina.urlFundo} alt={disciplina.urlFundo} />
            <div>
              <strong>{disciplina.nomeDisciplina}</strong>
              <p>{disciplina.descricao}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default CDisciplinas;
