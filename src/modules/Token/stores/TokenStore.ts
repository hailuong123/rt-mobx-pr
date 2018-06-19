import { observable, action } from 'mobx';
import { geTokenList } from '../api/TokenApi';
import { lib } from '../../../resources';
import locale from '../resources/locale';
// import globalStore from '../../App/stores/GlobalStore';

class TokenStore {
  @observable tokens: IToken[];
  @observable errors: ITokendError = {};

  @action readTokens() {
    geTokenList()
    .then(result => this.updateData(result))
    .catch(reason => lib.errorParser.doCatch(reason, this, locale));
  }

  @action updateData(result: ITokenResponse) {
    this.tokens = result.data;
  }
}

const tokenStore = new TokenStore();

export default tokenStore;
export { TokenStore };
