import { eq, desc, gte, or, and, lte } from "drizzle-orm";
import { db } from "../../lib/db";
import {
  MarketTokenExchangeRate,
  SwapRequest,
  SwapRequestStatus,
} from "./models";
import { swapRequests } from "../../lib/db/schema";

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
  const _swapRequests = await db.query.swapRequests.findMany({
    where: and(
      eq(swapRequests.status, SwapRequestStatus.PENDING),
      eq(swapRequests.fromToken, tokenExchangeRate.fromToken),
      eq(swapRequests.toToken, tokenExchangeRate.toToken),
      gte(swapRequests.startDate, tokenExchangeRate.timestamp),
      lte(swapRequests.endDate, tokenExchangeRate.timestamp)
    ),
    with: {
      fromToken: true,
      toToken: true,
    },
    orderBy: [desc(swapRequests.createdAt)],
    limit: 10,
  });

  return _swapRequests.map((swapRequest) => {
    return new SwapRequest({
      id: swapRequest.id,
      status: swapRequest.status as SwapRequestStatus,
      fromToken: swapRequest.fromToken,
      toToken: swapRequest.toToken,
      fromAmount: swapRequest.fromAmount,
      toAmount: swapRequest.toAmount,
      minThreshold: swapRequest.minThreshold,
      startDate: swapRequest.startDate,
      endDate: swapRequest.endDate,
    });
  });
};
