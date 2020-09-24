import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { DateInput } from 'semantic-ui-calendar-react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { toShortDate } from '@api/date';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.defaultValue,
    };
  }

  handleDateChange = (_, { name, value }) => {
    const { handleDateChange } = this.props;
    this.setState({ selectedDate: value });
    handleDateChange(value, name);
  };

  render() {
    const {
      initialDate,
      minDate,
      maxDate,
      error,
      label,
      id,
      name,
      placeholder,
      disable,
      disabledInput,
    } = this.props;
    const { selectedDate } = this.state;
    // Remove this code when this issue is solved -> https://github.com/arfedulov/semantic-ui-calendar-react/issues/202
    // and update `initialDate={initialDateChecked}` to `initialDate={initialDate}`
    //----------------------------------------------------------------------------
    let firstAvailableDay = DateTime.local();
    let initialDateChecked = initialDate;
    while (disable.includes(toShortDate(firstAvailableDay))) {
      firstAvailableDay = new DateTime(firstAvailableDay.plus({ days: 1 }));
    }
    if (initialDate < toShortDate(firstAvailableDay)) {
      initialDateChecked = toShortDate(firstAvailableDay);
    }
    //----------------------------------------------------------------------------
    return (
      <DateInput
        autoComplete="off"
        clearable
        closable
        disabled={disabledInput}
        disable={disable}
        iconPosition="left"
        initialDate={initialDateChecked}
        minDate={minDate}
        maxDate={maxDate}
        error={error}
        label={label}
        id={id}
        name={name}
        onChange={this.handleDateChange}
        placeholder={placeholder}
        value={selectedDate}
        data-test={selectedDate}
        dateFormat="YYYY-MM-DD"
        animation="none"
      />
    );
  }
}

DatePicker.propTypes = {
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  handleDateChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  initialDate: PropTypes.string,
  label: PropTypes.string,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  disable: PropTypes.array,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  disabledInput: PropTypes.bool,
};

DatePicker.defaultProps = {
  initialDate: '',
  minDate: '',
  maxDate: '',
  defaultValue: '',
  placeholder: '',
  name: 'selectedDate',
  id: null,
  label: null,
  error: null,
  disable: [],
  disabledInput: false,
};

export default Overridable.component('DatePicker', DatePicker);
