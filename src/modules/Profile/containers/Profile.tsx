import * as React from 'react';
import { observer } from 'mobx-react';
import { match as Match } from 'react-router';
import ProfileContent from '../components/ProfileContent';

import GlobalStore from '../../App/stores/GlobalStore';
import AppStore from '../../App/stores/AppStore';
import ProfileStore from '../stores/ProfileStore';
import * as queryString from 'query-string';
import history from '../../../resources/libs/History';
// import locale from '../resources/locale';

interface Props {
  match: Match<IMatchParams>;
  props: any;
  location: any;
}
interface State { }

@observer
class ProfileContainer extends React.Component<Props, State> {

  componentWillMount() {
    if (AppStore.isMenuOpen) {
      AppStore.displayMenuMobile();
    }
  }

  render() {
    if (!AppStore.cookieUser) {
      history.push('/');
      return null;
    }
    const { location } = this.props;
    const query = queryString.parse(location.search);
    const currentParam = location.pathname.split('/')[1];
    GlobalStore.setBreadscrumb(currentParam, ['home', currentParam]);
    
    if (AppStore.changeRoute) {
      ProfileStore.handleError({});
    }

    return (
        <ProfileContent currentParam={currentParam} query={query} />
    );
  }
}

export default ProfileContainer as React.ComponentClass<Props>;
