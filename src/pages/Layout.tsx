import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components/macro";
import React, { ChangeEvent } from "react";
import { Path } from "../constants";
import { CurrencySelect } from "../components";

interface LayoutProps {
  currency: string;
  currencyList: string[];
  onSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  background: #ffc107;
`;
const Navlink = styled(NavLink)`
  margin-right: 32px;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;

  &.active {
    color: #3f51b5;
  }
`;

const Main = styled.main`
  padding: 24px;
`;

export const Layout = (props: LayoutProps) => {
  return (
    <div>
      <Header>
        <div>
          <Navlink to={Path.main.index}>Home</Navlink>
          <Navlink to={Path.main.allExchange}>All exchange</Navlink>
        </div>
        <CurrencySelect name="mainCurrencySelect" {...props} />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};
