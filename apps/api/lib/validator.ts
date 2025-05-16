import {
  MarketTokenExchangeRate,
  SwapCheckResult,
  SwapRequest,
  SwapRequestStatus,
} from "../data";

export const validateSwapRequest = (
  swapRequest: SwapRequest,
  currentMarketTokenExchangeRate: MarketTokenExchangeRate
) => {
  // from token mismatch
  if (swapRequest.fromToken !== currentMarketTokenExchangeRate.fromToken) {
    return SwapCheckResult.TOKEN_MISMATCH;
  }

  // to token mismatch
  if (swapRequest.toToken !== currentMarketTokenExchangeRate.toToken) {
    return SwapCheckResult.TOKEN_MISMATCH;
  }

  // already fulfilled
  if (swapRequest.status === SwapRequestStatus.FULFILLED) {
    return SwapCheckResult.SKIP_ALREADY_FULFILLED;
  }

  // cancelled request is invalid, we should not process it
  if (swapRequest.status === SwapRequestStatus.CANCELLED) {
    return SwapCheckResult.SKIP_INVALID;
  }

  // already expired
  if (swapRequest.endDate < currentMarketTokenExchangeRate.timestamp) {
    return SwapCheckResult.SKIP_EXPIRED;
  }

  // not ready (has not started yet)
  if (swapRequest.startDate >= currentMarketTokenExchangeRate.timestamp) {
    return SwapCheckResult.SKIP_NOT_READY;
  }

  // not ready (below min threshold)
  if (currentMarketTokenExchangeRate.exchangeRate < swapRequest.minThreshold) {
    return SwapCheckResult.SKIP_NOT_READY;
  }

  return SwapCheckResult.EXECUTE_NOW;
};
