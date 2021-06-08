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
    background: rgb(220,176,244) no-repeat 70% top;
    background: linear-gradient(90deg, rgba(220,176,244,1) 2%, rgba(177,242,237,1) 55%, rgba(240,240,245,1) 100%);
    -webkit-font-smoothing: antialiased;
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
