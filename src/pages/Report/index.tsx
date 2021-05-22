import React, {
  useRef,
  useCallback,
  useState,
  Component,
  lazy,
  useEffect,
  Children,
} from 'react';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import {
  Statistic,
  Card,
  Row,
  Col,
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
import api from '../../services/api';
import './index.css';
import edu from '../../styles/edu.jpg';
import serain from '../../styles/serain.png';
import serain1 from '../../styles/8.png';
import rock from '../../styles/rock.jpg';

const { Header, Footer, Sider, Content } = Layout;

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

const menuAula = (
  <Menu>
    <Menu.Item key="0">
      <a href="1">Introducao - 02/02/2021</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="2">Separando o feijão preto - 14/02/2021</a>
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
  </Menu>
);

const result2 = [
  {
    cod_frame: '004bdc55',
    dt_alte: '2021-08-05 19:28:42',
    dt_cria: '0:15',
    name: 'Eduardo',
    ra: '222170274',
    url_frame: 'edu',
    emocao: 'Alegria',
  },
  {
    cod_frame: '004bdc55',
    dt_alte: '2021-08-05 19:28:42',
    dt_cria: '0:20',
    name: 'Serain',
    ra: '222170274',
    url_frame:
      'https://lucasserain.s3.us-east-2.amazonaws.com/62a49d64-9c23-4a66-9b33-811ddc5c557e',
    emocao: 'Medo',
  },
  {
    cod_frame: '004bdc55',
    dt_alte: '2021-08-05 19:28:42',
    dt_cria: '0:25',
    ra: '222170274',
    name: 'Serain 1',
    url_frame: 'serain1',
    emocao: 'Tristeza',
  },
  {
    cod_frame: '004bdc55',
    dt_alte: '2021-08-05 19:28:42',
    dt_cria: '0:15',
    name: 'Eduardo',
    ra: '222170274',
    url_frame: 'rock',
    emocao: 'Nojo',
  },
  {
    cod_frame: '004bdc55',
    dt_alte: '2021-08-05 19:28:42',
    dt_cria: '0:20',
    name: 'Serain',
    ra: '222170274',
    url_frame: 'serain',
    emocao: 'Medo',
  },
  {
    cod_frame: '004bdc55',
    dt_alte: '2021-08-05 19:28:42',
    dt_cria: '0:25',
    ra: '222170274',
    name: 'Serain 1',
    url_frame: 'serain1',
    emocao: 'Tristeza',
  },
];

const lool = [
  {
    student: {
      name: 'Serain',
    },
    frame: [
      {
        cod_frame: '004bdc55',
        dt_alte: '2021-08-05 19:28:42',
        dt_cria: '0:20',
        ra: '222170274',
        url_frame:
          'https://lucasserain.s3.us-east-2.amazonaws.com/62a49d64-9c23-4a66-9b33-811ddc5c557e',
        emocao: 'Medo',
      },
      {
        cod_frame: '004bdc55',
        dt_alte: '2021-08-05 19:28:42',
        dt_cria: '0:25',
        ra: '222170274',
        url_frame:
          'https://lucasserain.s3.us-east-2.amazonaws.com/62a49d64-9c23-4a66-9b33-811ddc5c557e',
        emocao: 'Medo',
      },
    ],
  },
  {
    student: {
      name: 'Cleita',
    },
    frame: [
      {
        cod_frame: '004bdc55',
        dt_alte: '2021-08-05 19:28:42',
        dt_cria: '0:20',
        ra: '222170274',
        url_frame:
          'https://static.maislaser.com.br/media/catalog/product/cache/2/thumbnail/900x900/9df78eab33525d08d6e5fb8d27136e95/r/o/rosto_1_2.jpg',
        emocao: 'Medo',
      },
      {
        cod_frame: '004bdc55',
        dt_alte: '2021-08-05 19:28:42',
        dt_cria: '0:20',
        ra: '222170274',
        url_frame:
          'https://julianafonte.com.br/wp-content/uploads/2018/02/dermato-estetica-macas-do-rosto.jpg',
        emocao: 'Tristeza',
      },
      {
        cod_frame: '004bdc55',
        dt_alte: '2021-08-05 19:28:42',
        dt_cria: '0:20',
        ra: '222170274',
        url_frame:
          'https://i.pinimg.com/originals/8b/37/aa/8b37aa8a10687703735ea9389085adc2.jpg',
        emocao: 'Medo',
      },
    ],
  },
];

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

const getEmocaoPredominante2 = (resultado: any[]) => {
  console.log('hm: ', resultado[0].emocao);

  const countEmocoes = [
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
  countEmocoes.forEach((emocao) => {
    if (emocao.countEmocao > maior) {
      maior = emocao.countEmocao;
      predominante = emocao.string;
    }
  });

  console.log('predominante: ', predominante);

  console.log('Vezes Emoção: ', total);

  return predominante;
};

const Report = () => {
  const [value, setValue] = useState(1);
  const [showControl, setShowControl] = useState(true);
  const [nomeAluno, setNomeAluno] = useState('');
  const [emocao, setEmocao] = useState('');
  const [intervalo, setIntervalo] = useState(1);
  const [intervalo2, setIntervalo2] = useState(0);

  const [curr, setCurr] = useState(0);

  const [result, setResult] = useState([
    {
      cod_frame: '',
      dt_alte: '',
      dt_cria: '',
      name: '',
      ra: '',
      url_frame: '',
      emocao: '',
    },
  ]);

  const player = useRef<ReactPlayer>(null);

  const getEmocaoPredominante = (resultado: any[]) => {
    console.log('hm: ', resultado[0]);

    const countEmocoes = [
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

    setEmocao(predominante);
    console.log('predominante: ', emocao);
    console.log('Vezes Emoção: ', total);

    return predominante;
  };

  useEffect(() => {
    // getStudentInfo("jooj");
    getEmocaoPredominante(result);
    // setEmocao(); // getStudentInfo
  }, [result]);
  // quando colocar um estado no [], ele chama dnv quando ele mudar

  const getStudentInfo = async (studentStr: any) => {
    await fetch(
      `https://6099bb140f5a13001721992c.mockapi.io/api/tccFake/jooj?search=${studentStr}`,
    ) // nome=${studentStr}
      .then((results) => results.json())
      .then((results) => {
        if (results.length > 0) {
          setResult(results);
          console.log('jooj: ', results);
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

  // const showImage = () => {
  //   result.forEach(frame => {
  //     console.log(player.current?.getCurrentTime().toFixed(0), "=", parseFloat(frame.dt_cria).toFixed(0))
  //     if (player.current?.getCurrentTime().toFixed(0) === parseFloat(frame.dt_cria).toFixed(0)) {

  //       console.log(frame.emocao)
  //       console.log("ACHOU!")
  //       return (
  //         <>
  //           <img src={edu} alt="emocao do aluno" className='imagem' />
  //           <h2>{result[0].emocao}</h2>
  //         </>
  //       )
  //     }
  //     return (
  //       <>
  //       </>
  //     )
  //   })
  // }

  const onCurrentTimeChange = (e: any) => {
    result.forEach((frame) => {
      console.log(
        e.playedSeconds.toFixed(0),
        '=',
        parseFloat(frame.dt_cria).toFixed(0),
      );
      if (e.playedSeconds.toFixed(0) === parseFloat(frame.dt_cria).toFixed(0)) {
        console.log(frame.emocao);
        console.log('ACHOU!');
        // showImage();
      }
    });
  };

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
    dots: true,
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
              <Descriptions title="Informações do Aluno">
                <Descriptions.Item label="Nome">
                  {result[0].name}
                </Descriptions.Item>
                <Descriptions.Item label="RA">{result[0].ra}</Descriptions.Item>
                <Descriptions.Item label="Cidade">
                  São Bernardo do Campo, São Paulo
                </Descriptions.Item>
                <Descriptions.Item label="Aula">Feijoada</Descriptions.Item>
                <Descriptions.Item label="Professor">Bisteca</Descriptions.Item>
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
                  <Dropdown overlay={menuSemestre} trigger={['click']}>
                    <Button
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Semestre <DownOutlined />
                    </Button>
                  </Dropdown>
                  <Dropdown overlay={menuMateria} trigger={['click']}>
                    <Button
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      Matéria <DownOutlined />
                    </Button>
                  </Dropdown>
                  <Dropdown overlay={menuAula} trigger={['click']}>
                    <Button
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
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
                  url="https://www.youtube.com/watch?v=cavs2Ju8u6U"
                  className="area-video"
                />
                <div className="emocaoPredominante">
                  <h3>Emoção Predominante:</h3>
                  <h4>{emocao}</h4>
                </div>
              </div>
              <h4 className="infoSlider">
                Arraste para o lado
                <ArrowRightOutlined
                  style={{ fontSize: '16px', color: 'black' }}
                />
              </h4>

              <Slider {...settings} className="container">
                {/* {result.forEach(() => {
                  setCurr(curr + intervalo);
                  if(curr <= result.length - 1){
                    // setResult(result);
                    return (
                      <>
                        <img src={result[curr].url_frame} alt="emocao do aluno" className='imagem' />
                        <h2>{result[curr].emocao} - {result[curr].dt_cria}</h2>
                      </>
                    )
                  }
                  return (<> </>)
                })} */}

                {result.map((frame, i) => {
                  // INTERVALO DE TEMPO PARA EXIBIR A REACAO
                  console.log(i * intervalo);
                  const index = i * intervalo;
                  if (index === 0) console.log(result[i * intervalo]);

                  if (result[i * intervalo] !== undefined) {
                    return (
                      <>
                        <img
                          src={result[i * intervalo].url_frame}
                          alt="emocao do aluno"
                          className="imagem"
                        />
                        <h2>
                          {result[i * intervalo].emocao} -{' '}
                          {result[i * intervalo].dt_cria}
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
