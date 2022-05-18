import React from "react";
import styled from "styled-components/macro";
import { StandardExchangeRateResponse } from "../types";

interface Props {
  rates: StandardExchangeRateResponse["conversion_rates"];
  targetCurrency: string;
}

const List = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  li {
    display: flex;
    list-style: none;
    margin-bottom: 8px;
  }
`;

export const AllCurrencyExchange = ({ rates, targetCurrency }: Props) => {
  let ratesArr: { code: string; rate: number }[] = [];

  for (let key in rates) {
    ratesArr = [...ratesArr, { code: key, rate: rates[key] }];
  }

  return (
    <List>
      {ratesArr.map(({ code, rate }) => {
        const calculatedRate = (1 / rate).toFixed(3);

        return (
          <li key={code}>
            1 {code} = {calculatedRate} {targetCurrency}
          </li>
        );
      })}
    </List>
  );
};
