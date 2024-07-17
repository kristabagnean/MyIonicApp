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
