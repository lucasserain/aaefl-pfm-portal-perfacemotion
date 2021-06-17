import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import { useRouteMatch } from 'react-router-dom';
import {
  Layout,
  Descriptions,
  Radio,
  Menu,
  Dropdown,
  Button,
  Input,
} from 'antd';
import {
  DownOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { Container, Jooj, Selecoes, TempoFrame, InfoAluno } from './styles';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import api from '../../services/api';

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

interface AulasApi {
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
interface Professor {
  nome: string;
}

const { Content } = Layout;

const aulas = [
  {
    codAula: '',
    codDisciplina: '',
    inicioAula: '',
    finalAula: '',
    duracaoAula: '',
    dataCriacao: '',
    dataAlteracao: '',
    urlVideo: '',
    nomeAula: 'Feijuca',
    descricao: '',
  },
];

const teste = () => {
  return (
    <Menu>
      {aulas.map((aula, i) => {
        if (aulas[i] !== null) {
          return (
            <Menu.Item key={aulas[i].nomeAula}>
              <a href={aulas[i].nomeAula}>{aulas[i].nomeAula}</a>
            </Menu.Item>
          );
        }
        return (
          <Menu.Item key="0">
            <a href="0">Sem aulas</a>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

interface AulasParam {
  aula: string;
}

const Report: React.FC = () => {
  const { params } = useRouteMatch<AulasParam>();
  const [value, setValue] = useState(1);
  const [showControl, setShowControl] = useState(true);
  const [nomeAluno, setNomeAluno] = useState('');
  const [emocao, setEmocao] = useState('');
  const [intervalo, setIntervalo] = useState(1);
  const [intervalo2, setIntervalo2] = useState(0);
  const [disciplinas, setDisciplinas] = useState<Disciplina | null>(null);
  const [alunos, setAlunos] = useState<Alunos[]>([]);
  const [professores, setProfessores] = useState<Professor | null>(null);
  const [aulasApi, setAulas] = useState<AulasApi>();

  useEffect(() => {
    api.get(`aulas/${params.aula}`).then((response) => {
      setAulas(response.data);
      api
        .get(`disciplina/${aulasApi?.codDisciplina}/professor`)
        .then((response2) => {
          setProfessores(response2.data);
        });
    });

    api.get(`disciplina/${params.aula}/alunos`).then((response) => {
      setAlunos(response.data);
    });

    api.get(`aulas/${params.aula}`).then((response) => {
      setAulas(response.data);
    });
  }, [params.aula]);

  const [curr, setCurr] = useState(0);

  const [aula, setAula] = useState({
    codAula: '',
    codDisciplina: '',
    inicioAula: '',
    finalAula: '',
    duracaoAula: '',
    dataCriacao: '',
    dataAlteracao: '',
    urlVideo: '',
    nomeAula: '',
    descricao: '',
  });

  const [allAulas, setAllAulas] = useState([
    {
      codAula: '',
      codDisciplina: '',
      inicioAula: '',
      finalAula: '',
      duracaoAula: '',
      dataCriacao: '',
      dataAlteracao: '',
      urlVideo: '',
      nomeAula: '',
      descricao: '',
    },
  ]);

  const [result, setResult] = useState([
    {
      dataAlteracao: '',
      dataCriacao: '',
      tempoFrame: '',
      emocao: '',
      idFrame: '',
      urlFrame: '',
    },
  ]);

  const [resultAll, setResultAll] = useState([
    {
      dataAlteracao: '',
      dataCriacao: '',
      tempoFrame: '',
      emocao: '',
      idFrame: '',
      urlFrame: '',
    },
  ]);

  const [allDisciplinas, setAllDisciplinas] = useState([
    {
      codDisciplina: '',
      nomeDisciplina: '',
      codProfessor: '',
      descricao: '',
      urlFundo: '',
      alunos: '',
    },
  ]);

  const [disciplina, setDisciplina] = useState({
    codDisciplina: '',
    nomeDisciplina: '',
    codProfessor: '',
    descricao: '',
    urlFundo: '',
    alunos: '',
  });

  const [aluno, setAluno] = useState([
    {
      codUsuario: '',
      dataAlteracao: '',
      dataCriacao: '',
      email: '',
      nome: '',
      tipoUsuario: '',
      urlAvatar: '',
    },
  ]);

  const [countEmocoes, setCountEmocoes] = useState([
    {
      countEmocao: 0,
      string: 'Alegria',
      porcentagem: '',
    },
    {
      countEmocao: 0,
      string: 'Tristeza',
      porcentagem: '',
    },
    {
      countEmocao: 0,
      string: 'Surpresa',
      porcentagem: '',
    },
    {
      countEmocao: 0,
      string: 'Neutro',
      porcentagem: '',
    },
    {
      countEmocao: 0,
      string: 'Raiva',
      porcentagem: '',
    },
    {
      countEmocao: 0,
      string: 'Nojo',
      porcentagem: '',
    },
    {
      countEmocao: 0,
      string: 'Medo',
      porcentagem: '',
    },
  ]);
  const player = useRef<ReactPlayer>(null);

  const getEmocaoPredominante = (resultado: any[]) => {
    if (resultado.length === 0) {
      return null;
    }
    resultado.forEach((item) => {
      if (item.emocao === 'Alegria') {
        countEmocoes[0].countEmocao += 1;
      } else if (item.emocao === 'Triste') {
        countEmocoes[1].countEmocao += 1;
      } else if (item.emocao === 'Surpresa') {
        countEmocoes[2].countEmocao += 1;
      } else if (item.emocao === 'Neutro') {
        countEmocoes[3].countEmocao += 1;
      } else if (item.emocao === 'Raiva') {
        countEmocoes[4].countEmocao += 1;
      } else if (item.emocao === 'Nojo') {
        countEmocoes[5].countEmocao += 1;
      } else if (item.emocao === 'Medo') {
        countEmocoes[6].countEmocao += 1;
      }
    });
    console.log('tristeza: ', countEmocoes[1].countEmocao);
    const total =
      countEmocoes[0].countEmocao +
      countEmocoes[1].countEmocao +
      countEmocoes[2].countEmocao +
      countEmocoes[3].countEmocao +
      countEmocoes[4].countEmocao +
      countEmocoes[5].countEmocao +
      countEmocoes[6].countEmocao;
    let maior = 0;
    let predominante = '';
    countEmocoes.forEach((itemEmocao) => {
      if (itemEmocao.countEmocao > maior) {
        maior = itemEmocao.countEmocao;
        predominante = itemEmocao.string;
      }
    });

    setEmocao(predominante);
    for (let i = 0; i <= countEmocoes.length; i += 1) {
      if (countEmocoes[i].countEmocao !== 0) {
        countEmocoes[i].porcentagem = (
          (countEmocoes[i].countEmocao / total) *
          100
        )
          .toFixed(2)
          .toString()
          .concat('%');
      }
    }
    console.log('predominante: ', emocao);
    console.log('Vezes Total: ', total);

    return predominante;
  };

  const getEmocaoPredominanteIntervalo = (
    resultado: any[],
    periodoIntervalo: number,
  ) => {
    if (resultado === undefined) {
      return null;
    }
    const countEmocoes2 = [
      {
        countEmocao: 0,
        string: 'Alegria',
      },
      {
        countEmocao: 0,
        string: 'Tristeza',
      },
      {
        countEmocao: 0,
        string: 'Surpresa',
      },
      {
        countEmocao: 0,
        string: 'Neutro',
      },
      {
        countEmocao: 0,
        string: 'Raiva',
      },
      {
        countEmocao: 0,
        string: 'Nojo',
      },
      {
        countEmocao: 0,
        string: 'Medo',
      },
    ];

    resultado.forEach((item) => {
      if (item.emocao === 'Alegria') {
        countEmocoes[0].countEmocao += 1;
      } else if (item.emocao === 'Tristeza') {
        countEmocoes[1].countEmocao += 1;
      } else if (item.emocao === 'Surpresa') {
        countEmocoes[2].countEmocao += 1;
      } else if (item.emocao === 'Neutro') {
        countEmocoes[3].countEmocao += 1;
      } else if (item.emocao === 'Raiva') {
        countEmocoes[4].countEmocao += 1;
      } else if (item.emocao === 'Nojo') {
        countEmocoes[5].countEmocao += 1;
      } else if (item.emocao === 'Medo') {
        countEmocoes[6].countEmocao += 1;
      }
    });
    console.log('tristeza: ', countEmocoes[1].countEmocao);
    const total =
      countEmocoes[0].countEmocao +
      countEmocoes[1].countEmocao +
      countEmocoes[2].countEmocao +
      countEmocoes[3].countEmocao +
      countEmocoes[4].countEmocao +
      countEmocoes[5].countEmocao +
      countEmocoes[6].countEmocao;
    let maior = 0;
    let predominante = '';
    countEmocoes.forEach((itemEmocao) => {
      if (itemEmocao.countEmocao > maior) {
        maior = itemEmocao.countEmocao;
        predominante = itemEmocao.string;
      }
    });

    console.log('predominanteIntervalo: ', predominante);

    return predominante;
  };

  const getAllStudentsEmotionInfo = async (idAula: any) => {
    await fetch(
      `https://aaefl-pfm-api-midias.herokuapp.com/relatorios/aulas/${idAula}`, // nao esta retornando nada pq n tem dados na base
    )
      .then((results) => results.json())
      .then((results) => {
        if (results.length >= 0) {
          setResultAll(results);
          getEmocaoPredominante(results);
          console.log('emoções todos estudantes: ', results);
        } else {
          setNomeAluno('Emoção não encontrada!');
        }
      })
      .catch((temErro) => {
        console.log('erro: ', temErro);
        setNomeAluno('Erro na api');
      });

    return result;
  };

  const getAulaInfo = async (idDisciplina: any) => {
    const idAula = aulasApi?.codAula;

    if (idAula) {
      getAllStudentsEmotionInfo(idAula);
    }
  };

  const getDisciplina = async () => {
    await fetch(`https://aaefl-pfm-api-midias.herokuapp.com/disciplina/`)
      .then((results) => results.json())
      .then((results) => {
        if (results.length > 0) {
          setAllDisciplinas(results);
          console.log('aqui: ', results);
          const codMateria = '11de6332-bcf2-4d29-ac72-8611478e01ac'; // da onde pegar a disciplina?
          results.map((item: any) => {
            if (item.codDisciplina === codMateria) {
              console.log('chegou?', item);
              // getAulaInfo(item.codDisciplina);
              return setDisciplina(item);
            }
            return null;
          });
        } else {
          setNomeAluno('Emoção não encontrada!');
        }
      })
      .catch((temErro) => {
        console.log('erro: ', temErro);
        setNomeAluno('Erro na api');
      });
  };

  const getEmotionInfo = async (idAula: any, idAluno: any) => {
    await fetch(
      `https://aaefl-pfm-api-midias.herokuapp.com/relatorios/aulas/${idAula}?idAluno=${idAluno}`,
    )
      .then((results) => results.json())
      .then((results) => {
        console.log(
          `https://aaefl-pfm-api-midias.herokuapp.com/relatorios/aulas/${idAula}?idAluno=${idAluno}`,
        );
        setNomeAluno('Carregando...');
        if (results.length >= 0) {
          setResult(results);
          getEmocaoPredominante(results);
          console.log('jooj: ', results);
        } else {
          setNomeAluno('Emoção não encontrada!');
        }
      })
      .catch((temErro) => {
        console.log('erro: ', temErro);
        setNomeAluno('Erro na api');
      });

    return result;
  };

  const getEmotionInfoAll = async (idAula: any) => {
    await fetch(
      `https://aaefl-pfm-api-midias.herokuapp.com/relatorios/aulas/${idAula}`,
    )
      .then((results) => results.json())
      .then((results) => {
        setNomeAluno('Carregando...');
        if (results.length >= 0) {
          setResult(results);
          getEmocaoPredominante(results);
          console.log('jooj: ', results);
        } else {
          setNomeAluno('Emoção não encontrada!');
        }
      })
      .catch((temErro) => {
        console.log('erro: ', temErro);
        setNomeAluno('Erro na api');
      });

    return result;
  };

  const getStudentInfo = async (nome: string) => {
    await fetch(
      `https://aaefl-pfm-api-midias.herokuapp.com/usuarios/?nome=${nome}`,
    )
      .then((estudante) => estudante.json())
      .then((estudante) => {
        if (nome.length === 0) {
          getEmotionInfoAll(aulasApi?.codAula);
        } else if (estudante.length > 0) {
          setAluno(estudante);
          console.log('Aluno: ', estudante);
          getEmotionInfo(
            aulasApi?.codAula,
            estudante[0].codUsuario,
            // aluno[0].codUsuario,
          );
        } else {
          setNomeAluno('Aluno não encontrado!');
        }
      })
      .catch((temErro) => {
        console.log('erro: ', temErro);
        setNomeAluno('Erro na api');
      });

    return result;
  };

  const fluxo = () => {
    // getDisciplina();
    // getAulaInfo(disciplina.codDisciplina);
    // getAllStudentsEmotionInfo(idDisciplina, idAula);
  };

  useEffect(() => {
    // console.log('aula da url: ', params.aula);
    fluxo();
    // getEmocaoPredominante(result);
    // getEmocaoPredominanteIntervalo(result, 2);
    // setEmocao(); // getStudentInfo
    // getAulaInfo('eae67ff6-0da1-4bb8-a0e4-672dcdfc34cd');
  }, [result]);
  // quando colocar um estado no [], ele chama dnv quando ele mudar

  const onIntervaloChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setIntervalo(e.target.value);
    setIntervalo2(e.target.value);
    setValue(e.target.value);
  };

  const onSemestreChange = (e: any) => {
    console.log('semestre checked', e.target.value);
    setValue(e.target.value);
  };

  const handleChange = (e: any) => {
    setNomeAluno(e.target.value);
  };

  const onKeyPress = (e: any) => {
    const keyCode = e.which || e.keyCode;

    if (keyCode === 13) {
      setNomeAluno('');
      getStudentInfo(nomeAluno);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <>
      <Input
        className="input"
        size="large"
        onChange={handleChange}
        onKeyPress={onKeyPress}
        value={nomeAluno}
        placeholder="Procurar Aluno..."
        prefix={<UserOutlined />}
      />
      <Container>
        <Layout>
          <Content>
            <Jooj className="jooj">
              <Descriptions title="Informações do Aluno/Turma">
                <Descriptions.Item label="Nome do Aluno">
                  {aluno[0].nome}
                </Descriptions.Item>
                <Descriptions.Item label="E-mail do Aluno">
                  {aluno[0].email}
                </Descriptions.Item>
                <Descriptions.Item label="Data da aula">
                  {aulasApi?.inicioAula}
                </Descriptions.Item>
                <Descriptions.Item label="Aula">
                  {aulasApi?.nomeAula}
                </Descriptions.Item>
                <Descriptions.Item label="Professor">
                  {professores?.nome}
                </Descriptions.Item>
                <Descriptions.Item label="Semestre">8°</Descriptions.Item>
              </Descriptions>
              <Selecoes>
                <TempoFrame>
                  <h3>Selecione o intervalo de tempo: </h3>
                  <Radio.Group onChange={onIntervaloChange} value={value}>
                    <Radio value={1}>Todos</Radio>
                    <Radio value={10}>10s</Radio>
                    <Radio value={30}>30s</Radio>
                    <Radio value={60}>1min</Radio>
                    <Radio value={300}>5min</Radio>
                    <Radio value={600}>10min</Radio>
                  </Radio.Group>
                </TempoFrame>
                <InfoAluno />
              </Selecoes>

              <div className="videoEmocoes">
                <ReactPlayer
                  ref={player}
                  onProgress={(e) => {
                    // onCurrentTimeChange(e);
                    // console.log(e)
                    // showImage()
                  }}
                  controls={showControl}
                  url={aulasApi?.urlVideo}
                  className="area-video"
                />
                <div className="emocaoPredominante">
                  <h3>Emoção Predominante: {emocao}</h3>
                  <h4>
                    {countEmocoes[0].string} - {countEmocoes[0].porcentagem}
                  </h4>
                  <h4>
                    {countEmocoes[6].string} - {countEmocoes[6].porcentagem}
                  </h4>
                  <h4>
                    {countEmocoes[3].string} - {countEmocoes[3].porcentagem}
                  </h4>
                  <h4>
                    {countEmocoes[5].string} - {countEmocoes[5].porcentagem}
                  </h4>
                  <h4>
                    {countEmocoes[4].string} - {countEmocoes[4].porcentagem}
                  </h4>
                  <h4>
                    {countEmocoes[2].string} - {countEmocoes[2].porcentagem}
                  </h4>
                  <h4>
                    {countEmocoes[1].string} - {countEmocoes[1].porcentagem}
                  </h4>
                </div>
              </div>
              <h4 className="infoSlider">
                Arraste para o lado
                <ArrowRightOutlined
                  style={{ fontSize: '16px', color: 'black' }}
                />
              </h4>

              <Slider {...settings} className="container">
                {result.map((frame, i) => {
                  // INTERVALO DE TEMPO PARA EXIBIR A REACAO
                  // console.log(i * intervalo);
                  const index = i * intervalo;
                  if (result[i * intervalo] === null) {
                    console.log('null', result[i * intervalo]);
                  }

                  if (result[i * intervalo] !== undefined) {
                    // console.log('intervalo: ', index, result[i * intervalo]);
                    return (
                      <>
                        <img
                          src={result[i * intervalo].urlFrame}
                          alt="emocao do aluno"
                          className="imagem"
                        />
                        <h2>
                          {result[i * intervalo].emocao} -{' '}
                          {result[i * intervalo].tempoFrame}
                        </h2>
                      </>
                    );
                  }
                  return null;
                })}
              </Slider>
              {console.log(result)}
              {result.length > 1 && (
                <Slider {...settings} className="container">
                  {resultAll.map((frame, i) => {
                    // RESULT 2
                    const index = i * intervalo;
                    if (resultAll[i * intervalo] === null) {
                      console.log('null', resultAll[i * intervalo]);
                    }

                    return null;
                  })}
                </Slider>
              )}
            </Jooj>
          </Content>
        </Layout>
      </Container>
    </>
  );
};

export default Report;
