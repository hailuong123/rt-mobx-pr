import * as React from 'react';

interface Props {
  errors: any;
  username?: string;
}
interface State {}

export default class ErrorContent extends React.Component<Props, State> {

  render () {
    return (
      <React.Fragment>
        <div>
        </div>
      </React.Fragment>
    );
  }
}
