import { observable, action } from 'mobx';
import { getList } from '../api/ListApi';
import { lib } from '../../../resources';
import locale from '../resources/locale';

class ListStore {
  @observable listblock: IListBlock[];
  @observable total: number;
  @observable lastItemResponse: number;
  @observable firstItemResponse: number;
  @observable errors: ITokendError = {};

  @action readList(type: string, limit: number, skip: number, sortby: number, query?: any) {
    getList(type, limit, skip, sortby, query)
    .then(result => this.updateData(result))
    .catch(reason => lib.errorParser.doCatch(reason, this, locale));
  }

  @action updateData (result: IListResponse) {
    this.listblock = result.data;
    this.total = result.total;
    this.lastItemResponse = this.listblock[this.listblock.length - 1].add_time;
    this.firstItemResponse = this.listblock[0].add_time;
  }
}

const listStore = new ListStore();

export default listStore;
export { ListStore };
