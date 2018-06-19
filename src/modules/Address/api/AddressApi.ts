
import { GET } from '../../../resources/libs/Fetch';
//
export let getAddressDetail = (hash: string): Promise<ITokenResponse> => {
  return GET(`/api/address/${hash}`);
};
