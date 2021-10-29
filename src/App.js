import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import AddChain from "./components/AddChain";
import Button from "./components/Button";
import Chain from "./components/Chain";
import Input from "./components/Input";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3vw;
  & > div {
    width: 90vw;
    max-width: 750px;
  }
`;
const BaseInputs = styled.div`
  border-bottom: 1px solid rgba(200, 200, 200, 1);
  & > div {
    display: flex;
    margin-bottom: 15px;
    & > div {
      margin-right: 15px;
    }
    & p {
      margin: 4px 0;
    }
  }
  & h3 {
    margin: 0;
  }
`;
const StyledSelect = styled.select`
  outline: none;
  color: #fefefe;
  border: none;
  padding: 6px;
  border-radius: 5px;
  background-color: #3e3e3e;
  font-size: 16px;
`;

const calc = (baseAmount, chains) => {
  const outs = [];
  for (const chain of chains) {
    const one = chain.value / baseAmount;
    const onePrice = 1 / one;
    outs.push({
      ...chain,
      one,
      onePrice,
    });
  }
  return outs;
};
const getInitalState = () => {
  const state = {
    chains: [],
    currency: "€",
    amount: 5,
  };
  if (!window.location.search || !window.location.search.length) return state;
  try {
    const parsed = JSON.parse(
      decodeURIComponent(escape(atob(window.location.search.substr(1))))
    );
    return {
      chains: parsed.c.map((entry) => ({
        name: entry[0],
        value: entry[1],
      })),
      currency: parsed.k,
      amount: parsed.a,
    };
  } catch (err) {
    return state;
  }
};
function App() {
  const parsed = getInitalState();
  const [chains, setChains] = useState(parsed.chains);
  const [currency, setCurrency] = useState(parsed.currency);
  const [moneyAmount, setMoneyAmount] = useState(parsed.amount);
  const result = calc(Number.parseFloat(moneyAmount), chains);
  const serialised = {
    a: moneyAmount,
    k: currency,
    c: chains.map((chain) => [chain.name, chain.value]),
  };
  return (
    <Container>
      <div>
        <h1>Game currencies calculator</h1>
        <p style={{ marginBottom: "45px" }}>
          A lot of games these days implement microtransactions often times over
          multiple currencies, this small website tries to help to reverse the
          real money amount.
          <br /> <br />
          How does it work?
          <br /> <br />
          You add a amount of real money and then create the currencies with how
          much each purchase is worth in the in game currency, once added you
          will see the 1 price of the real currency and a input where you can
          see how much a specific amount of that currency is worth in real
          money.{" "}
          <span style={{ fontWeight: 700 }}>
            Best of all? Everything updates in real time
          </span>
        </p>

        <BaseInputs>
          <h3>Real money input</h3>
          <div>
            <div>
              <p>Currency</p>
              <StyledSelect
                value={currency}
                onChange={(ev) => setCurrency(ev.target.value)}
              >
                <option value="€">€</option>
                <option value="kr">kr</option>
                <option value="$">$</option>
                <option value="Yen">Yen</option>
                <option value="CAD">CAD</option>
              </StyledSelect>
            </div>
            <div>
              <p>Amount</p>
              <Input
                value={moneyAmount}
                onChange={(ev) => setMoneyAmount(ev.target.value)}
              />
              <span> {currency}</span>
            </div>
          </div>
        </BaseInputs>

        <div>
          <h3 style={{ marginBottom: "4px" }}>Currencies</h3>
          {!chains.length ? (
            <p style={{ textAlign: "center", opacity: 0.6 }}>
              Add a currency and it will appear here
            </p>
          ) : null}
          {result.map((entry, index) => {
            return (
              <Chain
                key={index}
                oneReal={entry.one}
                oneAmount={entry.onePrice}
                fakeValue={entry.value}
                name={entry.name}
                currency={currency}
                onDelete={() => {
                  setChains(chains.filter((_, i) => i !== index));
                }}
              />
            );
          })}
          <h3 style={{ marginBottom: "4px" }}>Add currency</h3>
          <AddChain
            nameBefore={
              chains.length ? chains[chains.length - 1].name : currency
            }
            valueBefore={
              chains.length ? chains[chains.length - 1].value : moneyAmount
            }
            onCreate={(entry) => setChains([...chains, entry])}
          />
        </div>
        {chains.length ? (
          <div style={{ width: "100%" }}>
            <h2>Share this</h2>
            <Input
              style={{ width: "100%" }}
              onFocus={(ev) => ev.target.select()}
              value={`https://game-currency.org/?${btoa(
                unescape(encodeURIComponent(JSON.stringify(serialised)))
              )}`}
              readOnly
            />

            <Button style={{maxWidth: "120px", marginTop: "25px"}}>
              <a
                class="twitter-share-button"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `How much is this worth in real money: ${`https://game-currency.org/?${btoa(
                    unescape(encodeURIComponent(JSON.stringify(serialised)))
                  )}`}`
                )}`}
              >
                Share on twitter
              </a>
            </Button>
          </div>
        ) : null}
      </div>
    </Container>
  );
}

export default App;
