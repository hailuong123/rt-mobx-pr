
import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import Breadcrumbs from '../../../resources/components/Breadcrumbs';
import ProfileOverview from './ProfileOverview';
import ChangePassword from './ChangePassword';
import AddressWatchList from './AddressWatchList';
import AppStore from '../../App/stores/AppStore';
// import globalStore from '../../App/stores/GlobalStore';
// import locale from '../resources/locale';

interface Props {
  currentParam: string;
  query?: string;
}
interface State {}

@observer
class TokenContent extends React.Component<Props, State> {
  /* tslint:disable:no-string-literal */
  render () {
    // const lang = globalStore.lang;
    
    const query = this.props.query || '';
    return (
      <section id="mainContent" className="profile">
        <div className="innerContent">
          <Breadcrumbs {...this.props} />

          <div className="content container">

              <div className="row">
                <div className="col-sm-4">
                  <ul className="listAccount">
                    <li>
                      <span>My Account <i className="fa fa-angle-down"></i></span>
                      <ul>
                        <li><Link to={'/profile?page=myaccount'}>Account Profile</Link></li>
                      </ul>
                    </li>
                    <li>
                      <span>My Address <i className="fa fa-angle-down"></i></span>
                      <ul>
                        <li><Link to={'/profile?page=addresswatchlist'}>Address Watch List</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
                
                <div className="col-sm-8">
                  {(query['page'] === 'myaccount' || 
                    query['page'] === undefined) &&
                    <ProfileOverview />
                  }
                  
                  {query['page'] === 'changepassword' &&
                    <React.Fragment>
                      <ChangePassword />
                      {
                        AppStore.isLoading && <div className="loading"><span className="icon-loading">Loading....</span></div>  
                      }
                    </React.Fragment>
                  }

                  {query['page'] === 'addresswatchlist' &&
                    <AddressWatchList />
                  }
                </div>
              </div>

          </div>

        </div>
      </section>
    );
  }
}

export default TokenContent as React.ComponentClass<Props>;
