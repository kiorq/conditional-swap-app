"use client";
import SwapForm from "@/components/SwapForm";
import { useState } from "react";
import { useCreateSwapRequest } from "@/lib/api/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const createSwapRequest = useCreateSwapRequest();
  const onSubmit = (formData: any) => {
    debugger;
    // frontend validation
    if (!formData.startDate) {
      setError("Start date is required");
      return;
    }
    if (!formData.endDate) {
      setError("End date is required");
      return;
    }

    if (formData.fromAmount <= 0) {
      setError("From amount must be greater than 0");
      return;
    }

    if (formData.toAmount <= 0) {
      setError("To amount must be greater than 0");
      return;
    }
    const minThreshold = formData.fromAmount / formData.toAmount;
    createSwapRequest.mutate({
      fromToken: formData.fromCurrency,
      toToken: formData.toCurrency,
      fromAmount: formData.fromAmount,
      toAmount: formData.toAmount,
      minThreshold: minThreshold,
      startDate: formData.startDate,
      endDate: formData.endDate,
    });
  };

  const router = useRouter();

  useEffect(() => {
    if (createSwapRequest.data) {
      router.push(`/swap/${createSwapRequest.data?.id}`);
    }
  }, [createSwapRequest.data, router]);

  useEffect(() => {
    if (createSwapRequest.error) {
      setError(createSwapRequest.error.message || "An issue occurred");
    }
  }, [createSwapRequest.error]);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      {error && (
        <div className="px-4 w-full mb-3">
          <div className="text-red-500 bg-red-500/10 py-1 w-full rounded-md text-center flex flex-row items-center justify-center gap-2">
            {error}
          </div>
        </div>
      )}
      <div className="max-w-3xl flex flex-col gap-4 px-4 md:px-0">
        <SwapForm
          isSubmittable={true}
          onSubmit={onSubmit}
          onCancel={() => {}}
          initialData={{
            fromCurrency: "eth",
            toCurrency: "btc",
            fromAmount: 100,
            toAmount: 100,
          }}
        />
      </div>
    </div>
  );
}
