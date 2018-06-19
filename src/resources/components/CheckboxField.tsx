import * as React from 'react';
import { Fragment } from 'react';

interface Props {
  name: string;
  value: string;
  forName?: string;
  type?: string;
  error?: string | string[];
  onChange?: Function;
  className?: string;
  requiredCheck?: boolean;
}

interface State {
  value: string;
}

class CheckboxField extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value || '',
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      value: nextProps.value || ''
    });
  }

  render() {
    const { name, type, forName, error, className = '' } = this.props;
    const { value } = this.state;
    return (
      <Fragment>
          <input
            className={className || 'chkInput'}
            ref={name}
            id={forName}
            name={name}
            value={value}
            type={type || 'checkbox'}
            onChange={(e) => {
              this.onChange(e);
            }}
          />
        {error &&
          <div className="class-error">{error}</div>
        }
      </Fragment>
    );
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { onChange } = this.props;
    if (onChange) {
      onChange(event);
    }
  }
}

export default CheckboxField as React.ComponentClass<Props>;
