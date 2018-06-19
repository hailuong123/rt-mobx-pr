import * as React from 'react';
import { match as Match } from 'react-router';
import VerifyComponent from '../components/Verify';
import globalStore from '../../App/stores/GlobalStore';

interface Props {
  match: Match<IMatchParams>;
  props: any;
  location: any;
}
interface State {}

class VerifyContainer extends React.Component<Props, State> {

  componentDidMount() {
    // 
  }

  render() {
    const { location } = this.props;
    
    const currentParam = location.pathname.split('/')[1];
    globalStore.setBreadscrumb(currentParam, ['home', currentParam]);

    return (
      <VerifyComponent currentParam={currentParam} />
    );
  }
}

export default VerifyContainer as React.ComponentClass<Props>;
