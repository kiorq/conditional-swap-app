import { MarketTokenExchangeRate, SwapRequest } from "./data/models";

export async function executeSwap(
  swapRequest: SwapRequest,
  tokenExchangeRate: MarketTokenExchangeRate
): Promise<void> {
  // TODO: swaping logic (update db)
}
