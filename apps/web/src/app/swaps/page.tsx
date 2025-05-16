import CurrencyForm from "@/components/CurrencyForm";
import DateRange from "@/components/DateRange";
import OrderSteps from "@/components/OrderSteps";
import SwapForm from "@/components/SwapForm";
import SwapRequestsList from "@/components/SwapRequestsList";
import ValueCard from "@/components/ValueCard";
import apiClient from "@/lib/api/apiClient";
import { useSwapRequests } from "@/lib/api/hooks";

export default async function Home() {
  const swapRequests = await apiClient.getAllSwapRequests();

  console.log(swapRequests);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center">
      {/* swap requests list */}
      <div className="flex flex-col gap-4 max-w-3xl">
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
  );
}
