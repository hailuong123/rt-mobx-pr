interface IListBlock {
  _id: string;
  number: number;
  age: number;
  txn: number;
  uncles: number;
  miner: string;
  gasUsed: number;
  gasLimit: number;
  gasPrice: number;
  reward: number;
  add_time: number;
}

interface IListResponse {
   data: IListBlock[];
   total: number;
}

interface IListError {
  text?: string
}