import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.div`
  height: 80px;
  padding: 0 30px;
  background: #4128ba;
  color: #fff;
  display: flex;
  align-items: center;

  a {
    font-size: 20px;
    display: inline;
  }

  > a {
    color: #ffffff;
    display: block;
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
export const Container = styled.div`
  height: 100vh;
  align-items: stretch;
  background-color: #ffffff;
  border-radius: 10px;
`;

export const TitleHeader = styled.div`
  color: #000000;
  flex: 1;
  margin-right: 120px;
  h1 {
    font-size: 25px;
    padding-left: 300px;
    display: inline;
  }
  p {
    margin-top: 8px;
    padding-left: 300px;
    color: #000000;
    display: flex;
    align-items: center;
    font-weight: 500;
    span {
      display: flex;
      align-items: center;
    }
    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #000000;
      margin: 0 8px;
    }
  }
`;

export const VideoClassPlayer = styled.div`
  display: flex;
  flex-direction: line;
  align-items: left;
  padding-left: 300px;
  margin-top: 25px;
  .react-player {
    border-radius: 2rem;
    overflow: hidden;
  }
  p {
    margin-top: 8px;
    padding-left: 100px;
    color: #000000;
    align-items: center;
    font-weight: 500;
    max-width: 800px;
    span {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #000000;
      margin: 0 8px;
    }
  }
`;

export const VideoCaptureWeb = styled.div`
  display: flex;
  flex-direction: left;
  align-items: left;
  padding-left: 1450px;
  margin-top: -150px;
  .video-recorder {
    border-radius: 2rem;
    overflow: hidden;
    width: 300px;
  }
  .btnSend {
    background-color: 4128ba;
    border: 0px;
  }
`;

export const Content = styled.div`
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
      font-size: 100px;
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
  background-size: cover;
`;
