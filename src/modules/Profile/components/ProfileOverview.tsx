
import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import globalStore from '../../App/stores/GlobalStore';
import AppStore from '../../App/stores/AppStore';
import locale from '../resources/locale';

interface Props {}
interface State {}

@observer
class TokenContent extends React.Component<Props, State> {

  render () {
    const lang = globalStore.lang;
    const userInfo = AppStore.cookieUser;
    return (
      <div className="overviewInfo">
        <h2 className="titlePartProfile">
              {locale.account_overview[lang]}
              <span>{locale.accout_overview_textsum[lang]}</span>
        </h2>
        <div className="innerInfoAccount">
            <div className="l-info">
                <p><label>{locale.your_username[lang]}</label> {userInfo.username}</p>
            </div>
            <div className="l-info">
                <p><label>{locale.your_email_address[lang]}</label> {userInfo.email}</p>
            </div>
            <div className="l-info">
                <p><label>{locale.password[lang]}</label> ******** <Link to={'/profile?page=changepassword'} className="changePass">Change password <i className="fa fa-pencil"></i></Link></p>
            </div>
            <div className="l-info">
                <p><label>{locale.address_watch_list[lang]}</label> 1 Address Alert(s)</p>
            </div>
            <div className="l-info">
                <p><label>{locale.last_login[lang]}</label> 2018-01-16 06:09:08 (UTC)</p>
            </div>
        </div>
      </div>
    );
  }
}

export default TokenContent as React.ComponentClass<Props>;
