import { useQuery } from "react-query";
import { UseQueryOptions } from "react-query/types/react/types";

import { axiosInstance, AxiosError } from "api/axios";
import { API_KEY, BASE_URL } from "constants/index";

import { StandardRateParams, StandardExchangeRateResponse } from "types";

export const getStandardExchangeRateQueryKey = (params: StandardRateParams) => [
  "standard",
  params,
];

const getStandardExchangeRateRequest = async ({
  currency,
}: StandardRateParams) => {
  const { data } = await axiosInstance.get<StandardExchangeRateResponse>(
    `${BASE_URL}${API_KEY}/latest/${currency}`
  );
  return data;
};

export const useStandardExchangeRateQuery = (
  params: StandardRateParams,
  config?: UseQueryOptions<StandardExchangeRateResponse, AxiosError>
) =>
  useQuery<StandardExchangeRateResponse, AxiosError>({
    queryKey: getStandardExchangeRateQueryKey(params),
    queryFn: () => getStandardExchangeRateRequest(params),
    ...config,
  });
