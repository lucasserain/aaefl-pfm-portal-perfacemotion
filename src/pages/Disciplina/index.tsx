import React, {
  useState,
  FormEvent,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import {
  FiChevronLeft,
  FiChevronRight,
  FiMail,
  FiLock,
  FiUser,
  FiArrowLeft,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Calendar from 'react-calendar';
import { Header, RepositoryInfo, Issues, Formulario } from './styles';
import logoImg from '../../assets/logo_small.png';
import api from '../../services/api';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import 'react-calendar/dist/Calendar.css';

interface DisciplinasParam {
  disciplina: string;
}

interface Disciplina {
  codDisciplina: string;
  nomeDisciplina: string;
  codProfessor: string;
  descricao: string;
  urlFundo: string;
}
interface Alunos {
  codUsuario: string;
  nome: string;
  urlAvatar: string;
}

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
}

interface Professor {
  nome: string;
}

const Disciplina: React.FC = () => {
  const [disciplinas, setDisciplinas] = useState<Disciplina | null>(null);
  const [alunos, setAlunos] = useState<Alunos[]>([]);
  const [professores, setProfessores] = useState<Professor | null>(null);
  const [aulas, setAulas] = useState<Aulas[]>([]);
  const { params } = useRouteMatch<DisciplinasParam>();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    api.get(`disciplina/${params.disciplina}`).then((response) => {
      setDisciplinas(response.data);
    });

    api.get(`disciplina/${params.disciplina}/alunos`).then((response) => {
      setAlunos(response.data);
    });

    api.get(`disciplina/${params.disciplina}/aulas`).then((response) => {
      setAulas(response.data);
    });
    api.get(`disciplina/${params.disciplina}/professor`).then((response) => {
      setProfessores(response.data);
    });
  }, [params.disciplina]);
  /* eslint-disable no-param-reassign */
  const handleSubmit = useCallback(
    async (data: Aulas) => {
      try {
        formRef.current?.setErrors({});
        const penis = value.toLocaleString();
        data.inicioAula = penis;
        data.finalAula = penis;
        alert(penis);
        await api.post(`/disciplina/${disciplinas?.codDisciplina}/aula`, data);
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

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {disciplinas && (
        <RepositoryInfo>
          <header>
            <img
              src={disciplinas.codDisciplina}
              alt={disciplinas.codDisciplina}
            />
            <div>
              <strong>Disciplina: {disciplinas.nomeDisciplina}</strong>
              <p>{disciplinas.descricao}</p>
            </div>
            <div>
              <strong>Professor: {professores?.nome}</strong>
            </div>
          </header>
          <ul>
            <li>
              <strong>{aulas.length}</strong>
              <span>Aulas</span>
            </li>
            <li>
              <strong>{alunos.length}</strong>
              <span>Alunos</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Formulario>
        <Form onSubmit={handleSubmit}>
          <Input
            name="nomeAula"
            icon={FiUser}
            placeholder="Digite o nome da aula"
          />
          <Input
            name="descricao"
            icon={FiUser}
            placeholder="Digite a descrição da aula"
          />
          <Input
            name="urlVideo"
            icon={FiUser}
            placeholder="Insira a url do video"
          />
          <Calendar onChange={onChange} value={value} />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Formulario>
      <Issues>
        {aulas.map((aula) => (
          <a key={aula.codAula} href={aula.codAula}>
            <div>
              <strong>{aula.nomeAula}</strong>
              <p>{aula.descricao}</p>
              <p>Horário de início da aula: {aula.inicioAula}</p>
              <p>Horário de término da aula: {aula.finalAula}</p>
              <p>Duração da aula: {aula.duracaoAula} minutos</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Disciplina;
