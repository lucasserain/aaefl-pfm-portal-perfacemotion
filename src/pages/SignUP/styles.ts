import styled from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
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
    p {
      display: inline;
    }
    .radio-button {
      margin: 10px;

      input {
        opacity: 0;
        position: fixed;
        width: 0;

        &:checked + label {
          background-color: #07e8fc;
        }
      }
      label {
        display: inline-block;
        background-color: #04a4b2;
        padding: 10px 20px;
        font-family: sans-serif, Arial;
        font-size: 16px;
        border: 2px solid #444;
        border-radius: 4px;
        &:hover {
          background-color: #07e8fc;
        }
      }
    }
  }

  .termo-aceite {
    a {
      font-size: 12px;
      display: inline;
    }
    label {
      display: inline;
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
