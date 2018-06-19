import { observable, action } from 'mobx';
import { changePassword, getWatchList, setWatchList, editWatchList, deleteWatchList } from '../api/ProfileApi';
// import { lib } from '../../../resources';
import locale from '../resources/locale';
import AppStore from '../../App/stores/AppStore';
import globalStore from '../../App/stores/GlobalStore';

class ProfileStore {
  @observable errors: any = {};
  @observable success: string;
  @observable isValid: boolean = true;
  @observable status: boolean = false;
  @observable data: any;
  @observable currentComponent: any;
  
  @action readProfile(userID: string, data: any, currentComponent?: string) {
    changePassword(userID, data)
    .then(result => this.updateData(result))
    .catch(reason => this.handleError(reason, currentComponent));
  }

  getWatchList = async (userID: string, data: any, currentComponent?: string) => {
    await getWatchList(userID, data)
    .then(result => this.updateData(result.data))
    .catch(reason => this.handleError(reason, currentComponent));
  }

  setWatchList = async (userID: string, data: any, currentComponent?: string) => {
    await setWatchList(userID, data)
    .then((result) => {
      this.success_update('add_watchlist_success');
      this.getWatchList(userID, data);
    })
    .catch(reason => this.handleError(reason, currentComponent));
  }

  editWatchList = async (userID: string, watchListID: string, data: any, currentComponent?: string) => {
    await editWatchList(userID, watchListID, data)
    .then(() => {
      this.success_update('edit_watchlist_success');
      this.getWatchList(userID, data);
    })
    .catch(reason => this.handleError(reason, currentComponent));
  }

  @action deleteWatchList(userID: string, watchListID: string, data: any, currentComponent?: string) {
    deleteWatchList(userID, watchListID, data)
    .then(() => {
      this.success_update('remove_watchlist_success');
    })
    .catch(reason => this.handleError(reason, currentComponent));
  }

  @action updateData (result: any) {
    this.data = result;
    this.status = true;
    AppStore.toggleLoading(false);
  }
  
  @action handleError (err: any, currentComponent?: string) {
    this.status = false;
    this.errors = err; 
    this.errors['componentDisplay'] = currentComponent;
    // lib.errorParser.doCatch(err, this, locale);
    AppStore.toggleLoading(false);
  }

  @action checkValid(isValid: boolean) {
    this.isValid = isValid;
  }

  @action clearError() {
    this.status = false;
    this.errors = '';
  }

  @action success_update(successNote: string) {
    this.status = true;
    this.success = (locale[successNote] || {})[globalStore.lang];
  }
}

const profileStore = new ProfileStore();

export default profileStore;
export { ProfileStore };
