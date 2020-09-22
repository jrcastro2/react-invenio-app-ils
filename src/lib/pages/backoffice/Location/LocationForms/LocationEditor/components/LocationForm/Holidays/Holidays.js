import React, { Component } from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { BooleanField } from '@forms/core/BooleanField';
import { HourField } from '@forms/core/HourField';
import { ExceptionsField } from '@forms/components';

export default class Holidays extends Component {
  renderweekdays(weekday, arrayPath) {
    const fieldPathIsOpen = `opening_weekdays.${arrayPath}.is_open`;
    const fieldPath = `opening_weekdays.${arrayPath}.times`;
    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <BooleanField label={weekday} fieldPath={fieldPathIsOpen} toggle />
        </Grid.Column>
        <Grid.Column width={2}>
          <HourField
            placeholder="From"
            fieldPath={`${fieldPath}.0.start_time`}
            parentFieldPath="opening_weekdays"
            index={arrayPath}
            dependantValue="is_open"
            required
          />
        </Grid.Column>
        <Grid.Column width={2}>
          <HourField
            placeholder="To"
            fieldPath={`${fieldPath}.0.end_time`}
            parentFieldPath="opening_weekdays"
            index={arrayPath}
            dependantValue="is_open"
            required
          />
        </Grid.Column>
        <Grid.Column width={2}>
          <HourField
            placeholder="From"
            fieldPath={`${fieldPath}.1.start_time`}
            parentFieldPath="opening_weekdays"
            index={arrayPath}
            dependantValue="is_open"
            required
          />
        </Grid.Column>
        <Grid.Column width={2}>
          <HourField
            placeholder="To"
            fieldPath={`${fieldPath}.1.end_time`}
            parentFieldPath="opening_weekdays"
            index={arrayPath}
            dependantValue="is_open"
            required
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
  render() {
    return (
      <>
        <Segment>
          <Header as="h4">Opening hours</Header>
          <Grid>
            {this.renderweekdays('Monday', 0)}
            {this.renderweekdays('Tuesday', 1)}
            {this.renderweekdays('Wednesday', 2)}
            {this.renderweekdays('Thursday', 3)}
            {this.renderweekdays('Friday', 4)}
            {this.renderweekdays('Saturday', 5)}
            {this.renderweekdays('Sunday', 6)}
          </Grid>
        </Segment>
        <Segment>
          <ExceptionsField />
        </Segment>
      </>
    );
  }
}
