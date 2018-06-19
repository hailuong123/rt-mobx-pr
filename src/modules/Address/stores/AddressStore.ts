import { observable, action } from 'mobx';
import { getAddressDetail } from '../api/AddressApi';
import { lib } from '../../../resources';
import locale from '../resources/locale';
import AppStore from '../../App/stores/AppStore';
// import globalStore from '../../App/stores/GlobalStore';

class AddressStore {
  @observable data: any;
  @observable errors: ITokendError = {};

  @action readAddress(hash: string) {
    getAddressDetail(hash)
    .then(result => this.updateData(result))
    .catch(reason => lib.errorParser.doCatch(reason, this, locale));
  }

  @action updateData(result: ITokenResponse) {
    this.data = result.data;
    AppStore.toggleLoading(false);
  }
}

const addressStore = new AddressStore();

export default addressStore;
export { AddressStore };
