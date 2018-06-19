import * as React from 'react';
// import lazyImport from 'resources/components/LazyImport';
import globalStore from '../stores/GlobalStore';
import AppStore from '../../App/stores/AppStore';
import HeaderComponent from '../components/Header';
import history from '../../../resources/libs/History';
import GlobalStore from '../stores/GlobalStore';
const Cookies = require('universal-cookie');

interface Props { }

interface State {
  currentPath: string;
}

class HeaderContainer extends React.Component<Props, State> {

  state = {
    currentPath: history.location.pathname,
  };
  componentWillMount() {
    if (AppStore.isMenuOpen) {
      AppStore.displayMenuMobile();
    }
  }
  render() {
    const cookieUser = new Cookies().get('LS_user');
    if (cookieUser) {
      AppStore.setCookie(cookieUser);
    } else {
      AppStore.setCookie('');
      localStorage.removeItem('LS_user');
    }

    globalStore.loadEtherPrice();
    if (history.location.pathname === '/') {
      document.body.classList.add('homepage');
      GlobalStore.setBreadscrumb('', []);
    } else {
      document.body.classList.remove('homepage');
    }
    AppStore.urlPathName(history.location.pathname + '' + history.location.search);

    return (
      <HeaderComponent handleOnTopMenuClick={this.onSelectLink} />
    ); 
  }

  onSelectLink = () => {
    this.setState({ currentPath: history.location.pathname });
  }
}

export default HeaderContainer as React.ComponentClass<Props>;
