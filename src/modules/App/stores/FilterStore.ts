import { observable, action } from 'mobx';

class FilterStore {
  @observable type: string;
  @observable props: any;
  @observable data: object;

  @action setDataFilter = (type: string, data: object) => {
    this.type = type;
    this.data = data;
  }

  @action removeFilter = () => {
    this.type = '';
    this.data = {};
  }
}

const filterStore = new FilterStore();
export default filterStore;
export { FilterStore };
