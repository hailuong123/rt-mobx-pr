import * as React from 'react';
import { observer } from 'mobx-react';
// import history from '../../../resources/libs/History';
// import '../../../assets/css/notfound.css';

interface Props {} 
interface State { }

@observer
class PageNotFoundContainer extends React.Component<Props, State> {

  render() {
    return (
      <div className="notPage">
        <div className="innerPage">
            <h1><a href="/" title="HB Explorer">HB Explorer</a></h1>
            <p><span>404</span><br />Page not found. That page doesn't exist!</p>
        </div>
      </div>
    );
  }
}

export default PageNotFoundContainer as React.ComponentClass<Props>;
