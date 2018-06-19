
interface ISearch {
  key: string;
  text: string;
}

interface ISearchResponse {
  dataResponseToken: ISearch[];
  dataResponseBlock: ISearch[];
  dataResponseTransaction: ISearch[];
  textSearch: string;
}

interface ISearchError {
  text?: string;
}
