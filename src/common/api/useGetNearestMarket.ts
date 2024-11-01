import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useConfig } from "../hooks/useConfig";
import { Market } from "../models/market";
import { QueryKey } from "../utils/constants";

import { Position } from "@capacitor/geolocation";
import { useEffect, useState } from "react";
import { NearestMarket } from "../models/nearestMarket";


/**
 * An API hook which fetches the list of `Market` object.
 * @returns Returns a `UseQueryResult` with `Market` list data.
 */
export const useGetNearestMarket = (location: Position | undefined) => {
  const [data, setData] = useState<NearestMarket>();
  useEffect(() => {
    if (location) {
      console.log(
        "---location found",
        location.coords.latitude,
        "loc va",
        location
      );
      const getNearestMarket = async (
        location: Position
      ): Promise<NearestMarket | undefined> => {
        if (!location) {
          return;
        }
        const response = await axios.request({
          url: `${config.VITE_BASE_URL_API}/s/mother/v1/nearest-cinema/${location.coords.latitude}/${location.coords.longitude}`,
        });
        console.log(`location "${response.data.data.market.name}"`);
        setData(response.data.data);
        return response.data.data;
      };
      getNearestMarket(location).catch((err) => {
        console.log("useGetNearestMarket failed to get data", err);
      });
    }
  }, [location]);
  const config = useConfig();

  return data;
};
