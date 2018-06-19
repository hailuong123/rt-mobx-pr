import { observable, action } from 'mobx';
import { getDetail } from '../api/DetailApi';
import { lib } from '../../../resources';
import locale from '../resources/locale';
import AppStore from '../../App/stores/AppStore';

class DetailStore {
  @observable dataDetail: any;
  @observable dataExtends: any;
  @observable errors: ITokendError = {};

  @action getDataDetail(type: string, hash: string) {
    getDetail(type, hash)
    .then(result => this.updateData(result))
    .catch(reason => lib.errorParser.doCatch(reason, this, locale));
  }

  @action updateData (result: IDetailResponse) {
    this.dataDetail = result;
    AppStore.toggleLoading(false);
  }
}

const detailStore = new DetailStore();

export default detailStore;
export { DetailStore };
