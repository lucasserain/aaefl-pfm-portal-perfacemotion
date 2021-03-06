import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 2px solid #232129;

  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: #07e8fc;
      border-color: #07e8fc;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #07e8fc;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #ffffff;

    &::placeholder {
      color: #9a9f9f;
    }
  }
  svg {
    margin-right: 16px;
  }
`;
