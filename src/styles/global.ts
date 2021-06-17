import { createGlobalStyle } from 'styled-components';
import githubBackground from '../assets/github-bg.svg';

export default createGlobalStyle`
  *{
    margin:0px;
    padding:0px;
    box-sizing:border-box;
    outline:0
  }


    body{
      background: rgb(116,44,217);
background: linear-gradient(90deg, rgba(116,44,217,1) 0%, rgba(41,140,218,0.6446953781512605) 59%, rgba(147,147,250,1) 80%);
  }


  body,input,button{
    font: 16px Roboto,sans-serif
  }

  h1,h2,h3,h4, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
