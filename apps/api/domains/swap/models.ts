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
  public id: string;
  public status: SwapRequestStatus;
  public fromToken: string;
  public toToken: string;
  public fromAmount: string;
  public toAmount: string;
  public minThreshold: string;
  public startDate: Date;
  public endDate: Date;

  constructor({
    id,
    status,
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    minThreshold,
    startDate,
    endDate,
  }: {
    id: string;
    status: SwapRequestStatus;
    fromToken: string;
    toToken: string;
    fromAmount: string;
    toAmount: string;
    minThreshold: string;
    startDate: Date;
    endDate: Date;
  }) {
    this.id = id;
    this.status = status;
    this.fromToken = fromToken;
    this.toToken = toToken;
    this.fromAmount = fromAmount;
    this.toAmount = toAmount;
    this.minThreshold = minThreshold;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  fromAmountNumber(): number {
    // TODO: will need improved precision for large decimals
    return parseFloat(this.fromAmount);
  }

  toAmountNumber(): number {
    // TODO: will need improved precision for large decimals
    return parseFloat(this.toAmount);
  }

  minThresholdNumber(): number {
    // TODO: will need improved precision for large decimals
    return parseFloat(this.minThreshold);
  }
}

export class MarketTokenExchangeRate {
  public id: string;
  public fromToken: string;
  public toToken: string;
  public exchangeRate: number;
  public timestamp: Date;

  constructor({
    id,
    fromToken,
    toToken,
    exchangeRate,
    timestamp,
  }: {
    id: string;
    fromToken: string;
    toToken: string;
    exchangeRate: number;
    timestamp: Date;
  }) {
    this.id = id;
    this.fromToken = fromToken;
    this.toToken = toToken;
    this.exchangeRate = exchangeRate;
    this.timestamp = timestamp;
  }
}