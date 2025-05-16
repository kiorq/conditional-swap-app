import { eq, desc, gte, or, and, lte, sql } from "drizzle-orm";
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
    count: number;
  }[]
> => {
  // group by {swapRequests.fromToken, swapRequests.toToken}
  return await db
    .select({
      fromToken: swapRequests.fromToken,
      toToken: swapRequests.toToken,
      count: sql<number>`count(*)`.as("count"),
    })
    .from(swapRequests)
    .where(
      and(
        eq(swapRequests.status, SwapRequestStatus.PENDING),
        lte(swapRequests.startDate, new Date()),
        gte(swapRequests.endDate, new Date())
      )
    )
    .groupBy(swapRequests.fromToken, swapRequests.toToken);
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
      lte(swapRequests.startDate, tokenExchangeRate.timestamp),
      gte(swapRequests.endDate, tokenExchangeRate.timestamp)
    ),
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
