export enum SwapRequestStatus {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
  INVALID = "invalid",
}

export enum SwapCheckResult {
  EXECUTE_NOW = "execute_now",
  TOKEN_MISMATCH = "token_mismatch",
  SKIP_ALREADY_FULFILLED = "skip_already_fulfilled",
  SKIP_NOT_READY = "skip_not_ready",
  SKIP_EXPIRED = "skip_expired",
  SKIP_INVALID = "skip_invalid",
}

export class SwapRequest {
  constructor(
    public id: string,
    // metadata
    public status: SwapRequestStatus,
    // token
    public fromToken: string,
    public toToken: string,
    // amount
    public fromAmount: number,
    public toAmount: number,
    // min threshold
    public minThreshold: number,
    public startDate: Date,
    public endDate: Date

    // TODO: add wallet information
  ) {}
}

export class MarketTokenExchangeRate {
  constructor(
    public id: string,
    // token
    public fromToken: string,
    public toToken: string,
    // exchange rate
    public exchangeRate: number,
    // metadata
    public network: string,
    public timestamp: Date
  ) {}
}
