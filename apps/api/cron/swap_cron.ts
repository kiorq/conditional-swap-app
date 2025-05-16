import { SwapCheckResult } from "../domains/swap/models";
import {
  queryActiveTokenPairs,
  queryPendingSwapRequests,
} from "../domains/swap/queries";
import { lookupTokenExchangeRates } from "../domains/exchange/service";
import { executeSwap } from "../domains/swap/executor";
import { validateSwapRequest } from "../domains/swap/validator";

const runSwapCron = async () => {
  console.log("Starting swap service cron job");
  const activeTokenPairs = await queryActiveTokenPairs();
  const tokenExchangeRates = await lookupTokenExchangeRates(activeTokenPairs);

  console.log(`Retrieved ${tokenExchangeRates.length} token exchange rates`);

  for (const tokenExchangeRate of tokenExchangeRates) {
    const pendingSwapRequests =
      await queryPendingSwapRequests(tokenExchangeRate);

    console.log(
      `Processing swap requests for ${tokenExchangeRate.fromToken} -> ${tokenExchangeRate.toToken} @ ${tokenExchangeRate.exchangeRate}`
    );

    for (const swapRequest of pendingSwapRequests) {
      try {
        const result = await validateSwapRequest(
          swapRequest,
          tokenExchangeRate
        );

        // handle the result
        switch (result) {
          case SwapCheckResult.EXECUTE_NOW:
            // TODO: execute swap
            await executeSwap(swapRequest, tokenExchangeRate);
            break;

          // should not happen, but just in case
          case SwapCheckResult.SKIP_ALREADY_FULFILLED:
            console.log(
              `Swap request ${swapRequest.id} is already fulfilled, skipping`
            );
            break;

          case SwapCheckResult.SKIP_EXPIRED:
            console.log(`Swap request ${swapRequest.id} is expired, skipping`);
            // TODO: update swap request
            break;

          case SwapCheckResult.SKIP_NOT_READY:
            console.log(
              `Swap request ${swapRequest.id} is not ready, skipping`
            );
            break;

          // catestrophic failure, should not happen
          case SwapCheckResult.TOKEN_MISMATCH:
            console.log(
              `Swap request ${swapRequest.id} has token mismatch, skipping`
            );
            // TODO: update swap request to invalid
            break;

          case SwapCheckResult.SKIP_INVALID:
            console.log(`Swap request ${swapRequest.id} is invalid, skipping`);
            // TODO: update swap request
            break;
        }
      } catch (error) {
        console.error(`Error processing swap request ${swapRequest.id}`, error);
        // TODO: update swap request to invalid
      }
    }
  }
};

export default runSwapCron;
