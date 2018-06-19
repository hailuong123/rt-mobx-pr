import { GET } from '../../../resources/libs/Fetch';

export let read = (id: string): Promise<any> => {
  return GET(`/api/any/${id}/list`);
};
