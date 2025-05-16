import CurrencyForm from "@/components/CurrencyForm";
import DateRange from "@/components/DateRange";
import OrderSteps from "@/components/OrderSteps";
import SubmitButton from "@/components/SubmitButton";
import SwapRequestsList from "@/components/SwapRequestsList";
import ValueCard from "@/components/ValueCard";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl flex flex-col gap-4">
        {/* form */}
        <form className="flex flex-col gap-4 w-full">
          <CurrencyForm />
          <div className="flex flex-row gap-2 justify-between">
            <DateRange />
            <SubmitButton />
          </div>
        </form>
        {/* additional details */}
        <div className="max-w-3xl">
          <div className="flex flex-row gap-4">
            <ValueCard value={0.888} label="Current Exchange Rate" />
            <OrderSteps status="cancelled" />
          </div>
        </div>
        {/* swap requests list */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-semibold text-gray-400">Swap History</p>
          </div>
          <SwapRequestsList
            requests={[
              {
                id: "1",
                fromToken: "BTC",
                toToken: "ETH",
                fromAmount: 0.888,
                toAmount: 1,
                status: "cancelled",
                date: "2021-01-01",
              },
              {
                id: "2",
                fromToken: "BTC",
                toToken: "ETH",
                fromAmount: 0.888,
                toAmount: 1,
                status: "pending",
                date: "2021-01-01",
              },
              {
                id: "3",
                fromToken: "BTC",
                toToken: "ETH",
                fromAmount: 0.888,
                toAmount: 1,
                status: "fulfilled",
                date: "2021-01-01",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
