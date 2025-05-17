import Image from "next/image";
import { currencyIcon, currencyName } from "@/lib/currencies";
import { ChevronRightIcon, ChevronDownIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SwapFormData } from "./SwapForm";

const CurrencyInput = ({
  label,
  currencies,
  currency,
  setCurrency,
  amount,
  setAmount,
  editable,
}: {
  label: string;
  currency: string;
  currencies: Record<string, number>;
  setCurrency: (currency: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  editable: boolean;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow empty string for controlled input, but treat as 0
    if (val === "") {
      setAmount("0");
      return;
    }
    // Only allow valid numbers >= 0
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      setAmount(val);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-2 py-4">
      <div className="flex flex-row py-0">
        <p className="text-gray-400 text-sm">{label}</p>
      </div>
      <div className="flex-1 h-full flex flex-row items-center gap-1 md:gap-2">
        <div
          className="flex items-center cursor-pointer relative"
          onClick={editable ? () => setDropdownOpen((v) => !v) : undefined}
        >
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-gray-700 hover:border-blue-500 transition-all">
            <Image
              src={currency ? currencyIcon(currency) : ""}
              alt={currency}
              width={64}
              height={64}
              className="w-full h-full"
            />
          </div>
        </div>
        <input
          type="text"
          className="w-full h-full outline-none bg-transparent text-white px-2 font-mono text-2xl md:text-5xl font-semibold"
          placeholder="0.000"
          value={amount}
          onChange={editable ? onChange : () => {}}
        />
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className="flex items-center gap-1 text-base font-mono text-white hover:text-blue-400 transition-colors cursor-pointer select-none"
          onClick={editable ? () => setDropdownOpen((v) => !v) : undefined}
        >
          <span>{currency ? currencyName(currency) : ""}</span>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>
        {dropdownOpen && (
          <div className="absolute z-30 mt-2 w-40 bg-gray-900 border border-gray-700 rounded-lg shadow-lg py-1">
            {Object.keys(currencies || {}).map((cur) => (
              <button
                key={cur}
                className={`w-full flex items-center gap-2 px-4 py-2 text-left text-white font-mono hover:bg-gray-800 focus:bg-gray-800 transition-colors rounded-md ${
                  cur === currency ? "bg-gray-800 text-blue-400" : ""
                }`}
                onClick={() => {
                  setCurrency(cur);
                  setDropdownOpen(false);
                }}
              >
                <Image
                  src={cur ? currencyIcon(cur) : ""}
                  alt={cur}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span>{cur ? currencyName(cur) : ""}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CurrencyForm = ({
  currencies,
  onChange,
  editable,
  initialData,
}: {
  currencies: Record<string, number>;
  onChange: (data: SwapFormData) => void;
  editable: boolean;
  initialData?: Partial<SwapFormData>;
}) => {
  const [fromCurrency, setFromCurrency] = useState(
    initialData?.fromCurrency || "eth"
  );
  const [toCurrency, setToCurrency] = useState(
    initialData?.toCurrency || "btc"
  );
  const [fromAmount, setFromAmount] = useState(initialData?.fromAmount || "0");
  const [toAmount, setToAmount] = useState(initialData?.toAmount || "0");
  const initialDataSetRef = useRef(false);

  useEffect(() => {
    if (!initialData) return;
    if (initialDataSetRef.current) return;

    initialDataSetRef.current = true;
    initialData.fromCurrency && setFromCurrency(initialData.fromCurrency);
    initialData.toCurrency && setToCurrency(initialData.toCurrency);
    initialData.fromAmount && setFromAmount(initialData.fromAmount);
    initialData.toAmount && setToAmount(initialData.toAmount);
  }, [initialData]);

  const handleChange = useCallback(
    (data: SwapFormData) => {
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
      <div className="w-full flex flex-row px-2 md:px-4">
        <CurrencyInput
          label="You are converting"
          currency={fromCurrency}
          amount={fromAmount}
          setAmount={setFromAmount}
          setCurrency={setFromCurrency}
          currencies={currencies}
          editable={editable}
        />
        <div className="flex justify-center items-center">
          <ChevronRightIcon className="w-7 h-7 md:w-13 md:h-13 text-gray-400" />
        </div>
        <CurrencyInput
          label="You will receive"
          currency={toCurrency}
          amount={toAmount}
          setAmount={setToAmount}
          setCurrency={setToCurrency}
          currencies={currencies}
          editable={editable}
        />
      </div>
    </div>
  );
};

export default CurrencyForm;
