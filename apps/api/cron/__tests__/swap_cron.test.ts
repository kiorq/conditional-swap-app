import { addMinutes, subMinutes } from "date-fns";
import { SwapRequestStatus } from "../../lib/data/models";
import { MarketTokenExchangeRate, SwapRequest } from "../../lib/data/models";
import runSwapCron from "../swap_cron";
import {
  queryActiveTokenPairs,
  queryPendingSwapRequests,
} from "../../lib/data/query";
import { lookupTokenExchangeRates } from "../../lib/exchange";
import { executeSwap } from "../../lib/swap_executor";

// Mock the functions
jest.mock("../../lib/data/query", () => ({
  queryActiveTokenPairs: jest.fn().mockResolvedValue([]),
  queryPendingSwapRequests: jest.fn().mockResolvedValue([]),
}));

jest.mock("../../lib/exchange", () => ({
  lookupTokenExchangeRates: jest.fn().mockResolvedValue([]),
}));

jest.mock("../../lib/swap_executor", () => ({
  executeSwap: jest.fn().mockResolvedValue(undefined),
}));

describe("Swap Cron", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it("should handle no active token pairs", async () => {
    (queryActiveTokenPairs as jest.Mock).mockResolvedValueOnce([]);
    await runSwapCron();

    expect(lookupTokenExchangeRates).toHaveBeenCalledWith([]);
    expect(queryPendingSwapRequests).not.toHaveBeenCalled();
  });

  it("should handle no exchange rates", async () => {
    (queryActiveTokenPairs as jest.Mock).mockResolvedValueOnce([
      { fromToken: "BTC", toToken: "USDT" },
    ]);
    (lookupTokenExchangeRates as jest.Mock).mockResolvedValueOnce([]);
    await runSwapCron();

    expect(lookupTokenExchangeRates).toHaveBeenCalledWith([
      { fromToken: "BTC", toToken: "USDT" },
    ]);
    expect(queryPendingSwapRequests).not.toHaveBeenCalled();
  });

  it("should handle handle not ready swap requests", async () => {
    //
  });

  it("should handle handle expired swap requests", async () => {
    //
  });

  it("should handle handle fulfillable swap requests", async () => {
    const exchangeRates = [
      new MarketTokenExchangeRate("1", "BTC", "USDT", 100, "1", new Date()),
    ];
    const swapRequests = [
      new SwapRequest(
        "1",
        SwapRequestStatus.PENDING,
        "BTC",
        "USDT",
        100,
        100,
        100,
        subMinutes(new Date(), 1),
        addMinutes(new Date(), 1)
      ),
    ];
    (lookupTokenExchangeRates as jest.Mock).mockResolvedValueOnce(
      exchangeRates
    );
    (queryPendingSwapRequests as jest.Mock).mockResolvedValueOnce(swapRequests);
    await runSwapCron();

    expect(queryPendingSwapRequests).toHaveBeenCalledWith(exchangeRates[0]);
    expect(executeSwap).toHaveBeenCalledWith(swapRequests[0], exchangeRates[0]);
  });
});
