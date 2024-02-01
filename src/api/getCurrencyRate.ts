export const getCurrecyRate = async (date: string | null, currency: string) => {
  try {
    const rsp = await fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/${date}/?format=json`);
    const data = await rsp.json();

    return {
      currencyDate: data.rates[0].effectiveDate,
      currencyRate: data.rates[0].mid,
    };
  } catch (error) {
    console.error('Error making API call:', error);
    throw error;
  }
};
