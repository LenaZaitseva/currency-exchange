import React, { ChangeEvent, ReactElement } from "react";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  select {
    padding: 6px 12px;
    border-radius: 5px;
    border: 1px solid dimgrey;
  }
`;

interface CurrencySelectProps {
  name: string;
  label?: string;
  currency: string;
  currencyList: string[];
  onSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function CurrencySelect({
  name,
  label,
  currency,
  onSelect,
  currencyList,
}: CurrencySelectProps): ReactElement {
  return (
    <Wrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <select id={name} value={currency} onChange={onSelect}>
        {currencyList.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}
