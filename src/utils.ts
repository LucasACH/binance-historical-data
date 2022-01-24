export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const generateQueryString = (
  symbol: string,
  market: string,
  contractType: string,
  interval: string,
  startTime: number,
  endTime: number
) => {
  const marketQueryString = {
    Spot: `klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}&limit=1000`,
    'USDⓈ-M Futures': `klines?symbol=${symbol}&contractType=${contractType}&interval=${interval}&startTime=${startTime}&endTime=${endTime}&limit=1000`,
    'COIN-M  Futures': `klines?symbol=${symbol}&contractType=${contractType}&interval=${interval}&startTime=${startTime}&endTime=${endTime}&limit=1000`,
  };
  const queryString =
    marketQueryString[market as keyof typeof marketQueryString];
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

export const createCsvFile = (
  headers: string[],
  data: string[][],
  symbol: string,
  market: string,
  interval: string,
  startTime: number,
  endTime: number
) => {
  const csvContent = encodeContent(headers, data);
  var encodedUri = encodeURI(csvContent);
  const filename = `${symbol}_${market}_${interval}_${startTime}_${endTime}`;
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
