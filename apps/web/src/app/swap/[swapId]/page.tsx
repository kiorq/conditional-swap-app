"use client";
import OrderSteps from "@/components/OrderSteps";
import SwapForm from "@/components/SwapForm";
import SwapRequestsList from "@/components/SwapRequestsList";
import ValueCard from "@/components/ValueCard";
import { useGetSwapRequest } from "@/lib/api/hooks";
import { useParams } from "next/navigation";

export default function SwapDetail() {
  const { swapId } = useParams();
  const { data: swapRequest } = useGetSwapRequest(swapId as string);
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl flex flex-col gap-4 px-4 md:px-0">
        {/* form */}
        <SwapForm
          message={
            swapRequest?.status === "pending" ? "Swap Request Submitted" : ""
          }
          isSubmittable={false}
          isCancelable={false}
          onSubmit={() => {}}
          onCancel={() => {}}
          initialData={
            swapRequest
              ? {
                  fromCurrency: swapRequest.fromToken,
                  toCurrency: swapRequest.toToken,
                  fromAmount: swapRequest.fromAmount,
                  toAmount: swapRequest.toAmount,
                }
              : undefined
          }
        />
        {/* additional details */}
        <div className="max-w-3xl">
          <div className="flex flex-col md:flex-row gap-4">
            <ValueCard value={0.0} label="Current Exchange Rate" />
            <OrderSteps status={swapRequest?.status || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
