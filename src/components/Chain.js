import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";

const Container = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 5px;
  justify-content: space-between;
  border: 1px solid rgba(200,200,200, .7);
  margin-bottom: 15px;
  align-items: center;
  flex-wrap: wrap;
  & > div {
    & h3 {
      margin: 0 0 20px 0;
    }
    margin: 0 15px;
    padding: 10px 0;
  }
`;

const Chain = ({ name, oneAmount, oneReal, currency, fakeValue, onDelete }) => {
  const [value, setValue] = useState("0");
  return (
    <Container>
      <div>
        <h3>{name} </h3>
        <p>
          <span style={{fontWeight: 700}}>1</span> {currency}, is {oneReal.toFixed(3)} {name} (total: {fakeValue})
        </p>
        <div>
          <span>Calculate </span>
          <Input value={value} onChange={(ev) => setValue(ev.target.value)} />
          <span>
            {" "}
            is <span style={{fontWeight: 700}}>{(Number.parseFloat(value) * oneAmount).toFixed(3)} {currency}</span>
          </span>
        </div>
      </div>
      <div style={{marginRight: "15px"}}>
        <Button onClick={onDelete}>
            <span>Remove</span>
        </Button>
      </div>
    </Container>
  );
};
export default Chain;
