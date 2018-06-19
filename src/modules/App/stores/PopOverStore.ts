import { observable, action } from 'mobx';

class PopOverStore {
  @observable isOpen: boolean;
  @observable isOpenRightPanel: boolean;
  @observable title: string;
  Component: any;
  rightComponent: any;
  props: any;

  @action open = (target: any, props: any) => {
    this.Component = target;
    this.props = props;
    this.isOpen = true;
  }

  @action setTitle(title: string) {
    this.title = title;
  }

  @action close = () => {
    this.isOpen = false;
    this.title = '';
    this.Component = undefined;
    this.props = undefined;
  }

  @action openRightPanel(target: any) {
    this.isOpenRightPanel = true;
    this.rightComponent = target;
  }

  @action closeRightPanel() {
    this.isOpenRightPanel = false;
    this.rightComponent = undefined;
  }
}

const popOverStore = new PopOverStore();

export default popOverStore;
export { PopOverStore };