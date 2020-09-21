import { FastField, Field, getIn } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

export class HourField extends Component {
  renderError(errors, name, direction = 'above') {
    const error = errors[name];
    return error
      ? {
          content: error,
          pointing: direction,
        }
      : null;
  }

  renderFormField = props => {
    const {
      fieldPath,
      inline,
      width,
      optimized,
      booleanField,
      ...uiProps
    } = this.props;
    const {
      form: { values, handleChange, handleBlur, errors, status },
    } = props;
    return (
      <Form.Field inline={inline} width={width}>
        <Form.Input
          fluid
          id={fieldPath}
          name={fieldPath}
          onChange={handleChange}
          onBlur={handleBlur}
          value={getIn(values, fieldPath, undefined)}
          error={this.renderError(status || errors, fieldPath)}
          {...uiProps}
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
  inline: PropTypes.bool,
  optimized: PropTypes.bool,
  width: PropTypes.number,
  booleanField: PropTypes.string,
};

HourField.defaultProps = {
  inline: false,
  optimized: true,
  width: 16,
  booleanField: '',
};
