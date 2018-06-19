
import { GET } from '../../../resources/libs/Fetch';
//
export let geTokenList = (): Promise<ITokenResponse> => {
  return GET(`/api/token/list`);
};
