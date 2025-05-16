import SwapRequestsList from "@/components/SwapRequestsList";
import apiClient from "@/lib/api/apiClient";

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
        <SwapRequestsList requests={swapRequests} />
      </div>
    </div>
  );
}
