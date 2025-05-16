"use client";
import Image from "next/image";
import { currencyIcon, currencyName } from "@/lib/currencies";

export type SwapRequest = {
  id: string;
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  status: "pending" | "fulfilled" | "expired" | "cancelled" | "invalid";
  date: string; // ISO string
};

const statusColor = {
  fulfilled: "text-green-400 bg-green-900",
  pending: "text-blue-400 bg-blue-900",
  expired: "text-red-400 bg-red-900",
  cancelled: "text-red-400 bg-red-900",
  invalid: "text-gray-400 bg-gray-800",
};

const statusLabel = {
  fulfilled: "Fulfilled",
  pending: "Pending",
  expired: "Expired",
  cancelled: "Cancelled",
  invalid: "Invalid",
};

const SwapRequestsList = ({ requests }: { requests: SwapRequest[] }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {requests.map((req) => (
        <div
          key={req.id}
          className="flex flex-row items-center bg-gray-900 rounded-lg border border-gray-800 px-6 py-4 cursor-pointer hover:border-blue-500 transition-all group shadow-sm"
          onClick={() => router.push(`/swap/${req.id}`)}
        >
          {/* From token */}
          <div className="flex items-center gap-2 min-w-[120px]">
            <Image
              src={currencyIcon(req.fromToken)}
              alt={req.fromToken}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-white font-mono text-lg font-semibold">
              {req.fromAmount}
            </span>
            <span className="text-gray-400 text-sm font-mono">
              {currencyName(req.fromToken)}
            </span>
          </div>
          <span className="mx-2 text-gray-500 text-xl font-bold">→</span>
          {/* To token */}
          <div className="flex items-center gap-2 min-w-[120px]">
            <Image
              src={currencyIcon(req.toToken)}
              alt={req.toToken}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-white font-mono text-lg font-semibold">
              {req.toAmount}
            </span>
            <span className="text-gray-400 text-sm font-mono">
              {currencyName(req.toToken)}
            </span>
          </div>
          {/* Status */}
          <div
            className={`ml-6 px-3 py-1 rounded-full text-xs font-bold ${statusColor[req.status]}`}
          >
            {statusLabel[req.status]}
          </div>
          {/* Date */}
          <div className="ml-auto text-gray-500 text-xs font-mono">
            {new Date(req.date).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwapRequestsList;
