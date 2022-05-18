import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { getFromLocalStorage } from "utils";
import { CURRENCY } from "../constants";
import { CurrencySelect } from "components";
import { usePairExchangeRateQuery } from "api";
import styled from "styled-components/macro";

interface HomePageProps {
  currencyList: string[];
}

const Wrapper = styled.div`
  display: flex;

  form {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    input {
      padding: 6px 12px;
      border-radius: 5px;
      border: 1px solid dimgrey;
    }

    input,
    select,
    span {
      margin-right: 8px;
      text-align: center;
    }

    span.hint {
      font-weight: bold;
    }
  }
`;

export const HomePage = ({ currencyList }: HomePageProps): ReactElement => {
  const currencyFromLocalStorage = getFromLocalStorage(CURRENCY);

  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState(currencyFromLocalStorage);
  const [to, setTo] = useState(currencyFromLocalStorage);
  const { data, refetch: fetchRateData } = usePairExchangeRateQuery(
    { from, to, amount: +amount },
    { enabled: false }
  );

  const handleSetAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  const handleSetFrom = async (event: ChangeEvent<HTMLSelectElement>) => {
    setFrom(event.target.value);
  };
  const handleSetTo = (event: ChangeEvent<HTMLSelectElement>) => {
    setTo(event.target.value);
  };

  useEffect(() => {
    if (amount) {
      fetchRateData();
    }
  }, [amount, fetchRateData, from, to]);

  return (
    <Wrapper>
      <form>
        <input
          id="amount"
          type={"number"}
          value={amount}
          onChange={handleSetAmount}
        />
        <CurrencySelect
          name="from"
          currency={from}
          currencyList={currencyList}
          onSelect={handleSetFrom}
        />
        <span className="hint">in</span>
        <CurrencySelect
          name="to"
          currency={to}
          currencyList={currencyList}
          onSelect={handleSetTo}
        />
        {data?.result && (
          <p>
            <span className="hint">Result:</span>{" "}
            {data.conversion_result.toFixed(2)} {to}
          </p>
        )}
      </form>
    </Wrapper>
  );
};
