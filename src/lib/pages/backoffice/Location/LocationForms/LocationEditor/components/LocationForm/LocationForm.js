import { delay } from '@api/utils';
import { BaseForm } from '@forms/core/BaseForm';
import { GroupField } from '@forms/core/GroupField';
import { StringField } from '@forms/core/StringField';
import { TextField } from '@forms/core/TextField';
import { goTo } from '@history';
import { BackOfficeRoutes } from '@routes/urls';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Holidays } from './Holidays';
import { Header, Segment, Divider } from 'semantic-ui-react';
import { locationApi } from '@api/locations/location';

export class LocationForm extends Component {
  prepareData = data => {
    return pick(data, [
      'name',
      'address',
      'email',
      'phone',
      'notes',
      'opening_weekdays',
      'opening_exceptions',
    ]);
  };

  prepareDataForCreation = () => {
    return {
      opening_weekdays: [
        {
          weekday: 'monday',
          is_open: true,
        },
        {
          weekday: 'tuesday',
          is_open: true,
        },
        {
          weekday: 'wednesday',
          is_open: true,
        },
        {
          weekday: 'thursday',
          is_open: true,
        },
        {
          weekday: 'friday',
          is_open: true,
        },
        {
          weekday: 'saturday',
          is_open: false,
        },
        {
          weekday: 'sunday',
          is_open: false,
        },
      ],
      opening_exceptions: [],
    };
  };

  processData = data => {
    if (data['opening_exceptions'] === undefined) {
      data['opening_exceptions'] = [];
    } else {
      data['opening_exceptions'].forEach(element => {
        if (element['is_open'] === undefined) {
          element['is_open'] = false;
        }
      });
    }
    return data;
  };

  updateLocation = async (pid, data) => {
    // const { updateLocation } = this.props;
    data = this.processData(data);
    // const response = await updateLocation(pid, data);
    const response = await locationApi.update(pid, data);
    await delay();
    return response;
  };

  createLocation = async data => {
    // const { createLocation, hasError } = this.props;
    data = this.processData(data);
    // const response = await createLocation(data);
    const response = await locationApi.create(data);
    await delay();
    return response;
  };

  successCallback = () => goTo(BackOfficeRoutes.locationsList);

  render() {
    const {
      data: formInitialData,
      successSubmitMessage,
      title,
      pid,
    } = this.props;
    console.log(formInitialData);
    return (
      <BaseForm
        initialValues={
          formInitialData.metadata
            ? this.prepareData(formInitialData.metadata)
            : this.prepareDataForCreation()
        }
        editApiMethod={this.updateLocation}
        createApiMethod={this.createLocation}
        successCallback={this.successCallback}
        successSubmitMessage={successSubmitMessage}
        title={title}
        pid={pid ? pid : undefined}
      >
        <Header as="h3" attached="top">
          Basic information
        </Header>
        <Segment attached>
          <GroupField>
            <StringField label="Name" fieldPath="name" required />
            <StringField label="Phone" fieldPath="phone" />
          </GroupField>
          <GroupField>
            <StringField label="Email" fieldPath="email" />
            <StringField label="Address" fieldPath="address" />
          </GroupField>
          <TextField label="Notes" fieldPath="notes" rows={5} />
          <Divider />
          <Holidays />
        </Segment>
      </BaseForm>
    );
  }
}

LocationForm.propTypes = {
  data: PropTypes.object,
  successSubmitMessage: PropTypes.string,
  // createLocation: PropTypes.func.isRequired,
  // updateLocation: PropTypes.func.isRequired,
  title: PropTypes.string,
  pid: PropTypes.string,
  // error: PropTypes.object,
  // hasError: PropTypes.object,
};

LocationForm.defaultProps = {
  data: null,
  successSubmitMessage: null,
  title: null,
  pid: null,
};
