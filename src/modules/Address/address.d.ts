
interface IAddress {
}

interface IAddressResponse {
  data: IAddress[];
  total: number;
}

interface IAddressError {
  text?: string;
}
