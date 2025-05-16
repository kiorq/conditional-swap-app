import { MarketTokenExchangeRate } from "../swap/models";

export const lookupTokenExchangeRates = async (
  tokenPairs: {
    fromToken: string;
    toToken: string;
  }[]
): Promise<MarketTokenExchangeRate[]> => {
  // TODO: fetch from api

  return [
    new MarketTokenExchangeRate({
      id: "1",
      fromToken: tokenPairs[0].fromToken,
      toToken: tokenPairs[0].toToken,
      exchangeRate: 100,
      network: "mainnet",
      timestamp: new Date(),
    }),
  ];
};
