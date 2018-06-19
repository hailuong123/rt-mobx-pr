import { observable, action } from 'mobx';

class AppStore {
  @observable isOpenBotRightPanel: boolean;
  @observable isDisplayTopPanel: boolean = true;
  @observable isOpenPopOverMenu: boolean;
  @observable isMenuOpen: boolean = false;
  @observable isLoading: boolean = false;
  @observable pathHistory: string = '';
  @observable pathName: string = '';
  @observable changeRoute: boolean = false;
  @observable cookieUser: any;

  @action toggleBotRightPanel = () => {
    this.isOpenBotRightPanel = !this.isOpenBotRightPanel;
  }

  @action displayTopPanel = (isDisplay: boolean) => {
    this.isDisplayTopPanel = isDisplay;
  }

  @action displayPopOverMenu = (isDisplay: boolean) => {
    this.isOpenPopOverMenu = isDisplay;
  }

  @action displayMenuMobile = () => {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @action toggleLoading = (isLoad: boolean) => {
    this.isLoading = isLoad;
  }

  @action handleAppClick = (event: any) => {
    this.displayPopOverMenu(false);
  }

  @action urlPathName = (pathName: string) => {
    if (this.pathHistory !== pathName) {
      // change route
      this.pathHistory = this.pathName;
      this.pathName = pathName;
      this.changeRoute = true;
    } else {
      // no change route
      this.changeRoute = false;
    }
  }

  @action setCookie = (cookie: any) => {
    this.cookieUser = cookie;
  }

  @action clearCookie = () => {
    this.cookieUser = null;
  }
}

const appStore = new AppStore();

export default appStore;
export { AppStore };