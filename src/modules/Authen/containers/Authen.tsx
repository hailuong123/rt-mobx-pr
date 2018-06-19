import * as React from 'react';
import { match as Match } from 'react-router';
import AuthenComponent from '../components/AuthenContent';
import AuthenStore from '../stores/AuthenStore';
import GlobalStore from '../../App/stores/GlobalStore';
import AppStore from '../../App/stores/AppStore';

interface Props {
  match: Match<IMatchParams>;
  props: any;
  location: any;
}
interface State {}

class AuthenContainer extends React.Component<Props, State> {

  componentWillMount() {
    if (AppStore.isMenuOpen) {
      AppStore.displayMenuMobile();
    }
  }

  render() {
    const { location } = this.props;
    
    const currentParam = location.pathname.split('/')[1];
    GlobalStore.setBreadscrumb(currentParam, ['home', currentParam]);

    if (AppStore.changeRoute) {
      AuthenStore.clearError();
    }

    return (
      <AuthenComponent currentParam={currentParam} />
    );
  }
}

export default AuthenContainer as React.ComponentClass<Props>;
