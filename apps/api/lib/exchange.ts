import { MarketTokenExchangeRate } from "./data/models";

export const lookupTokenExchangeRates = async (
  tokenPairs: {
    fromToken: string;
    toToken: string;
  }[]
): Promise<MarketTokenExchangeRate[]> => {
  // TODO: fetch from api

  return [
    new MarketTokenExchangeRate(
      "1",
      tokenPair[0].fromToken,
      tokenPair[0].toToken,
      100,
      "mainnet",
      new Date()
    ),
  ];
};
