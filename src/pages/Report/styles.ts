import styled from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 300vh;
  margin: 60px;
  display: flex;
  align-items: stretch;
`;


export const Jooj = styled.div`
  height: 100vh;
  margin: 60px;
  display: flex;
  align-items: stretch;
  flex-direction: column;

  .area-video{
    
  }

  .video-react-video{
  }

`;

export const Selecoes = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const TempoFrame = styled.div`
  
`;

export const InfoAluno = styled.div`
    
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #ffffff;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#ffffff')};
      }
    }
  }

  > a {
    color: #07e8fc;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#07e8fc')};
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
