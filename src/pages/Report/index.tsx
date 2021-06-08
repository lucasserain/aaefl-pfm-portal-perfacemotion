import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import {
  Layout,
  Descriptions,
  Radio,
  Menu,
  Dropdown,
  Button,
  Input,
  Result,
} from 'antd';
import Icon, {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DownOutlined,
  UserOutlined,
  ArrowRightOutlined,
  ConsoleSqlOutlined,
} from '@ant-design/icons';
import {
  Container,
  Contents,
  Background,
  Jooj,
  Selecoes,
  TempoFrame,
  InfoAluno,
} from './styles';

import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const { Header, Footer, Sider, Content } = Layout;

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
            <Menu.Item key="0">
              <a href="0">{aulas[i].nomeAula}</a>
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

const menuAula = aulas.map((frame, i) => {
  if (aulas[i] === null) {
    console.log('null', aulas[i]);
    return (
      <Menu>
        <Menu.Item key="0">
          <a href="0">Sem aulas</a>
        </Menu.Item>
      </Menu>
    );
  }

  if (aulas[i] !== undefined) {
    // console.log('intervalo: ', index, result[i * intervalo]);
    return (
      <Menu>
        <Menu.Item key="0">
          <a href="0">{aulas[i].nomeAula}</a>
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <Menu>
      <Menu.Item key="0">
        <a href="0">Sem aulas</a>
      </Menu.Item>
    </Menu>
  );
});
/** 
  <Menu>
    <Menu.Item key="0">
      <a href="1">{aula[0].nomeAula}</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="2">{aula[1].nomeAula}</a>
    </Menu.Item>
    <Menu.Item key="3">
      <a href="3">Cortando o bacon e linguiça - 05/03/2021</a>
    </Menu.Item>
    <Menu.Item key="4">
      <a href="4">Colocando no fogo - 23/03/2021</a>
    </Menu.Item>
    <Menu.Item key="5">
      <a href="5">Adicionando o tempero - 07/04/2021</a>
    </Menu.Item>
    <Menu.Item key="6">
      <a href="6">Servindo - 25/04/2021</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="7">Todas as aulas</Menu.Item>
  </Menu> */

const menuSemestre = (
  <Menu>
    <Menu.Item key="0">
      <a href="1">Semestre 1</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="2">Semestre 2</a>
    </Menu.Item>
    <Menu.Item key="3">
      <a href="3">Semestre 3</a>
    </Menu.Item>
    <Menu.Item key="4">
      <a href="4">Semestre 4</a>
    </Menu.Item>
    <Menu.Item key="5">
      <a href="5">Semestre 5</a>
    </Menu.Item>
    <Menu.Item key="6">
      <a href="6">Semestre 6</a>
    </Menu.Item>
    <Menu.Item key="7">
      <a href="7">Semestre 7</a>
    </Menu.Item>
    <Menu.Item key="8">
      <a href="8">Semestre 8</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="9">Todos</Menu.Item>
  </Menu>
);

const menuMateria = (
  <Menu>
    <Menu.Item key="0">
      <a href="1">Banco de Dados</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="2">Calculo 2</a>
    </Menu.Item>
    <Menu.Item key="3">
      <a href="3">Sociologia</a>
    </Menu.Item>
    <Menu.Item key="4">
      <a href="4">Orientação a Objetos</a>
    </Menu.Item>
    <Menu.Item key="5">
      <a href="5">TCC 2</a>
    </Menu.Item>
    <Menu.Item key="6">
      <a href="6">Gestão de Software</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="7">Todas as matérias</Menu.Item>
  </Menu>
);

const resultDefault = [
  {
    cod_frame: '',
    dt_alte: '',
    dt_cria: '',
    name: '-',
    ra: '-',
    url_frame: '',
    emocao: '',
  },
];

const Report = () => {
  const [value, setValue] = useState(1);
  const [showControl, setShowControl] = useState(true);
  const [nomeAluno, setNomeAluno] = useState('');
  const [emocao, setEmocao] = useState('');
  const [intervalo, setIntervalo] = useState(1);
  const [intervalo2, setIntervalo2] = useState(0);

  const [curr, setCurr] = useState(0);

  const [aula, setAula] = useState([
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

  const countEmocoes = [
    {
      countEmocao: 0,
      string: 'Alegria',
      porcentagem: '15%',
    },
    {
      countEmocao: 0,
      string: 'Tristeza',
      porcentagem: '1%',
    },
    {
      countEmocao: 0,
      string: 'Surpresa',
      porcentagem: '9%',
    },
    {
      countEmocao: 0,
      string: 'Neutro',
      porcentagem: '70%',
    },
    {
      countEmocao: 0,
      string: 'Raiva',
      porcentagem: '2%',
    },
    {
      countEmocao: 0,
      string: 'Nojo',
      porcentagem: '1%',
    },
    {
      countEmocao: 0,
      string: 'Medo',
      porcentagem: '2%',
    },
  ];
  const player = useRef<ReactPlayer>(null);

  const getEmocaoPredominante = (resultado: any[]) => {
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

    setEmocao(predominante);

    countEmocoes[0].porcentagem = ((countEmocoes[0].countEmocao / total) * 100)
      .toString()
      .concat('%');
    countEmocoes[1].porcentagem = ((countEmocoes[1].countEmocao / total) * 100)
      .toString()
      .concat('%');
    countEmocoes[2].porcentagem = ((countEmocoes[2].countEmocao / total) * 100)
      .toString()
      .concat('%');
    countEmocoes[3].porcentagem = ((countEmocoes[3].countEmocao / total) * 100)
      .toString()
      .concat('%');
    countEmocoes[4].porcentagem = ((countEmocoes[4].countEmocao / total) * 100)
      .toString()
      .concat('%');
    countEmocoes[5].porcentagem = ((countEmocoes[5].countEmocao / total) * 100)
      .toString()
      .concat('%');
    countEmocoes[6].porcentagem = ((countEmocoes[6].countEmocao / total) * 100)
      .toString()
      .concat('%');

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

  const getAulaInfo = async (idDisciplina: any) => {
    await fetch(
      `https://aaefl-pfm-api-midias.herokuapp.com/disciplina/${idDisciplina}/aulas`, // eae67ff6-0da1-4bb8-a0e4-672dcdfc34cd
    )
      .then((results) => results.json())
      .then((results) => {
        if (results.length > 0) {
          setAula(results);
          console.log('aula: ', results);
        } else {
          setNomeAluno('Emoção não encontrada!');
        }
      })
      .catch((temErro) => {
        console.log('erro: ', temErro);
        setNomeAluno('Erro na api');
      });
  };

  const getEmotionInfo = async (
    idDisciplina: any,
    idAula: any,
    idAluno: any,
  ) => {
    await fetch(
      `https://aaefl-pfm-api-midias.herokuapp.com/relatorios/${idDisciplina}?idAula=${idAula}&idAluno=${idAluno}`,
    )
      .then((results) => results.json())
      .then((results) => {
        console.log(
          `https://aaefl-pfm-api-midias.herokuapp.com/relatorios/${idDisciplina}?idAula=${idAula}&idAluno=${idAluno}`,
        );
        setNomeAluno('Carregando...');
        if (results.length >= 0) {
          // talvez usar o codigo do kejo (discord, index.js) para ordernar o tempo
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

  const getStudentInfo = async (nome: any) => {
    await fetch(
      `https://aaefl-pfm-api-midias.herokuapp.com/usuarios/?nome=${nome}`,
    )
      .then((estudante) => estudante.json())
      .then((estudante) => {
        if (estudante.length > 0) {
          setAluno(estudante);
          console.log('Aluno: ', estudante);
          getEmotionInfo(
            '8462bb48-0d8a-46cf-88f4-648fc5b41180',
            '2c026be0-f169-4d21-b34e-2e0d1f36dab3',
            aluno[0].codUsuario,
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

  useEffect(() => {
    // getEmocaoPredominante(result);
    // getEmocaoPredominanteIntervalo(result, 2);
    // setEmocao(); // getStudentInfo
    getAulaInfo('eae67ff6-0da1-4bb8-a0e4-672dcdfc34cd');
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
                <Descriptions.Item label="Nome">
                  {aluno[0].nome}
                </Descriptions.Item>
                <Descriptions.Item label="E-mail">
                  {aluno[0].email}
                </Descriptions.Item>
                <Descriptions.Item label="Data">
                  18 de Abril de 2021
                </Descriptions.Item>
                <Descriptions.Item label="Aula">
                  Internet das Coisas
                </Descriptions.Item>
                <Descriptions.Item label="Professor">
                  Guilherme Wachs
                </Descriptions.Item>
                <Descriptions.Item label="Semestre">8°</Descriptions.Item>
              </Descriptions>
              <Selecoes>
                <TempoFrame>
                  <h3>Selecione o intervalo de tempo: </h3>
                  <Radio.Group onChange={onIntervaloChange} value={value}>
                    <Radio value={2}>2s</Radio>
                    <Radio value={30}>30s</Radio>
                    <Radio value={60}>1min</Radio>
                    <Radio value={300}>5min</Radio>
                    <Radio value={1}>Todos</Radio>
                  </Radio.Group>
                </TempoFrame>
                <InfoAluno>
                  <Dropdown overlay={teste} trigger={['click']}>
                    <Button
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()} /* setAula() */
                    >
                      Aula <DownOutlined />
                    </Button>
                  </Dropdown>
                </InfoAluno>
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
                  url="https://youtu.be/hmQSYY01iWs"
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
            </Jooj>
          </Content>
        </Layout>
      </Container>
    </>
  );
};

export default Report;

/*
<Dropdown overlay={menuSemestre} trigger={['click']}>
                    <Button
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Semestre <DownOutlined />
                    </Button>
                  </Dropdown>
*/
/*
<Dropdown overlay={menuMateria} trigger={['click']}>
                    <Button
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Matéria <DownOutlined />
                    </Button>
                  </Dropdown>
                  */
// <h3>{getEmocaoPredominante(result)}</h3>

// <img src="C:\Users\andre\Desktop\TCC\edu.jpg" alt="emocao do aluno" className='imagem'/>
// <img src={edu} alt="emocao do aluno" className='imagem' />
// <img src={result[0].url_frame} alt="emocao do aluno" className='imagem'/>
// <h2>{result[0].emocao}</h2>
// <img src={result[1].url_frame} alt="emocao do aluno" className='imagem' />

/* { <Player className="area-video"
                  playsInline
                  poster="/assets/poster.png"
                  onChange={onChange}
                  src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
                    <BigPlayButton position="center" />
                    <ControlBar autoHide={false} className="display-bar">
                      <VolumeMenuButton vertical />
                    </ControlBar>
                </Player> } */
