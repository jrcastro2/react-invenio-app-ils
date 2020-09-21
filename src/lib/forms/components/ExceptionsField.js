import { AccordionField } from '@forms/core/AccordionField';
import { ArrayField } from '@forms/core/ArrayField';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import React, { Component } from 'react';
import { DeleteActionButton } from './DeleteActionButton';
import { BooleanField } from '@forms/core/BooleanField';
import { DateInputField } from '@forms/core/DateTimeFields/DateInputField';

export class ExceptionsField extends Component {
  renderFormField({ arrayPath, indexPath, ...arrayHelpers }) {
    const objectPath = `${arrayPath}.${indexPath}`;
    return (
      <GroupField
        border
        grouped
        widths="equal"
        action={
          <DeleteActionButton onClick={() => arrayHelpers.remove(indexPath)} />
        }
      >
        <GroupField>
          <StringField label="Title" fieldPath={`${objectPath}.title`} />
          <BooleanField
            label="Open"
            fieldPath={`${objectPath}.is_open`}
            toggle
          />
        </GroupField>

        <GroupField widths="equal">
          <DateInputField
            label="Start date"
            fieldPath={`${objectPath}.start_date`}
            optimized
            required
          />
          <DateInputField
            label="End date"
            fieldPath={`${objectPath}.end_date`}
            optimized
            required
          />
        </GroupField>
      </GroupField>
    );
  }

  render() {
    return (
      <AccordionField
        label="Holidays"
        fieldPath="opening_exceptions"
        content={
          <ArrayField
            fieldPath="opening_exceptions"
            defaultNewValue={{
              title: undefined,
              is_open: undefined,
              start_date: undefined,
              end_date: undefined,
            }}
            renderArrayItem={this.renderFormField}
            addButtonLabel="Add new holidays"
          />
        }
      />
    );
  }
}
