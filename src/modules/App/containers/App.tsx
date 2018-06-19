import * as React from 'react';
import { Route } from 'react-router-dom';
import { Router } from 'react-router';
import { observer } from 'mobx-react';
import AppStore from '../stores/AppStore';

import Header from './Header';
import Footer from './Footer';
import NavItem from '../components/NavItem';

import lazyImport from '../../../resources/components/LazyImport';
import history from '../../../resources/libs/History';
const Cookies = require('universal-cookie');
/*
const LoginContainer = lazyImport(
  () => import('User/Login/containers/Login'),
  () => import('User/Login/stores/LoginStore')
);
*/
// import NotFoundContainer from '../../PageNotFound/containers/PageNotFound';
const HomeContainer = lazyImport(
  () => import('./../../Home/containers/Home'),
  () => import('./../../Home/stores/HomeStore')
);

const DetailContainer = lazyImport(
  () => import('./../../Detail/containers/Detail'),
  () => import('./../../Detail/stores/DetailStore')
);

const TokenContainer = lazyImport(
  () => import('./../../Token/containers/Token'),
  () => import('./../../Token/stores/TokenStore')
);

const AddressContainer = lazyImport(
  () => import('./../../Address/containers/Address'),
  () => import('./../../Address/stores/AddressStore'));

const ListContainer = lazyImport(
  () => import('./../../List/containers/List'),
  () => import('./../../List/stores/ListStore')
);

const ProfileContainer = lazyImport(
  () => import('./../../Profile/containers/Profile'),
  () => import('./../../Profile/stores/ProfileStore'));

const AuthenContainer = lazyImport(
  () => import('./../../Authen/containers/Authen'),
  () => import('./../../Authen/stores/AuthenStore'));

const VerifyContainer = lazyImport(
  () => import('./../../Authen/containers/Verify'),
  () => import('./../../Authen/stores/VerifyStore'));

  /*
const NotFoundContainer = lazyImport(
  () => import('./../../Authen/containers/Verify'));  
  */

interface Props { }
interface State { }

@observer
class AppContainer extends React.Component<Props, State> {

  render() {
    const cookieUser = new Cookies().get('LS_user');
    if (cookieUser) {
      AppStore.setCookie(cookieUser);
    } else {
      localStorage.removeItem('LS_user');
    }

    return (
      <Router history={history}>
        <React.Fragment>
          <div id="navMobile" className={AppStore.isMenuOpen ? 'on' : ''}>
            <ul>
                <NavItem />
            </ul>
          </div>

          <div onClick={AppStore.displayMenuMobile} className={`overlay-wrapper ${AppStore.isMenuOpen ? 'on' : ''}`}></div>

          <div id="app_containers_app" onClick={AppStore.handleAppClick} className={AppStore.isMenuOpen ? 'on' : ''}>
            <Header />
            <div className="">
              <Route exact={true} path="/" render={(props) => <HomeContainer {...props} />} />

              <Route path="/accounts" render={(props) => <ListContainer {...props} />} />
              <Route path="/address/:hash" render={(props) => <AddressContainer {...props} />} />

              <Route path="/block/:hash" render={(props) => <DetailContainer {...props} />} />
              <Route path="/transactions" render={(props) => <ListContainer {...props} />} />
              <Route path="/transactions/blockid=:blockid" render={(props) => <ListContainer {...props} />} />
              <Route path="/transaction/:hash" render={(props) => <DetailContainer {...props} />} />
              
              <Route path="/signin" render={(props) => <AuthenContainer {...props} />} />
              <Route path="/signup" render={(props) => <AuthenContainer {...props} />} />
              <Route path="/forgotpassword" render={(props) => <AuthenContainer {...props} />} />
              <Route path="/resetpassword" render={(props) => <AuthenContainer {...props} />} />
              <Route path="/logout" render={(props) => <AuthenContainer {...props} />} />
              <Route path="/verify" render={(props) => <VerifyContainer {...props} />} />
          
              <Route path="/profile" render={(props) => <ProfileContainer {...props} />} />
              
              <Route path="/search" render={(props) => <DetailContainer {...props} />} />
              <Route path="/blocks" render={(props) => <ListContainer {...props} />} />
              <Route path="/token" render={(props) => <TokenContainer {...props} />} />
              {/*<Route path="*" render={(props) => <NotFoundContainer {...props} />} />*/}
              
            </div>
            <Footer />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default AppContainer as React.ComponentClass<Props>;
