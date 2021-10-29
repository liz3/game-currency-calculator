import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  outline: none;
  color: #fefefe;
  border: none;
  padding: 6px;
  border-radius: 5px;
  background-color: #3e3e3e;
  font-size: 16px;
`;

const Input = (props) => {
  return <InputStyle {...props} />;
};
export default Input;
