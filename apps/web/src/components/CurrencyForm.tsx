import Image from "next/image";
import { currencyIcon, currencyName } from "@/lib/currencies";
import { ChevronRightIcon } from "lucide-react";

const CurrencyInput = ({
  label,
  currency,
  amount,
  setAmount,
}: {
  label: string;
  currency: string;
  amount: number;
  setAmount: (amount: number) => void;
}) => {
  return (
    <div className="flex-1 flex flex-col gap-2 py-4 px-4">
      <div className="flex flex-row py-0">
        <p className="text-gray-400 text-sm">{label}</p>
      </div>
      <div className="flex-1 h-full flex flex-row">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 rounded-full">
            <Image
              src={currencyIcon(currency)}
              alt={currency}
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>
        </div>
        <input
          type="text"
          className="w-full h-full outline-none bg-transparent text-white px-2 font-mono text-5xl font-semibold"
          placeholder="0.000"
        />
      </div>
      <div>
        <p>{currencyName(currency)}</p>
      </div>
    </div>
  );
};
const CurrencyForm = () => {
  return (
    <div className=" w-full bg-gray-900 rounded-lg border border-gray-800 items-center">
      <div className="w-full flex flex-row">
        <CurrencyInput
          label="You are converting"
          currency="eth"
          amount={0}
          setAmount={() => {}}
        />
        <div className="flex justify-center items-center">
          <ChevronRightIcon className="w-13 h-13 text-gray-400" />
        </div>
        <CurrencyInput
          label="You will receive"
          currency="btc"
          amount={0}
          setAmount={() => {}}
        />
      </div>
    </div>
  );
};

export default CurrencyForm;
