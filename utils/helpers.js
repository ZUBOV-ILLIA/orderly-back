export const getCurrencyRateToUAH = async () => {
  const fallbackData = {
    uah: {
      usd: 0.023754897,
    },
  };

  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/uah.json',
    );

    if (!response.ok) {
      return fallbackData;
    }

    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
