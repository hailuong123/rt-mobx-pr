import * as React from 'react';
import { match as Match } from 'react-router';
// import SuccessComponent from '../components/handle/success';
import globalStore from '../../App/stores/GlobalStore';

interface Props {
  match: Match<IMatchParams>;
  props: any;
  location: any;
}
interface State {}

class SuccessContainer extends React.Component<Props, State> {

  render() {
    const { location } = this.props;
    
    const currentParam = location.pathname.split('/')[1];
    globalStore.setBreadscrumb(currentParam, ['home', currentParam]);

    return (
      <div>12</div>
    );
  }
}

export default SuccessContainer as React.ComponentClass<Props>;
