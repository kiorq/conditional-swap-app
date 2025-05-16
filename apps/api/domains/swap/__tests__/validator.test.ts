import { addMinutes, subMinutes } from "date-fns";
import { validateSwapRequest } from "../validator";
import {
  MarketTokenExchangeRate,
  SwapRequest,
  SwapRequestStatus,
  SwapCheckResult,
} from "../models";

describe("Swap Validators", () => {
  let swapRequest: SwapRequest;
  let currentMarketTokenExchangeRate: MarketTokenExchangeRate;

  beforeEach(() => {
    jest.clearAllMocks();
    swapRequest = new SwapRequest({
      id: "1",
      status: SwapRequestStatus.PENDING,
      fromToken: "ETH",
      toToken: "USDC",
      fromAmount: 100,
      toAmount: 120,
      startDate: subMinutes(new Date(), 10),
      endDate: addMinutes(new Date(), 20),
      minThreshold: 120,
    });

    currentMarketTokenExchangeRate = new MarketTokenExchangeRate({
      id: "1",
      fromToken: "ETH",
      toToken: "USDC",
      exchangeRate: 100,
      network: "mainnet",
      timestamp: new Date(),
    });
  });

  it("should fulfill a swap request", async () => {
    // created fulfillable swap request
    swapRequest.fromToken = "ETH";
    swapRequest.toToken = "USDC";
    swapRequest.status = SwapRequestStatus.PENDING;
    swapRequest.startDate = subMinutes(new Date(), 10);
    swapRequest.endDate = addMinutes(new Date(), 20);
    swapRequest.minThreshold = 100;

    // created current market token exchange rate (e.g: retrieved from an external API)
    currentMarketTokenExchangeRate.fromToken = "ETH";
    currentMarketTokenExchangeRate.toToken = "USDC";
    currentMarketTokenExchangeRate.exchangeRate = 100;
    currentMarketTokenExchangeRate.network = "mainnet";
    currentMarketTokenExchangeRate.timestamp = new Date();

    // validate swap request
    const result = await validateSwapRequest(
      swapRequest,
      currentMarketTokenExchangeRate
    );

    expect(result).toBe(SwapCheckResult.EXECUTE_NOW);
  });

  it("should fulfill not fulfill an expired swap request", async () => {
    // created unfulfillable swap request
    swapRequest.fromToken = "ETH";
    swapRequest.toToken = "USDC";
    swapRequest.status = SwapRequestStatus.PENDING;
    swapRequest.startDate = subMinutes(new Date(), 20);
    swapRequest.endDate = subMinutes(new Date(), 5);
    swapRequest.minThreshold = 120;

    // created current market token exchange rate (e.g: retrieved from an external API)
    currentMarketTokenExchangeRate.fromToken = "ETH";
    currentMarketTokenExchangeRate.toToken = "USDC";
    currentMarketTokenExchangeRate.exchangeRate = 100;
    currentMarketTokenExchangeRate.network = "mainnet";
    currentMarketTokenExchangeRate.timestamp = new Date();

    // validate swap request
    const result = await validateSwapRequest(
      swapRequest,
      currentMarketTokenExchangeRate
    );

    expect(result).toBe(SwapCheckResult.SKIP_EXPIRED);
  });

  it("should fulfill not fulfill an fulfilled swap request", async () => {
    // created fulfilled swap request
    swapRequest.fromToken = "ETH";
    swapRequest.toToken = "USDC";
    swapRequest.status = SwapRequestStatus.FULFILLED;
    swapRequest.startDate = subMinutes(new Date(), 10);
    swapRequest.endDate = addMinutes(new Date(), 20);
    swapRequest.minThreshold = 120;

    // created current market token exchange rate (e.g: retrieved from an external API)
    currentMarketTokenExchangeRate.fromToken = "ETH";
    currentMarketTokenExchangeRate.toToken = "USDC";
    currentMarketTokenExchangeRate.exchangeRate = 100;
    currentMarketTokenExchangeRate.network = "mainnet";
    currentMarketTokenExchangeRate.timestamp = new Date();
    // validate swap request
    const result = await validateSwapRequest(
      swapRequest,
      currentMarketTokenExchangeRate
    );

    expect(result).toBe(SwapCheckResult.SKIP_ALREADY_FULFILLED);
  });

  it("should not fulfill if swap request with token mismatch", async () => {
    // created fulfilled swap request
    swapRequest.fromToken = "ETH";
    swapRequest.toToken = "USDC";
    swapRequest.status = SwapRequestStatus.FULFILLED;
    swapRequest.startDate = subMinutes(new Date(), 10);
    swapRequest.endDate = addMinutes(new Date(), 20);
    swapRequest.minThreshold = 120;

    // created current market token exchange rate (e.g: retrieved from an external API)
    currentMarketTokenExchangeRate.fromToken = "BTC";
    currentMarketTokenExchangeRate.toToken = "USDC";
    currentMarketTokenExchangeRate.exchangeRate = 100;
    currentMarketTokenExchangeRate.network = "mainnet";
    currentMarketTokenExchangeRate.timestamp = new Date();
    // validate swap request
    const result = await validateSwapRequest(
      swapRequest,
      currentMarketTokenExchangeRate
    );

    expect(result).toBe(SwapCheckResult.TOKEN_MISMATCH);
  });
});
