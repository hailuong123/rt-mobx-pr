import { observable } from 'mobx';

class CurrencyStore {
  @observable Dollar: Number = 700;
  @observable gasPrice: Number = 20000000000;
  @observable Ether: Number = 700;
  
}

const currencyStore = new CurrencyStore();

export default currencyStore;
export { CurrencyStore };