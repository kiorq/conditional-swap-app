export interface SwapRequest {
  id: string;
  status: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  minThreshold: string;
  startDate: string;
  endDate: string;
  instant: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}
