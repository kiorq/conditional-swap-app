import { MarketTokenExchangeRate, SwapRequest } from "./models";

export async function executeSwap(
  swapRequest: SwapRequest,
  tokenExchangeRate: MarketTokenExchangeRate
): Promise<void> {
  // TODO: swaping logic (update db)
}
