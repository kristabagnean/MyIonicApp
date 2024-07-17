import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useConfig } from '../hooks/useConfig';
import { Market } from '../models/market';
import { QueryKey } from '../utils/constants';

/**
 * An API hook which fetches the list of `Market` object.
 * @returns Returns a `UseQueryResult` with `Market` list data.
 */
export const useGetMarkets = () => {
  const config = useConfig();

  const getMarkets = async (): Promise<Market[]> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_URL_API}/s/mother/v1/market`,
    });
    console.log(`location "${response.data.data.markets[0].name}" with ${response.data.data.markets[0].status} status.`);
    return response.data.data.markets;
  };

  return useQuery({
    queryKey: [QueryKey.Markets],
    queryFn: () => getMarkets(),
  });
};
