import { InfoMessage } from '@components/backoffice/InfoMessage';
import { MetadataTable } from '@components/backoffice/MetadataTable';
import { groupedSchemeValueList } from '@components/backoffice/utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class SeriesAdditionalInfo extends Component {
  render() {
    const { series } = this.props;
    return series.metadata.alternative_titles ? (
      <MetadataTable
        rows={groupedSchemeValueList(
          series.metadata.alternative_titles,
          'Alternative titles'
        )}
      />
    ) : (
      <InfoMessage
        header="No additional info."
        content="Edit series to add additional info"
      />
    );
  }
}

SeriesAdditionalInfo.propTypes = {
  series: PropTypes.object.isRequired,
};
