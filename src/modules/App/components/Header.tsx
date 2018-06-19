import * as React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import EtherPrice from './EtherPrice';
import UserAuthenLog from './UserAuthenLog';
import NavItem from './NavItem';
import AppStore from '../stores/AppStore';

interface Props {
  handleOnTopMenuClick: () => void; 
}

interface State { }

@observer
class HeaderComponent extends React.Component<Props, State> {

  render() {
    return (
        <React.Fragment>
            <div className="topbar">
                <div className="container">
                    <EtherPrice />
                </div>
            </div>

            <header>
                <div className="container">
                    <div id="menuToggle" onClick={AppStore.displayMenuMobile}>
                        <div className="menuIcon"></div>
                    </div>
                    
                    <h1 className="logo">
                        <Link to={'/'} className="HB Explorer" title="HB Explorer">HB Explorer</Link>
                    </h1>

                    <EtherPrice />
                    <nav>
                        <ul className="float-right menu">
                            <NavItem />
                            <UserAuthenLog />
                        </ul>
                    </nav>
                </div> 
            </header>
        </React.Fragment>
    );
  }
}

export default HeaderComponent as React.ComponentClass<Props>;
