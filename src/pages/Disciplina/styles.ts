import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;
export const RepositoryInfo = styled.section`
  margin-top: 80px;
  margin-left: 10px;

  header {
    display: flex;
    align-items: center;
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  div {
    margin-left: 24px;

    strong {
      font-size: 36px;
      color: white;
    }
    p {
      font-size: 18px;
      color: white;
      margin-top: 4px;
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }
      strong {
        display: block;
        font-size: 36px;
      }

      span {
        display: block;
        margin-top: 4px;
        color: white;
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;

  a {
    background: #fff;
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

export const Formulario = styled.div`
  margin-top: 50px;
  form {
    margin: 1px 0;
    width: 540px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #ffffff;
      display: block;
      margin-top: 14px;
      text-decoration: none;
      transition: color 0.2s;
    }
  }

  Input {
    height: 10%;
  }

  a {
    background: #fff;
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

    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 10px;
        color: #3d4d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
  }
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
