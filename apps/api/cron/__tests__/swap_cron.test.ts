import { addMinutes, subMinutes } from "date-fns";
import { SwapRequestStatus } from "../../domains/swap/models";
import {
  MarketTokenExchangeRate,
  SwapRequest,
} from "../../domains/swap/models";
import runSwapCron from "../swap_cron";
import {
  queryActiveTokenPairs,
  queryPendingSwapRequests,
} from "../../domains/swap/queries";
import { lookupTokenExchangeRates } from "../../domains/exchange/service";
import { executeSwap } from "../../domains/swap/executor";

// Mock the functions
jest.mock("../../domains/swap/queries", () => ({
  queryActiveTokenPairs: jest.fn().mockResolvedValue([]),
  queryPendingSwapRequests: jest.fn().mockResolvedValue([]),
}));

jest.mock("../../domains/exchange/service", () => ({
  lookupTokenExchangeRates: jest.fn().mockResolvedValue([]),
}));

jest.mock("../../domains/swap/executor", () => ({
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
