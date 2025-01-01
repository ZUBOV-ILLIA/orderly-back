export const getCurrencyRateToUAH = async () => {
  try {
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/uah.json',
    );

    return await response.json();
  } catch (ee) {
    console.log(e);
  }
};
