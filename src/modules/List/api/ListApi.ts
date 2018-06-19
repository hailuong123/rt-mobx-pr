import { GET } from '../../../resources/libs/Fetch';
//
export let getList = (_type: string, _limit: number, _skip: number, _sortby: number, _query?: any): Promise<IListResponse> => {
  let type = '';
  switch (_type) {
    case 'blocks':
      type = 'block';
      break;
    case 'transactions':
      type = 'transaction';
      break;
    case 'accounts':
      type = 'address';
      break;
    default:
      type = '';
      break;
  }
  return GET(`/api/${type}/list?${(_query ? (_query  + '&') : '')}limit=${_limit}&skip=${_skip}&sortby=${_sortby}`);
};
