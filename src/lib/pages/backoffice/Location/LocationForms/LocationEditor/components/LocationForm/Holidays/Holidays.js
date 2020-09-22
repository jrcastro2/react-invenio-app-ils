import React, { Component } from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { BooleanField } from '@forms/core/BooleanField';
import { HourField } from '@forms/core/HourField';
import { ExceptionsField } from '@forms/components';

export default class Holidays extends Component {
  renderHourField(fieldPath, index, placeholder) {
    return (
      <Grid.Column width={3}>
        <HourField
          placeholder={placeholder}
          fieldPath={fieldPath}
          parentFieldPath="opening_weekdays"
          index={index}
          dependantValue="is_open"
          required
        />
      </Grid.Column>
    );
  }

  renderHoursPeriod(arrayPath, fieldPath, idx) {
    return (
      <>
        {this.renderHourField(
          `${fieldPath}.${idx}.start_time`,
          arrayPath,
          'From'
        )}
        {this.renderHourField(`${fieldPath}.${idx}.end_time`, arrayPath, 'To')}
      </>
    );
  }

  renderWeekday(weekday, arrayPath) {
    const fieldPathIsOpen = `opening_weekdays.${arrayPath}.is_open`;
    const fieldPath = `opening_weekdays.${arrayPath}.times`;
    return (
      <Grid.Row key={arrayPath}>
        <Grid.Column width={3}>
          <BooleanField label={weekday} fieldPath={fieldPathIsOpen} toggle />
        </Grid.Column>
        {this.renderHoursPeriod(arrayPath, fieldPath, 0)}
        <Grid.Column width={1} />
        {this.renderHoursPeriod(arrayPath, fieldPath, 1)}
      </Grid.Row>
    );
  }

  render() {
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    return (
      <>
        <Segment>
          <Header as="h4">Opening hours</Header>
          <Grid>
            {weekdays.map((weekday, i) => this.renderWeekday(weekday, i))}
          </Grid>
        </Segment>
        <Segment>
          <ExceptionsField />
        </Segment>
      </>
    );
  }
}
