import { useEffect, useState } from 'react';
import { ExchangeInfo, Symbol } from '../interfaces/ExchangeInfo';
import { FetchProps } from '../interfaces/FetchProps';

const useSymbols = (fetchProps: FetchProps) => {
  const [fetchingSymbols, setFetchingSymbols] = useState<boolean>(true);
  const [errorFetchingSymbols, setErrorFetchingSymbols] = useState<any>(null);
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    fetch(fetchProps.apiBaseUrl + 'exchangeInfo')
      .then((res) => res.json())
      .then((data: ExchangeInfo) => {
        const filterByContractType = (symbol: Symbol) =>
          symbol.contractType !== undefined
            ? symbol.contractType === fetchProps.contractType
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
  }, [fetchProps.apiBaseUrl, fetchProps.contractType]);

  return { symbols, fetchingSymbols, errorFetchingSymbols };
};

export default useSymbols;
