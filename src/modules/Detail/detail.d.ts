
interface IDetail {
  hash: string;
  input: string;
  nonce: number;
  to: string;
  transactionIndex: number;
  value: number;
  contractAddress: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  logs: any[];
  logsBloom: string;
  add_time: number;
  type: string;
}

interface IDetailResponse {
  data: IDetail;
  blockHash: string;
}

interface ISearchError {
  text?: string;
}
