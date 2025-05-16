export const currencyIcon = (currency: string) => {
  return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/128/icon/${currency.toLowerCase()}.png`;
};

export const currencyName = (currency: string) => {
  return (
    {
      eth: "Ethereum",
      btc: "Bitcoin",
      usdt: "Tether",
      usdc: "USD Coin",
    }[currency.toLowerCase()] || currency
  );
};
