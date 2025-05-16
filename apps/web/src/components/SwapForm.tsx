"use client";
import { useState } from "react";
import Button from "./Button";
import CurrencyForm from "./CurrencyForm";
import DateRange from "./DateRange";

import { useGetAvailableCurrencies } from "@/lib/api/hooks";

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
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: {
    fromCurrency: string;
    toCurrency: string;
    fromAmount: string;
    toAmount: string;
  };
}) => {
  const { data: currencies } = useGetAvailableCurrencies();
  const [formData, setFormData] = useState({
    fromCurrency: "eth",
    toCurrency: "btc",
    fromAmount: 0,
    toAmount: 0,
  });

  const onDateRangeChange = (dateRange: { startDate: Date; endDate: Date }) => {
    setFormData((prev) => ({
      ...prev,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    }));
  };



  return (
    <div className="flex flex-col gap-4 w-full">
      <CurrencyForm
        currencies={currencies ? Object.keys(currencies) : []}
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
            <Button onClick={() => onSubmit(formData)} variant="primary">
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapForm;
