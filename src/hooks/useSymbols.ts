import { useEffect, useState } from 'react';
import { ExchangeInfo, Symbol } from '../interfaces/ExchangeInfo';

const useSymbols = (apiBaseUrl: string, contractType: string) => {
  const [fetchingSymbols, setFetchingSymbols] = useState<boolean>(true);
  const [errorFetchingSymbols, setErrorFetchingSymbols] = useState<any>(null);
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    fetch(apiBaseUrl + 'exchangeInfo')
      .then((res) => res.json())
      .then((data: ExchangeInfo) => {
        const filterByContractType = (symbol: Symbol) =>
          symbol.contractType !== undefined
            ? symbol.contractType === contractType
            : symbol;

        setSymbols(
          data.symbols
            .filter(filterByContractType)
            .map((item) => item.symbol)
            .sort()
        );
        setFetchingSymbols(false);
      })
      .catch((error) => {
        setErrorFetchingSymbols(error);
        setFetchingSymbols(false);
      });
  }, [apiBaseUrl, contractType]);

  return { symbols, fetchingSymbols, errorFetchingSymbols };
};

export default useSymbols;
