import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";

const Container = styled.div`
  & > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  padding: 5px;
  border-radius: 5px;
  border: 1px solid rgba(210, 210, 210, 0.9);
`;
const Box = styled.div`
  margin: 0 15px;
  padding: 10px 0;
  & p {
    margin: 0 0 4px 0;
  }
`;

const AddChain = ({ onCreate, nameBefore, valueBefore }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [bonus, setBonus] = useState("");

  return (
    <Container>
      <div>
        <Box>
          <p>Name</p>
          <Input placeholder="Name of the currency" value={name} onChange={(ev) => setName(ev.target.value)} />
        </Box>
        <Box>
          <p>
            How much {name.length ? name : "of this"} does {valueBefore}{" "}
            {nameBefore} generate?
          </p>
          <Input placeholder="Amount of new currency" value={value} onChange={(ev) => setValue(ev.target.value)} />
        </Box>
        <Box>
          <p>Does {name.length ? name : "this currency"} have a bonus?</p>
          <Input placeholder="add bonus here" value={bonus} onChange={(ev) => setBonus(ev.target.value)} />
        </Box>
      </div>
      <Box>
        <Button
          onClick={() => {
            const parsed =
              Number.parseFloat(value) +
              (bonus.length ? Number.parseFloat(bonus) : 0);
            if (!name.length || Number.isNaN(parsed)) return;
            onCreate({
              name,
              value: parsed,
            });
            setValue("");
            setName("");
            setBonus("");
          }}
        >
          <span>Add</span>
        </Button>
      </Box>
    </Container>
  );
};
export default AddChain;
