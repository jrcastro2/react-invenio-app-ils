import { MetadataTable } from '@components/backoffice/MetadataTable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export class SeriesPublication extends Component {
  prepareData = () => {
    const { seriesDetails } = this.props;

    return [
      {
        name: 'Edition',
        value: seriesDetails.metadata.edition,
      },
      {
        name: 'Publication Year',
        value: seriesDetails.metadata.publication_year,
      },
      { name: 'Publisher', value: seriesDetails.metadata.publisher },
    ];
  };

  render() {
    const rows = this.prepareData();

    return (
      <Container fluid className="series-metadata">
        <MetadataTable rows={rows} />
      </Container>
    );
  }
}

SeriesPublication.propTypes = {
  seriesDetails: PropTypes.object.isRequired,
};
