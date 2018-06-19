import * as React from 'react';
import { observer } from 'mobx-react';
// import { observable, action } from 'mobx';
import { Link } from 'react-router-dom';
import GlobalStore from '../../App/stores/GlobalStore';
import AppStore from '../../App/stores/AppStore';

import locale from '../resources/locale';
import history from '../../../resources/libs/History';
const Cookies = require('universal-cookie');

interface Props {}

interface State {}

@observer
class UserAuthenLog extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    //     
  }

  render() {
    window.addEventListener('storage', (e: StorageEvent) => {
        console.log(123);
        if (e.key === 'LS_user') {
            window.location.reload();
        }
    });

    const lang = GlobalStore.lang;
    
    return (
        <React.Fragment>
            {!AppStore.cookieUser && 
                <li className="signIn"><a href={'/signin'}>{locale.signin[lang]}</a></li>
            }
            
            {AppStore.cookieUser &&   /* tslint:disable:no-string-literal */
                <li className="signIn userlogged">
                    <p>
                        <Link to={'/profile'}> <i className="fa fa-user"></i> {AppStore.cookieUser['username']}</Link>{' '} 
                        <Link to={''} className="signOut" onClick={this.signOut}> {locale.signout[lang]}</Link>
                    </p>
                    <p className="mobile">
                        <Link to={'/profile'} className="profile"> <i className="fa fa-user"></i></Link>
                    </p>
                </li>
            }
        </React.Fragment>
    );
  }

  signOut = () => {
    new Cookies().remove('LS_user');
    localStorage.removeItem('LS_user');
    AppStore.clearCookie();
    history.push('/');
  }
}

export default UserAuthenLog as React.ComponentClass<Props>;
