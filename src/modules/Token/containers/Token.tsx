import * as React from 'react';
import { observer } from 'mobx-react';
import Breadcrumbs from '../../../resources/components/Breadcrumbs';
import TokenContentComponent from '../components/TokenContent';
import { match as Match } from 'react-router';
import globalStore from '../../App/stores/GlobalStore';
import TokenStore from '../stores/TokenStore';
import AppStore from '../../App/stores/AppStore';

interface Props {
  match: Match<IMatchParams>;
  props: any;
  location: any;
}
interface State { }

@observer
class TokenContainer extends React.Component<Props, State> {
  
  componentDidMount() {
    TokenStore.readTokens();
    
    const { location } = this.props;
    const currentParam = location.pathname.split('/')[1];
    globalStore.setBreadscrumb(currentParam, ['home', currentParam]);
  }

  componentWillMount() {
    if (AppStore.isMenuOpen) {
      AppStore.displayMenuMobile();
    }
  }

  render() {
    const tokens = TokenStore.tokens;

    if (!tokens || tokens.length === 0) {
      return null;
    }

    return (
      <div>
        <section id="mainContent">
          <div className="innerContent">

            <Breadcrumbs {...this.props} />

            <div className="content container">
              <div className="row">
              {
                (tokens || []).map((token, index) => (
                  <TokenContentComponent {...token} key={index}/>
                ))
              }
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default TokenContainer as React.ComponentClass<Props>;
