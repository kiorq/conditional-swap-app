import { MarketTokenExchangeRate, SwapRequest } from "./models";

export const queryActiveTokenPairs = async (): Promise<
  {
    fromToken: string;
    toToken: string;
  }[]
> => {
  return [];
};

// query database for pending swap requests
export const queryPendingSwapRequests = async (
  tokenExchangeRate: MarketTokenExchangeRate
): Promise<SwapRequest[]> => {
  return [];
};
