import styled, { css } from 'styled-components';

import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

// Template literals
export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 200px;
  input {
    flex: 1;
    height: 70px;
    display: block;
    padding: 0 24px;
    margin-top: 10px;
    border: 0;
    border-radius: 5px 5px 5px 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;
    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}
    &::placeholder {
      color: #a8a8b3;
    }
  }
  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    align-items: center;
    border: 0px;
    border-radius: 5px 0 0 5px;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, '#03d361')};
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;
  a {
    background: rgb(220, 176, 244) no-repeat 70% top;
    background: linear-gradient(
      90deg,
      rgba(220, 176, 244, 1) 2%,
      rgba(177, 242, 237, 1) 55%,
      rgba(240, 240, 245, 1) 100%
    );
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    & + a {
      margin-top: 16px;
    }
    &:hover {
      transform: translateX(10px);
    }
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 20px;
        color: #3d4d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const ContentWrapper = styled.div`
  padding: 10px 10px;
  background-color: #fff;
  border-radius: 09px;

  .specialties-container {
    padding: 1em 0;
  }

  .specialties-container ul {
    display: flex;
    width: 90%;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-left: 0;
  }

  .specialties-container ul li {
    flex: 1 1 200px;
    list-style: none;
    text-align: center;
    padding: 20px;
  }

  .fas {
    font-size: 60px;
    margin-bottom: 15px;
  }
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px;
  width: calc(100% - 20px);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FooterNavItem = styled.a`
  color: purple;
  font-size: 12px;
  margin-right: 5px;
  &:hover {
    opacity: 0.6;
  }
`;

export const LeftSideNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const RightSideNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftSideForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  h1 {
    color: purple;
    margin-right: 2000px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const RightSideForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  h1 {
    color: purple;
    margin-left: 2000px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Logo = styled.img`
  margin-bottom: 20px;
  order: 2;

  @media (max-width: 768px) {
    order: 1;
  }
`;

export const Navigation = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 25px;
  width: 100%;
  background: rgb(116, 18, 227);
  background: linear-gradient(
    180deg,
    rgba(116, 18, 227, 1) 0%,
    rgba(186, 176, 244, 1) 100%,
    rgba(220, 176, 244, 1) 100%
  );

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NavigationHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NavItem = styled.a`
  color: white;
  font-size: 20px;
  margin: 0 15px 20px 0;
  padding: 10px;

  &:hover {
    opacity: 0.6;
  }
`;

export const LeftForm = styled.div`
  display: flex;
  width: 90%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
