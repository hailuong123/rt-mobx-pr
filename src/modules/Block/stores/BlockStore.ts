import { observable, action } from 'mobx';
// import globalStore from '../../App/stores/GlobalStore';

class BlockStore {
  @observable number: string = '';

  @action async doGetNumb() {
    // 
  }
}

const blockStore = new BlockStore();

export default blockStore;
export { BlockStore }; 
