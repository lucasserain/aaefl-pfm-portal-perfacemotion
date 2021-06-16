import React, {
  useState,
  FormEvent,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import {
  Repositories,
  Navigation,
  LeftSideNav,
  NavItem,
  ContentWrapper,
  LeftForm,
} from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

interface Disciplina {
  codDisciplina: string;
  nomeDisciplina: string;
  codProfessor: string;
  descricao: string;
  urlFundo: string;
}

interface UsuarioStore {
  codUsuario: string;
}

const ListaDisciplina: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [newDisciplina, setNewDisciplina] = useState('');
  const [inputError, setInputError] = useState('');
  const { addToast } = useToast();
  const history = useHistory();

  const [disciplinas, setDisciplinas] = useState<Disciplina[]>(() => {
    const storagedRepositories = localStorage.getItem('@Perfacemotion:usuario');
    if (storagedRepositories) {
      return [];
    }
    return [];
  });

  useEffect(() => {
    async function carregaDisciplinas() {
      const codigoUsuarioFromDB = localStorage.getItem(
        '@Perfacemotion:usuario',
      );
      let codUsuario = '';
      if (codigoUsuarioFromDB) {
        codUsuario = JSON.parse(codigoUsuarioFromDB).cod_usua;
      }

      const response = await api.get(`/disciplina/usuario/${codUsuario}`);
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
      <Navigation>
        <LeftSideNav>
          <NavItem>Voltar</NavItem>
        </LeftSideNav>
      </Navigation>
      <ContentWrapper>
        <section className="specialties-container">
          <ul>
            <li>
              <i className="fas fa-shield-alt" />
              <h1>Lista de disciplinas</h1>
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
            </li>
          </ul>
        </section>
        <LeftForm />
      </ContentWrapper>
    </>
  );
};
export default ListaDisciplina;
