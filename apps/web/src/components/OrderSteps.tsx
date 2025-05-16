interface OrderStepsProps {
  status:
    | "pending"
    | "fulfilled"
    | "expired"
    | "cancelled"
    | "invalid"
    | string;
}

const stepsData = [
  {
    id: "submitted",
    label: "Request Submitted",
    description: "Your order has been submitted",
  },
  {
    id: "waiting",
    label: "Waiting for Condition",
    description: "Monitoring market conditions",
  },
  {
    id: "final",
    label: "Order Status",
    // description will be set dynamically
  },
];

const getStepStatus = (status: OrderStepsProps["status"], idx: number) => {
  // 0: submitted, 1: waiting, 2: final
  if (idx === 0) return "complete";
  if (idx === 1) return status === "pending" ? "current" : "complete";
  // final
  return status !== "pending" ? "complete" : "upcoming";
};

const getFinalDescription = (status: OrderStepsProps["status"]) => {
  if (status === "fulfilled") return "Order fulfilled successfully";
  if (status === "expired") return "Order expired";
  if (status === "cancelled") return "Order cancelled";
  return "Processing...";
};

const isFinalRed = (status: OrderStepsProps["status"]) =>
  status === "cancelled" || status === "expired";

const OrderSteps = ({ status }: OrderStepsProps) => {
  return (
    <div className="flex-1  bg-gray-900 rounded-xl px-8 py-6 flex flex-col gap-2">
      {stepsData.map((step, idx) => {
        const stepStatus = getStepStatus(status, idx);
        const isLast = idx === stepsData.length - 1;
        const isRed = isLast && isFinalRed(status);
        return (
          <div key={step.id} className="flex items-start relative min-h-[44px]">
            {/* Checkmark */}
            <div className="flex flex-col items-center relative h-full">
              <div
                className={`z-20 w-6 h-6 flex items-center justify-center rounded-full ${
                  isRed
                    ? "bg-red-500"
                    : stepStatus === "complete" || stepStatus === "current"
                      ? "bg-green-500"
                      : "bg-gray-700"
                }`}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              {/* Vertical line for all but last step */}
              {!isLast && (
                <div
                  className={`absolute top-0 left-1/2 w-1 h-[calc(100%+10px)] z-10 -translate-x-1/2 mt-2 ${
                    isRed && idx === stepsData.length - 2
                      ? "bg-red-500"
                      : stepStatus === "complete" || stepStatus === "current"
                        ? "bg-green-500"
                        : "bg-gray-700"
                  }`}
                />
              )}
            </div>
            {/* Text */}
            <div className="ml-4 flex flex-col">
              <span
                className={`text-base font-semibold ${
                  isRed
                    ? "text-red-500"
                    : stepStatus === "complete" || stepStatus === "current"
                      ? "text-green-400"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {step.id === "final"
                  ? getFinalDescription(status)
                  : step.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSteps;
