import React, { Component } from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { BooleanField } from '@forms/core/BooleanField';
import { HourField } from '@forms/core/HourField';
import { ExceptionsField } from '@forms/components';

export default class Holidays extends Component {
  renderweekdays(weekday, arrayPath) {
    const fieldPathIsOpen = `opening_weekdays.${arrayPath}.is_open`;
    const fieldPath = `opening_weekdays.${arrayPath}`;
    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <BooleanField label={weekday} fieldPath={fieldPathIsOpen} toggle />
        </Grid.Column>
        <Grid.Column width={4}>
          <HourField
            placeholder="From"
            fieldPath={`${fieldPath}.from`}
            parrentFieldPath="opening_weekdays"
            index={arrayPath}
            dependantValue="is_open"
            required
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <HourField
            placeholder="To"
            fieldPath={`${fieldPath}.to`}
            parrentFieldPath="opening_weekdays"
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
        <Segment basic>
          <Header as="h4">Opening hours</Header>
          <Grid>
            {this.renderweekdays('monday', 0)}
            {this.renderweekdays('tuesday', 1)}
            {this.renderweekdays('wednesday', 2)}
            {this.renderweekdays('thursday', 3)}
            {this.renderweekdays('friday', 4)}
            {this.renderweekdays('saturday', 5)}
            {this.renderweekdays('sunday', 6)}
          </Grid>
        </Segment>
        <Segment>
          <ExceptionsField />
        </Segment>
      </>
    );
  }
}
