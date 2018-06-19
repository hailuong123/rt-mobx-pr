import { GET } from '../../../resources/libs/Fetch';

export let getDetail = (_type: string, _keyword: string, getTranx?: string): Promise<any> => {
  const tranx = _type === 'block' ? '?getTranxs=1' : '';
  return GET(`/api/${_type}/${_keyword}${tranx}` );
};
