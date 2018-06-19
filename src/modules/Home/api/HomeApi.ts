import { GET } from '../../../resources/libs/Fetch';

export let requestSearch = (keyword: string): Promise<any> => {
  return GET(`/api/search?s=${keyword}`);
};
