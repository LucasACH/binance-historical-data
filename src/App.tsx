import { useState, useEffect } from 'react';
import useSymbols from './hooks/useSymbols';
import * as constants from './constants';
import * as utils from './utils';
import Select from './components/Select';
import DatePicker from './components/DatePicker';
import Button from './components/Button';
import useFetchProps from './hooks/useFetchProps';

const App: React.FC = () => {
  const { fetchProps, setFetchProps } = useFetchProps();
  const { symbols, fetchingSymbols, errorFetchingSymbols } =
    useSymbols(fetchProps);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<string[][]>([]);
  const [requestLength, setRequestLength] = useState<number>(0);

  useEffect(() => {
    !fetchingSymbols &&
      errorFetchingSymbols === null &&
      setFetchProps({ type: 'symbol', payload: symbols[0] });
  }, [fetchingSymbols, errorFetchingSymbols, symbols]);

  useEffect(() => {
    const isSpotMarketSelected = fetchProps.market === 'Spot';
    setFetchProps({
      type: 'contractType',
      payload: isSpotMarketSelected ? '' : constants.contractTypes[0],
    });
    setFetchProps({
      type: 'apiBaseUrl',
      payload:
        constants.marketBaseUrl[
          fetchProps.market as keyof typeof constants.marketBaseUrl
        ],
    });
  }, [fetchProps.market]);

  const handleButtonClick = () => {
    setLoading(true);
    setRequestLength(utils.calculateRequestLength(fetchProps));
    getHistoricalCandlesticks();
  };

  const getHistoricalCandlesticks = () => {
    fetch(fetchProps.apiBaseUrl + utils.generateQueryString(fetchProps))
      .then((res) => res.json())
      .then((json: string[][]) => {
        const removeIgnoreValue = (candle: string[]) => candle.slice(0, -1);
        let candles = historicalData.concat(json.map(removeIgnoreValue));

        const lastCandleStartTime = Number(candles.at(-1)?.at(0));
        const isMaxLimitReached = lastCandleStartTime !== fetchProps.endTime;

        // Check if response has reached request limit
        if (isMaxLimitReached) {
          setHistoricalData(candles.slice(0, -1));
          setFetchProps({ type: 'startTime', payload: lastCandleStartTime }); // UseEffect will run recursion
        } else {
          utils.createCsvFile(fetchProps, candles);
          setHistoricalData([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  useEffect(() => {
    if (loading) return getHistoricalCandlesticks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProps.startTime]);

  if (errorFetchingSymbols) {
    return <p>{errorFetchingSymbols}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='w-screen h-screen p-4 gap-y-4 flex flex-col justify-center items-center'>
      <h1>
        Binance historical market data <span className='font-bold'>.csv</span>{' '}
        generator
      </h1>
      <div className='lg:w-1/3 md:w-1/2 sm:w-2/3 w-4/5 flex flex-col box-border border border-gray-300 rounded-md shadow-sm p-8 gap-y-6 justify-center items-center'>
        <Select
          value={fetchProps.market}
          onChange={(value) =>
            setFetchProps({ type: 'market', payload: value.toString() })
          }
          options={constants.markets}
          label='Market'
        />
        {fetchProps.market !== 'Spot' && (
          <Select
            value={utils.contractTypeToTitleCase(fetchProps.contractType)}
            onChange={(value) =>
              setFetchProps({
                type: 'contractType',
                payload: utils.contractTypeToQueryValue(value.toString()),
              })
            }
            options={constants.contractTypes.map(utils.contractTypeToTitleCase)}
            label='Contract Type'
          />
        )}
        <Select
          value={fetchProps.symbol}
          onChange={(value) =>
            setFetchProps({ type: 'symbol', payload: value.toString() })
          }
          options={symbols}
          label='Symbol'
        />
        <Select
          value={fetchProps.interval}
          onChange={(value) =>
            setFetchProps({ type: 'interval', payload: value.toString() })
          }
          options={constants.intervals}
          label='Interval'
        />
        <DatePicker
          label='Start Time'
          max={utils.generateMaxDate(fetchProps.endTime)}
          onChange={(event) =>
            setFetchProps({
              type: 'startTime',
              payload: new Date(event.target.value).getTime(),
            })
          }
        />
        <DatePicker
          label='End Time'
          min={utils.generateMinDate(fetchProps.startTime)}
          max={new Date().toISOString().split('T')[0]}
          onChange={(event) =>
            setFetchProps({
              type: 'endTime',
              payload: new Date(event.target.value).getTime(),
            })
          }
        />
        <Button
          label='Download Historical Data'
          onClick={handleButtonClick}
          disabled={loading}
          progress={(historicalData.length - 1) / requestLength}
        />
      </div>
      <h1>
        Made by{' '}
        <a
          href='https://github.com/LucasACH/binance-historical-data'
          target='_blank'
          className='font-bold underline'
        >
          Lucas Achaval
        </a>
      </h1>
    </div>
  );
};

export default App;
