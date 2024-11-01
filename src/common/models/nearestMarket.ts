import { Cinema } from "./cinema";
import { Market } from "./market";

export type NearestMarket = {
  market: Market;
  cinema: Cinema;
  distanceInMiles: number;
};
