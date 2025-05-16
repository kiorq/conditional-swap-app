import Image from "next/image";
import { currencyIcon, currencyName } from "@/lib/currencies";
import { ChevronRightIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const CurrencyInput = ({
  label,
  currencies,
  currency,
  setCurrency,
  amount,
  setAmount,
}: {
  label: string;
  currency: string;
  currencies: string[];
  setCurrency: (currency: string) => void;
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
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <p>{currencyName(currency)}</p>
      </div>
    </div>
  );
};

interface ChangeData {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
}

const CurrencyForm = ({
  currencies,
  onChange,
}: {
  currencies: string[];
  onChange: (data: ChangeData) => void;
}) => {
  const [fromCurrency, setFromCurrency] = useState("eth");
  const [toCurrency, setToCurrency] = useState("btc");
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const handleChange = useCallback(
    (data: ChangeData) => {
      onChange({
        fromCurrency: data.fromCurrency,
        toCurrency: data.toCurrency,
        fromAmount: data.fromAmount,
        toAmount: data.toAmount,
      });
    },
    [onChange]
  );

  useEffect(() => {
    handleChange({
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount,
    });
  }, [fromCurrency, toCurrency, fromAmount, toAmount, handleChange]);

  return (
    <div className=" w-full bg-gray-900 rounded-lg border border-gray-800 items-center">
      <div className="w-full flex flex-row">
        <CurrencyInput
          label="You are converting"
          currency={fromCurrency}
          amount={fromAmount}
          setAmount={setFromAmount}
          setCurrency={setFromCurrency}
          currencies={currencies}
        />
        <div className="flex justify-center items-center">
          <ChevronRightIcon className="w-13 h-13 text-gray-400" />
        </div>
        <CurrencyInput
          label="You will receive"
          currency={toCurrency}
          amount={toAmount}
          setAmount={setToAmount}
          setCurrency={setToCurrency}
          currencies={currencies}
        />
      </div>
    </div>
  );
};

export default CurrencyForm;
