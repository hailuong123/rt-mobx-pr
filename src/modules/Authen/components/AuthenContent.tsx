import * as React from 'react';
import { observer } from 'mobx-react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPass from './ForgotPass';
import ResetPass from './ResetPass';
// import Verify from './Verify';
import { match as Match } from 'react-router';
import Breadcrumbs from '../../../resources/components/Breadcrumbs';
import AppStore from '../../App/stores/AppStore';

// import Breadcrumbs from '../../../resources/components/Breadcrumbs';
// import locale from '../resources/locale'; 

interface Props {
  match?: Match<IMatchParams>;
  currentParam: string;
}
interface State {}

@observer
export default class AuthenContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render () {
    const { currentParam } = this.props;
    return (
      <section id="mainContent">
        <div className="innerContent">
          <Breadcrumbs {...this.props} />
          <div className="content container authen">
              {currentParam === 'signin' && <SignIn currentParam={currentParam} />}
              {currentParam === 'signup' && <SignUp currentParam={currentParam} />}
              {currentParam === 'forgotpassword' && <ForgotPass currentParam={currentParam} />}
              {currentParam === 'resetpassword' && <ResetPass currentParam={currentParam} />}
              {
                AppStore.isLoading && <div className="loading"><span className="icon-loading">Loading....</span></div>  
              }
          </div>
        </div>
      </section>
    );
  }
}
