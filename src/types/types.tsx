export interface IAssetFetch {
  id: string;
  amount: number;
  price: number;
  date?: any;
}

export interface IAsset {
  id: string;
  amount: number;
  price: number;
  name?: string;
  date?: any;
  grow?: boolean;
  growPercent?: number;
  totalAmount?: number;
  totalProfit?: number;
}

export interface ICrypto {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  priceBtc: number;
  volume: number;
  marketCap: number;
  availableSupply: number;
  totalSupply: number;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  redditUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  contractAddress: string;
  decimals: number;
  explorers: string[];
}

export interface ICryptoContext {
  loading?: boolean;
  crypto?: ICrypto[];
  assets?: IAsset[];
  addAssets?: any;
}
