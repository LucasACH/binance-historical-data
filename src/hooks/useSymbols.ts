import { useEffect, useState } from 'react';
import { ExchangeInfo } from '../interfaces/ExchangeInfo';
import { baseUrl } from '../enums';

const useSymbols = () => {
  const [fetchingSymbols, setFetchingSymbols] = useState<boolean>(true);
  const [errorFetchingSymbols, setErrorFetchingSymbols] = useState<any>(null);
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    fetch(baseUrl + 'exchangeInfo')
      .then((res) => res.json())
      .then((data: ExchangeInfo) => {
        setSymbols(data.symbols.map((item) => item.symbol).sort());
        setFetchingSymbols(false);
      })
      .catch((error) => {
        setErrorFetchingSymbols(error);
        setFetchingSymbols(false);
      });
  }, []);

  return { symbols, fetchingSymbols, errorFetchingSymbols };
};

export default useSymbols;
