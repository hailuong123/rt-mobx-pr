
interface IToken {
  _id: string;
  address: string;
  name: string;
  decimals: number;
  symbol: string;
  totalSupply: string;
  price: string;
  priceUsd?: string;
  priceBtc?: string;
  priceEth?: string;
  isUp?: boolean;
  priceChange?: string;
  imageName?: string;
  marketCap?: string;
}

interface ITokenResponse {
  data: IToken[];
  total: number;
}

interface ITokendError {
  text?: string;
}
