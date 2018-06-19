import * as React from 'react';
import { observer } from 'mobx-react';

interface Props {
}

interface State { }

@observer
class FooterComponent extends React.Component<Props, State> {
  render() {

    return (
      <footer>
          <div className="container">
              <p>© Bacoor 2017</p>
          </div>
      </footer>
    );
  }
}

export default FooterComponent as React.ComponentClass<Props>;
