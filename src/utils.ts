import { headers } from './constants';
import { FetchProps } from './interfaces/FetchProps';
import { stringify } from 'query-string';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const generateQueryString = (fetchProps: FetchProps) => {
  const isSpotMarketSelected = fetchProps.market === 'Spot';
  const queryData: { [key: string]: string | number } = {
    symbol: fetchProps.symbol,
    interval: fetchProps.interval,
    startTime: fetchProps.startTime,
    endTime: fetchProps.endTime,
  };

  if (!isSpotMarketSelected) {
    queryData.contractType = fetchProps.contractType;
  }
  const queryString = 'klines?' + stringify(queryData);
  return queryString;
};

const encodeContent = (headers: string[], data: string[][]) => {
  return (
    'data:text/csv;charset=utf-8,' +
    headers.join() +
    '\n' +
    data.map((e) => e.join(',')).join('\n')
  );
};

export const createCsvFile = (fetchProps: FetchProps, data: string[][]) => {
  const csvContent = encodeContent(headers, data);
  var encodedUri = encodeURI(csvContent);
  const filename = `${fetchProps.symbol}_${fetchProps.market}_${fetchProps.interval}_${fetchProps.startTime}_${fetchProps.endTime}`;
  var link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
};

export const intervalToMilliseconds = (interval: string) => {
  const secondsPerUnit = {
    m: 60,
    h: 60 * 60,
    d: 24 * 60 * 60,
    w: 7 * 24 * 60 * 60,
    M: 7 * 24 * 60 * 60 * 3,
  };
  const intervalNumber = Number(interval.slice(0, -1));
  const intervalUnit = interval.at(-1) as keyof typeof secondsPerUnit;
  return intervalNumber * secondsPerUnit[intervalUnit] * 1000;
};

export const contractTypeToTitleCase = (contractType: string) => {
  const splitStr = contractType.toLowerCase().split('_');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
};

export const contractTypeToQueryValue = (contractType: string) =>
  contractType.replace(' ', '_').toUpperCase();

export const calculateRequestLength = (fetchProps: FetchProps) =>
  (fetchProps.endTime - fetchProps.startTime) /
  intervalToMilliseconds(fetchProps.interval);

export const generateMaxDate = (timeStamp: number) =>
  new Date(timeStamp - 86400000).toISOString().split('T')[0];

export const generateMinDate = (timeStamp: number) =>
  new Date(timeStamp + 86400000).toISOString().split('T')[0];
