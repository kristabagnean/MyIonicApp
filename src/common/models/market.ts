/**
 * The `Market` type.
 */
export type Market = {
  id: string;
  slug: string;
  name: string;
  status: string;
  isOpenAccessSeasonPassMarket: boolean;
  isFoodPreorderRequired: boolean;
  foodPreorderAvailability: string;
  isMaxSafetyOperation: boolean;
};

export const enum MarketStatus {
  Open = "OPEN",
  PreOpen = "PRE_OPEN",
  Closed = "CLOSED",
  Unknown = "UNKNOWN",
}
