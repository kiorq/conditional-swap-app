import { MarketTokenExchangeRate } from "../swap/models";

export const lookupTokenExchangeRates = async (
  tokenPairs: {
    fromToken: string;
    toToken: string;
  }[]
): Promise<MarketTokenExchangeRate[]> => {
  return tokenPairs.map((tokenPair) => {
    // TODO: fetch from api
    const exchangeRate = Math.random() * 100;
    return new MarketTokenExchangeRate({
      id: "1",
      fromToken: tokenPair.fromToken,
      toToken: tokenPair.toToken,
      exchangeRate,
      timestamp: new Date(),
    });
  });
};
