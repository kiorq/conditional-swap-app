"use client";
import Button from "./Button";
import CurrencyForm from "./CurrencyForm";
import DateRange from "./DateRange";

const SwapForm = () => {
  return (
    <form className="flex flex-col gap-4 w-full">
      <CurrencyForm />
      <div className="flex flex-row gap-2 justify-between">
        <DateRange />
        <div className="flex flex-row gap-2">
          <div className="flex justify-center items-center mr-10">
            <p className="text-sm text-gray-400">You cancelled this order</p>
          </div>
          <Button onClick={() => {}} variant="danger">
            Cancel
          </Button>
          <Button onClick={() => {}} variant="primary">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SwapForm;
