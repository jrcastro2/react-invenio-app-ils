import { FastField, Field } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { TimeInput } from 'semantic-ui-calendar-react';

export class HourField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
    };
  }

  renderError(errors, name, direction = 'above') {
    const error = errors[name];
    return error
      ? {
          content: error,
          pointing: direction,
        }
      : null;
  }

  handleChange = (props, value, name) => {
    const {
      form: { setFieldValue },
    } = props;
    this.setState({
      time: name['value'],
    });
    setFieldValue(name['name'], name['value']);
  };

  renderFormField = props => {
    const {
      inline,
      width,
      fieldPath,
      placeholder,
      parrentFieldPath,
      index,
      dependantValue,
    } = this.props;
    const { time } = this.state;
    const {
      form: { values },
    } = props;
    let isDisabled = false;
    if (
      values &&
      parrentFieldPath &&
      (index || index === 0) &&
      dependantValue
    ) {
      isDisabled = !values[parrentFieldPath][index][dependantValue];
    }

    return (
      <Form.Field inline={inline} width={width}>
        <TimeInput
          name={fieldPath}
          placeholder={placeholder}
          value={time}
          disabled={isDisabled}
          iconPosition="left"
          closable
          onChange={(value, name) => {
            this.handleChange(props, value, name);
          }}
        />
      </Form.Field>
    );
  };

  render() {
    const { optimized, fieldPath } = this.props;
    const FormikField = optimized ? FastField : Field;
    return <FormikField name={fieldPath} component={this.renderFormField} />;
  }
}

HourField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
  parrentFieldPath: PropTypes.string,
  index: PropTypes.number,
  dependantValue: PropTypes.string,
  placeholder: PropTypes.string,
  inline: PropTypes.bool,
  optimized: PropTypes.bool,
  width: PropTypes.number,
};

HourField.defaultProps = {
  parrentFieldPath: '',
  index: null,
  dependantValue: '',
  inline: false,
  optimized: false,
  width: 16,
  placeholder: '',
};
