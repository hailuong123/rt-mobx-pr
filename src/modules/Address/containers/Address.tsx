import * as React from 'react';
import { observer } from 'mobx-react';
import AddressComponent from '../components/AddressContent';
import { match as Match } from 'react-router';
import AppStore from '../../App/stores/AppStore';
import AddressStore from '../stores/AddressStore';
// import locale from '../resources/locale';

interface Props {
  match: Match<IMatchParams>;
  props: any;
  location: any;
}
interface State {}

@observer
class TokenContainer extends React.Component<Props, State> {
  
  componentWillMount() {
    let hash = '';
    if (this.props.match && this.props.match.params) {
      hash = (this.props.match as any).params.hash;
    }
    const type = this.props.location.pathname.split('/')[1];
    
    if (type === '' || !type) {
      return;
    }

    AppStore.toggleLoading(true);
    AddressStore.readAddress(hash);
  }

  render() {
    // const lang = globalStore.lang;
    const address = AddressStore.data;
    if (!address || address.length === 0) {
      return null;
    }

    return (
      <div>
        <section id="mainContent">
          <div className="innerContent">
            <div className="headerTitle">
              <div className="container">
                  <h2>
                    Address
                  </h2>
                  <div className="breakcrumb">
                    <ul>
                      <li>
                        <a href="/">Home</a>&nbsp;/&nbsp;
                      </li>
                      <li>
                        <span>Address</span>
                      </li>
                    </ul>
                  </div>
              </div>
              <hr />
            </div>

            <div className="content container">
              <div className="row">
                  <AddressComponent data={address} />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default TokenContainer as React.ComponentClass<Props>;
