import * as React from 'react';
import { observable } from 'mobx';

import '../../../node_modules/react-datetime/css/react-datetime.css';
// import CalendarField from 'react-calendar';
import * as Datetime from 'react-datetime';
import * as moment from 'moment';

interface Props {
  name: string;
  onChangeDate?: Function;
  onChange?: Function;
}
interface State {
  date?: Number;
  showTime?: boolean;
  showCalendar?: boolean;
  disabled?: boolean;
  value: string;
}

class Calendar extends React.Component<Props, State> {
  @observable date: Number;

  constructor(props: Props) {
    super(props);

    this.state = {
      showCalendar: false,
      disabled: false,
      value: ''
    };
  }

  validDate = (current: any) => {
    let dateRange = moment().subtract(0, 'day');
    return current.isBefore(dateRange);
  }

  onChange = (date: any) => {
    const { onChangeDate, name } = this.props;
    if (onChangeDate) {
      onChangeDate(date, name);
    }
  }

  onFocus = () => {
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  }

  render () {
    return (
      <div>
        <Datetime 
          closeOnSelect={true} 
          utc={true} 
          isValidDate={this.validDate} 
          onChange={this.onChange} 
          inputProps={{ readOnly: true, name: this.props.name }}
        />
      </div>
    );
  }
}

export default Calendar as React.ComponentClass<Props>;