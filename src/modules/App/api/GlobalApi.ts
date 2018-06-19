import { GET } from '../../../resources/libs/Fetch';

export let loadGlobal = (): Promise<IGlobal> => {
  return GET('/api/global').catch(ex => Promise.resolve(null));
};
