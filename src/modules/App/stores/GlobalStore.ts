import { observable, action } from 'mobx';

class GlobalStore {
  @observable statusResponse: object;
  @observable userLogged: boolean;
  @observable user: any;
  @observable etherPrice: IEtherPrice;
  @observable global: IGlobal;
  @observable lang: string = 'en';
  @observable currentPath: string = '';
  @observable breakcrumbs: string[] = [];

/*
  @action setMe = (me: IUser) => {
    this.me = me;
    this.lang = me.language || 'vi';
  }
*/
  @action statusResponseApi = (statusResponse: any) => {
    this.statusResponse = statusResponse;
  }

  @action setUserLocalStore = (statusLogin: boolean, user: any) => {
    this.userLogged = statusLogin;
    this.user = user;
  }

  @action setLang = (lang: string) => {
    this.lang = lang || 'en';
  }

  @action setGlobal = (data: IGlobal) => {
    this.global = data;
  }

  @action setBreadscrumb = (path: string, arr: string[]) => {
    this.currentPath = path;
    this.breakcrumbs = arr;
  }

  @action setEtherPrice = (price: IEtherPrice) => {
    this.etherPrice = price;
    localStorage.setItem('etherPrice', JSON.stringify(price));
  }

  @action loadEtherPrice = () => {
    try {
      const _data = localStorage.getItem('etherPrice');
      if (_data && _data !== '') {
        const _dataJson = JSON.parse(_data) as IEtherPrice;
        this.etherPrice = _dataJson;
      }
    } catch (err) {
      console.error(err);
    }
  }

  get myTZ(): number {
    return 7;
  }
}

const globalStore = new GlobalStore();

export default globalStore;
export { GlobalStore };
