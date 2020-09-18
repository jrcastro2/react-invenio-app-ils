import React, { Component } from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { BooleanField } from '@forms/core/BooleanField';
// import { HourField } from '@forms/core/HourField';
import { ExceptionsField } from '@forms/components';
import { TimeInput } from 'semantic-ui-calendar-react';

export default class Holidays extends Component {
  renderweekdays(weekday, arrayPath) {
    const fieldPath = `opening_weekdays.${arrayPath}.is_open`;
    return (
      <Grid.Row>
        <Grid.Column width={4}>
          <BooleanField label={weekday} fieldPath={fieldPath} toggle />
        </Grid.Column>
        <Grid.Column width={4}>
          <TimeInput
            name="from"
            placeholder="From"
            // value={this.state.time}
            iconPosition="left"
            // onChange={this.handleChange}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <TimeInput
            name="to"
            placeholder="To"
            // value={this.state.time}
            iconPosition="left"
            // onChange={this.handleChange}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }
  render() {
    // const weekdays = ['monday', 'tuesday'];
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
