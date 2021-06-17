import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  margin-left: 35%;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;

  span {
    cursor: pointer;
  }

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
  background-size: cover;
`;

const appearFromRight = keyframes`
from {
  opacity: 0;
  transform: translateX(50px);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromRight} 1s;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
    }
  }
  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    &:hover {
      color: ${shade(0.2, '#F4EDE8')};
    }
    svg {
      margin-right: 16px;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
