import { invenioConfig } from '@config';
import { SeriesMetadataExtensions } from '@modules/Series/SeriesMetadataExtensions';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import ShowMore from 'react-show-more';
import { Header, Tab } from 'semantic-ui-react';
import { SeriesIdentifiers } from '../SeriesIdentifiers';
import { SeriesPublication } from '../SeriesPublication';
import { SeriesSystemInfo } from '../SeriesSystemInfo';
import { SeriesAdditionalInfo } from '../SeriesAdditionalInfo';
import { SeriesNotes } from '../SeriesNotes';
import { SeriesMetadata } from './';

export default class SeriesMetadataTabs extends Component {
  panes = () => {
    const { series } = this.props;
    const panes = [
      {
        menuItem: 'Metadata',
        render: () => (
          <Tab.Pane attached="bottom">
            <SeriesMetadata seriesDetails={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Identifiers',
        render: () => (
          <Tab.Pane>
            <SeriesIdentifiers series={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Publication',
        render: () => (
          <Tab.Pane>
            <SeriesPublication seriesDetails={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Contents',
        render: () => (
          <Tab.Pane>
            <Header as="h5">Abstract </Header>
            <ShowMore
              lines={10}
              more="Show more"
              less="Show less"
              anchorClass="button-show-more"
            >
              {series.metadata.abstract}
            </ShowMore>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Notes',
        render: () => (
          <Tab.Pane>
            <SeriesNotes series={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Additional Info',
        render: () => (
          <Tab.Pane>
            <SeriesAdditionalInfo series={series} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'System info',
        render: () => (
          <Tab.Pane>
            <SeriesSystemInfo series={series} />
          </Tab.Pane>
        ),
      },
    ];
    const { extensions = {} } = series.metadata;
    if (
      !_isEmpty(extensions) &&
      !_isEmpty(invenioConfig.SERIES.extensions.fields)
    ) {
      panes.push({
        menuItem: invenioConfig.SERIES.extensions.label,
        render: () => (
          <Tab.Pane>
            <Overridable
              id="BackofficeSeriesMetadataTabs.Extensions"
              extensions={extensions}
            >
              <SeriesMetadataExtensions
                extensions={extensions}
                showDivider={false}
              />
            </Overridable>
          </Tab.Pane>
        ),
      });
    }
    return panes;
  };

  render() {
    return (
      <Tab
        className="bo-metadata-tab mb-20"
        menu={{ attached: 'top' }}
        panes={this.panes()}
      />
    );
  }
}

SeriesMetadataTabs.propTypes = {
  series: PropTypes.object.isRequired,
};
