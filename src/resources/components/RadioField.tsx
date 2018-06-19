import * as React from 'react';
import { Fragment } from 'react';

interface Props {
  name: string;
  value: string;
  textLabel: string;
  forName?: string;
  type?: string;
  error?: string | string[];
  onChange?: Function;
  className?: string;
  requiredCheck?: boolean;
  checked?: any;
}

interface State {
  value: string;
}

class RadioBoxField extends React.Component<Props, State> {

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
    const { name, type, forName, error, className = '', textLabel, checked } = this.props;
    const { value } = this.state;
    return (
      <Fragment>
          <input
            className={className || 'rdInput'}
            ref={name}
            id={forName}
            name={name}
            value={value}
            type={type || 'radio'}
            onChange={(e) => {
              this.onChange(e);
            }}
            checked={checked}
          />
          <label htmlFor={forName}>{textLabel}</label>
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

export default RadioBoxField as React.ComponentClass<Props>;
