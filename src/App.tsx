import React, { ChangeEvent, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout, AllCurrencyExchange, HomePage } from "pages";
import { useStandardExchangeRateQuery } from "api";
import { CURRENCY, DEFAULT_CURRENCY, Path } from "./constants";
import { toast } from "react-hot-toast";
import { getFromLocalStorage, setToLocalStorage } from "./utils";

function App() {
  const currencyFromLocalStorage = getFromLocalStorage(CURRENCY);
  const [currency, setCurrency] = useState(
    currencyFromLocalStorage || DEFAULT_CURRENCY
  );
  const { data, isLoading } = useStandardExchangeRateQuery(
    { currency },
    {
      onError: (error) => toast.error(error.message),
    }
  );

  const currencyList =
    typeof data?.conversion_rates === "object"
      ? Object.keys(data?.conversion_rates)
      : [];

  const handleSetCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
    setToLocalStorage(CURRENCY, event.target.value);
  };

  if (isLoading) {
    return <>Loading....</>;
  }

  if (!data) {
    return <p>Oops! Something went wrong.</p>;
  }

  return (
    <Routes>
      <Route
        path={Path.main.index}
        element={
          <Layout
            currencyList={currencyList}
            currency={currency}
            onSelect={handleSetCurrency}
          />
        }
      >
        <Route index element={<HomePage currencyList={currencyList} />} />
        <Route
          path={Path.main.allExchange}
          element={
            <AllCurrencyExchange
              rates={data.conversion_rates}
              targetCurrency={currency}
            />
          }
        />
      </Route>
      <Route
        path="*"
        element={<Navigate to={Path.main.index} replace={true} />}
      />
    </Routes>
  );
}

export default App;
