import { observable, action } from 'mobx';
import { verifyUser, resendVerifyUser } from '../api/AuthenApi';
import { lib } from '../../../resources';
import AppStore from '../../App/stores/AppStore';
import locale from '../resources/locale';
import AuthenStore from './AuthenStore';
// import authenStore from './AuthenStore';

class VerifyStore {
  @observable status: boolean = false;
  @observable error: any;
  @observable data: object = {};

  @action verify(token: string) {
    verifyUser(token)
    .then(result => this.updateVerify(result))
    .catch(reason => this.handleError(reason));
  }

  @action resendVerify(username: string) {
    resendVerifyUser(username)
    .then(result => this.updateVerify(result))
    .catch(reason => this.handleError(reason));
  }

  @action updateVerify (result: any) {
    this.data = result;
    this.status = true;
    AuthenStore.clearError();
    AppStore.toggleLoading(false);
  }
  
  @action handleError (error: any) {
    this.error = error;
    this.status = false;
    lib.errorParser.doCatch(error, this, locale);
  }

}

const verifyStore = new VerifyStore();

export default verifyStore;
export { VerifyStore };
