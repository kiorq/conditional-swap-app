import SwapRequestsList from "@/components/SwapRequestsList";
import apiClient from "@/lib/api/apiClient";
import { SwapRequest } from "../types";

async function fetchData(): Promise<
  | {
      data: SwapRequest[];
      error: null;
    }
  | {
      data: null;
      error: string;
    }
> {
  try {
    const data = await apiClient.getAllSwapRequests();

    return { data, error: null };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { data: null, error: "Failed to fetch swap requests" };
  }
}

export default async function Home() {
  const { data: swapRequests, error } = await fetchData();

  return (
    <div className=" w-screen flex flex-col items-center">
      {/* swap requests list */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <div>
          <p className="text-lg font-semibold text-gray-400">Swap History</p>
        </div>

        {error != null ? (
          <p>Failed to load swap requests</p>
        ) : (
          <SwapRequestsList requests={swapRequests} />
        )}
      </div>
    </div>
  );
}
