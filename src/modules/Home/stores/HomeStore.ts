import { observable, action } from 'mobx';
import { requestSearch } from '../api/HomeApi';
// import globalStore from '../../App/stores/GlobalStore';
import { lib } from '../../../resources';
import locale from '../resources/locale';

class HomeStore {
  @observable searchData: ISearchResponse;
  @observable errors: ISearchError = {};

  @action readResultSearch(keyword: string) {
    requestSearch(keyword)
    .then(result => this.updateData(result))
    .catch(reason => lib.errorParser.doCatch(reason, this, locale));
  }
  
  @action updateData(result: ISearchResponse) {
    this.searchData = result;
  }
}

const homeStore = new HomeStore();

export default homeStore;
export { HomeStore };
