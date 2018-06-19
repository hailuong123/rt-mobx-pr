import { observable, action } from 'mobx';
import { signIn, signUp, forgotPass, resetPass } from '../api/AuthenApi';
import { lib } from '../../../resources';
import locale from '../resources/locale';
import AppStore from '../../App/stores/AppStore';
const Cookies = require('universal-cookie');

class AuthenStore {
  @observable userAuthen: any;
  @observable message: string;
  @observable total: number;
  @observable isValid: boolean = true;
  @observable dataValid: object;
  @observable status: boolean = false;
  @observable errors: object = {};
  @observable currentComponent: any;

  @action validField(isValid: boolean) {
    this.isValid = isValid;
  }

  @action signIn(body: any, currentComponent: string) {
    signIn(body)
    .then(result => this.updateDataUserAuthen(result, currentComponent, 'signin'))
    .catch(reason => this.handleError(reason, currentComponent));
  }

  @action signUp(body: any, currentComponent: string) {
    signUp(body)
    .then(result => this.updateDataUserAuthen(result, currentComponent))
    .catch(reason => this.handleError(reason, currentComponent));
  }

  @action forgotPass(email: string, currentComponent: string) {
    forgotPass(email)
    .then(result => this.updateDataUserAuthen(result, currentComponent))
    .catch(reason => this.handleError(reason, currentComponent));
  }

  @action resetPass(body: any, currentComponent: string) {
    resetPass(body)
    .then(result => this.updateDataUserAuthen(result, currentComponent))
    .catch(reason => this.handleError(reason, currentComponent));
  }

  @action updateDataUserAuthen (result: any, currentComponent: string, actionAuthen?: string) {
    this.userAuthen = result;
    this.currentComponent = currentComponent;
    this.status = true;
    AppStore.toggleLoading(false);
    if (actionAuthen === 'signin') {
      const cookies = new Cookies();
      const expiresTime = 5;
      cookies.set('LS_user', JSON.stringify(result), { path: '/', maxAge: expiresTime });
      AppStore.setCookie(cookies.get('LS_user'));

      // set localstore when tab change
      localStorage.setItem('LS_user', cookies.get('LS_user'));
    }
  }
  
  @action handleError (err: any, currentComponent?: string) {
    this.errors = err;
    this.errors['componentDisplay'] = currentComponent;
    lib.errorParser.doCatch(err, this, locale);
    AppStore.toggleLoading(false);
  }

  @action clearError() {
    this.errors = {};
    this.status = false;
  }

  @action signOut() {
    this.userAuthen = '';
    sessionStorage.removeItem('LS_user');
  }

}

const authenStore = new AuthenStore();

export default authenStore;
export { AuthenStore };
