import * as React from 'react';

interface Props {
  src: string;
  srcOnError: string;
  className: string;
}

interface State {
  src: string;
}

class ImageView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      src: props.src || ''
    };
  }

  render() {
    const { className } = this.props; 
    return (
      <img src={this.state.src} onError={this.onError} className={className} />
    );
  }

  onError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.preventDefault();
    this.setState({src: this.props.srcOnError});
  }
}

export default ImageView as React.ComponentClass<Props>;
