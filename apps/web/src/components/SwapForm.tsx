"use client";
import { useCallback, useState } from "react";
import Button from "./Button";
import CurrencyForm from "./CurrencyForm";
import DateRange from "./DateRange";

import { useGetAvailableCurrencies } from "@/lib/api/hooks";

export interface SwapFormData {
  startDate?: Date;
  endDate?: Date;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
}

const SwapForm = ({
  message,
  isSubmittable = false,
  isCancelable = false,
  onSubmit,
  onCancel,
  initialData,
}: {
  message?: string;
  isSubmittable?: boolean;
  isCancelable?: boolean;
  onSubmit: (formData: SwapFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<SwapFormData>;
}) => {
  const { data: currencies } = useGetAvailableCurrencies();
  const [formData, setFormData] = useState<SwapFormData>({
    ...(initialData || {}),
    fromCurrency: "eth",
    toCurrency: "btc",
    fromAmount: "0",
    toAmount: "0",
  });

  const onDateRangeChange = (dateRange: { startDate: Date; endDate: Date }) => {
    setFormData((prev) => ({
      ...prev,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }));
  };

  const handleSubmit = useCallback(() => {
    onSubmit(formData);
  }, [formData, onSubmit]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <CurrencyForm
        currencies={currencies || {}}
        onChange={setFormData}
        editable={isSubmittable}
        initialData={initialData}
      />
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        {isSubmittable && <DateRange onChange={onDateRangeChange} />}
        {message && (
          <div className="flex justify-center items-center ">
            <p className="text-sm text-gray-400">{message}</p>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-2">
          {isCancelable && (
            <Button onClick={() => onCancel()} variant="danger">
              Cancel
            </Button>
          )}
          {isSubmittable && (
            <Button onClick={handleSubmit} variant="primary">
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapForm;
