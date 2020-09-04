import { MetadataTable } from '@components/backoffice/MetadataTable';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { InfoMessage } from '@components/backoffice/InfoMessage';

export class DocumentExtras extends Component {
  prepareAlternativeTitle = element => {
    return [{ name: 'Title', value: element.value }];
  };

  prepareAlternativeAbstracts = element => {
    return [{ name: 'Abstract', value: element }];
  };

  render() {
    const { document } = this.props;
    if (
      document.metadata.alternative_titles ||
      document.metadata.alternative_abstracts
    ) {
      return (
        <>
          {!_isEmpty(document.metadata.alternative_titles) && (
            <>
              <Header as="h3">Alternative titles</Header>
              {document.metadata.alternative_titles.map(element => (
                // eslint-disable-next-line react/jsx-key
                <MetadataTable rows={this.prepareAlternativeTitle(element)} />
              ))}
            </>
          )}

          {!_isEmpty(document.metadata.alternative_abstracts) && (
            <>
              <Divider />
              <Header as="h3">Publication info</Header>
              {document.metadata.alternative_abstracts.map(element => (
                // eslint-disable-next-line react/jsx-key
                <MetadataTable
                  rows={this.prepareAlternativeAbstracts(element)}
                />
              ))}
            </>
          )}
        </>
      );
    } else {
      return (
        <InfoMessage
          header="No additional information stored."
          content="Edit document to add additional information"
        />
      );
    }
  }
}

DocumentExtras.propTypes = {
  document: PropTypes.object.isRequired,
};
