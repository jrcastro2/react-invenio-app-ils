import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from '@components/DatePicker';
import { locationApi } from '@api/locations';
import { fromISO, toISODate } from '@api/date';
import _isEmpty from 'lodash/isEmpty';

export class LocationDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: false,
      error: {},
    };
  }

  fetchLocation = async locationPid => {
    this.setState({ isLoading: true });
    try {
      const response = await locationApi.get(locationPid);
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      this.setState({ isLoading: false, error: error });
    }
  };

  listDisabled = () => {
    const { minDate, maxDate } = this.props;
    const { isLoading, error, data } = this.state;
    const disabled = [];
    if (!isLoading && !error.response && !_isEmpty(data)) {
      const weekdays = data.metadata.opening_weekdays,
        exceptions = data.metadata.opening_exceptions;
      let date = fromISO(minDate);
      const dateMax = fromISO(maxDate);
      let i = 0, // Maximum number of iterations
        eIdx = 0; // Exception index
      while (date <= dateMax && i <= 365) {
        const dateISO = toISODate(date);
        while (
          eIdx < exceptions.length &&
          exceptions[eIdx].end_date < dateISO
        ) {
          eIdx++;
        }
        let isOpen = weekdays[date.weekday - 1].is_open;
        if (eIdx < exceptions.length) {
          const exception = exceptions[eIdx];
          if (
            exception.start_date <= dateISO &&
            dateISO <= exception.end_date
          ) {
            isOpen = exception.is_open;
          }
        }
        if (!isOpen) {
          disabled.push(dateISO);
        }
        date = date.plus({ days: 1 });
      }
    }

    return disabled;
  };

  fetchData = () => {
    const { locationPid } = this.props;
    this.fetchLocation(locationPid);
  };

  render() {
    const {
      minDate,
      maxDate,
      handleDateChange,
      defaultValue,
      locationPid,
      ...otherProps
    } = this.props;
    const { isLoading } = this.state;
    return (
      <DatePicker
        {...otherProps}
        minDate={minDate}
        maxDate={maxDate}
        disable={this.listDisabled()}
        handleDateChange={handleDateChange}
        loading={isLoading}
        fetchData={this.fetchData}
        initialDate=""
        defaultValue={defaultValue}
        locationPid={locationPid}
      />
    );
  }
}

LocationDatePicker.propTypes = {
  locationPid: PropTypes.string.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  minDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
};

LocationDatePicker.defaultProps = {
  defaultValue: '',
};
