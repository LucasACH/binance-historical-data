export interface ExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits: RateLimit[];
  exchangeFilters: any[];
  symbols: Symbol[];
}

export interface RateLimit {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
}

export interface Symbol {
  symbol: string;
  status: Status;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: QuoteAsset;
  quotePrecision: number;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: OrderType[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: Filter[];
  permissions: Permission[];
}

export interface Filter {
  filterType: FilterType;
  minPrice?: string;
  maxPrice?: string;
  tickSize?: string;
  multiplierUp?: string;
  multiplierDown?: string;
  avgPriceMins?: number;
  minQty?: string;
  maxQty?: string;
  stepSize?: string;
  minNotional?: string;
  applyToMarket?: boolean;
  limit?: number;
  maxNumOrders?: number;
  maxNumAlgoOrders?: number;
  maxPosition?: string;
}

export enum FilterType {
  IcebergParts = 'ICEBERG_PARTS',
  LotSize = 'LOT_SIZE',
  MarketLotSize = 'MARKET_LOT_SIZE',
  MaxNumAlgoOrders = 'MAX_NUM_ALGO_ORDERS',
  MaxNumOrders = 'MAX_NUM_ORDERS',
  MaxPosition = 'MAX_POSITION',
  MinNotional = 'MIN_NOTIONAL',
  PercentPrice = 'PERCENT_PRICE',
  PriceFilter = 'PRICE_FILTER',
}

export enum OrderType {
  Limit = 'LIMIT',
  LimitMaker = 'LIMIT_MAKER',
  Market = 'MARKET',
  StopLossLimit = 'STOP_LOSS_LIMIT',
  TakeProfitLimit = 'TAKE_PROFIT_LIMIT',
}

export enum Permission {
  Leveraged = 'LEVERAGED',
  Margin = 'MARGIN',
  Spot = 'SPOT',
}

export enum QuoteAsset {
  Aud = 'AUD',
  Bidr = 'BIDR',
  Bkrw = 'BKRW',
  Bnb = 'BNB',
  Brl = 'BRL',
  Btc = 'BTC',
  Busd = 'BUSD',
  Bvnd = 'BVND',
  Dai = 'DAI',
  Doge = 'DOGE',
  Eth = 'ETH',
  Eur = 'EUR',
  Gbp = 'GBP',
  Gyen = 'GYEN',
  Idrt = 'IDRT',
  Ngn = 'NGN',
  Pax = 'PAX',
  Rub = 'RUB',
  Trx = 'TRX',
  Try = 'TRY',
  Tusd = 'TUSD',
  Uah = 'UAH',
  Usdc = 'USDC',
  Usdp = 'USDP',
  Usds = 'USDS',
  Usdt = 'USDT',
  Vai = 'VAI',
  Xrp = 'XRP',
  Zar = 'ZAR',
}

export enum Status {
  Break = 'BREAK',
  Trading = 'TRADING',
}
