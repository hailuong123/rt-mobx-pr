import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import globalStore from '../../App/stores/GlobalStore';
import locale from '../resources/locale';

interface Props {}

interface State { }

@observer
class NavItem extends React.Component<Props, State> {
  render() {
    const lang = globalStore.lang;
    return (
        <React.Fragment>
          <li className="HomeLink"><a href={'/'}>{locale.home[lang]}</a></li>
          <li><Link to={'/accounts'}>{locale.accounts[lang]}</Link></li>
          <li><Link to={'/blocks'}>{locale.block[lang]}</Link></li>
          <li><Link to={'/transactions'}>{locale.transactions[lang]}</Link></li>
          <li><Link to={'/token'}>{locale.token[lang]}</Link></li>
        </React.Fragment>
    );
  }
}

export default NavItem as React.ComponentClass<Props>;
