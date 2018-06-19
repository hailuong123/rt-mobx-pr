import * as React from 'react';

interface Props {
  name: string;
  value?: string;
  type?: string;
  error?: string | string[];
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  onChange?: Function;
  onFocus?: Function;
  className?: string;
  required?: boolean;
  requiredCheck?: Function;
  emailCheck?: Function;
  spaceCheck?: Function;
  CompareField?: Function;
  passwordCheck?: Function;
  checked?: string;
}

interface State {
  value: string;
}

class InputField extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value || ''
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      value: nextProps.value || ''
    });
  }

  render() {
    const { name, type, error, placeholder, minLength, maxLength, className = '' } = this.props;
    const { value } = this.state;
    
    return (
      <div className={className}>
        <input
          className={className || 'textInput'}
          ref={name}
          name={name}
          value={value}
          data-min={minLength}
          data-max={maxLength}
          placeholder={placeholder}
          autoComplete="off"
          type={type || 'text'}
          onChange={(e) => {
            this.onChange(e);
          }}
          onFocus={(e) => {
            this.onFocus(e);
          }}
        />
        {error &&
          <div className="class-error">{error}</div>
        }
      </div>
    );
  }

  onFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
    
    const { onChange, requiredCheck, emailCheck, CompareField, passwordCheck, spaceCheck } = this.props;
    if (onChange) {
      onChange(event);
    }
    if (passwordCheck) {
      passwordCheck(event);
    }
    if (CompareField) {
      CompareField(event);
    }
    if (requiredCheck) {
      requiredCheck(event);
    }
    if (emailCheck) {
      emailCheck(event);
    }
    if (spaceCheck) {
      spaceCheck(event);
    }
    
  }
}

export default InputField as React.ComponentClass<Props>;
