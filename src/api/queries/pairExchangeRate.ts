import { useQuery } from "react-query";
import { UseQueryOptions } from "react-query/types/react/types";

import { axiosInstance, AxiosError } from "api/axios";
import { API_KEY, BASE_URL } from "constants/index";

import { PairRateParams, PairExchangeRateResponse } from "types";

export const getPairExchangeRateQueryKey = (params: PairRateParams) => [
  "pair",
  params,
];

const getPairExchangeRateRequest = async ({
  from,
  to,
  amount,
}: PairRateParams) => {
  const { data } = await axiosInstance.get<PairExchangeRateResponse>(
    `${BASE_URL}${API_KEY}/pair/${from}/${to}/${amount}`
  );
  return data;
};

export const usePairExchangeRateQuery = (
  params: PairRateParams,
  config?: UseQueryOptions<PairExchangeRateResponse, AxiosError>
) =>
  useQuery<PairExchangeRateResponse, AxiosError>({
    queryKey: getPairExchangeRateQueryKey(params),
    queryFn: () => getPairExchangeRateRequest(params),
    ...config,
  });
