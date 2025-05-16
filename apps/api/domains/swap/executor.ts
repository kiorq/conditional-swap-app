import { eq } from "drizzle-orm";
import { swapRequests } from "../../lib/db/schema";
import {
  MarketTokenExchangeRate,
  SwapRequest,
  SwapRequestStatus,
} from "./models";
import { db } from "../../lib/db";

export async function executeSwap(
  swapRequest: SwapRequest,
  tokenExchangeRate: MarketTokenExchangeRate
): Promise<void> {
  await db
    .update(swapRequests)
    .set({
      status: SwapRequestStatus.FULFILLED,
    })
    .where(eq(swapRequests.id, swapRequest.id));
  console.log(
    `Swap request ${swapRequest.id} executed as ${swapRequest.toAmount} ${swapRequest.toToken} for ${swapRequest.fromAmount} ${swapRequest.fromToken}`
  );
}
