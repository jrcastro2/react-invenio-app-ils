import { InfoMessage } from '@components/backoffice/InfoMessage';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Divider } from 'semantic-ui-react';
import { ShowMoreContent } from '@components/ShowMoreContent';
import _isEmpty from 'lodash/isEmpty';
import { MetadataTable } from '@components/backoffice/MetadataTable';

export class DocumentCuration extends Component {
  renderInternalNotes = () => {
    const { document } = this.props;

    if (!_isEmpty(document.metadata.internal_notes)) {
      return document.metadata.internal_notes.map((entry, index) => (
        <>
          User {entry.user} noted for field {entry.field}:<br />
          <p>{entry.value}</p>
          <br />
        </>
      ));
    }
  };

  prepareInternalNotes = element => {
    return [
      { name: 'Field', value: element.field },
      { name: 'User', value: element.user },
      { name: 'Notes', value: element.value },
    ];
  };

  render() {
    const { document } = this.props;

    let rows = [
      {
        name: 'Curated',
        value: document.metadata.curated,
      },
    ];

    if (
      !_isEmpty(document.metadata.note) ||
      !_isEmpty(document.metadata.internal_notes)
    ) {
      return (
        <>
          {document.metadata.note && (
            <>
              <Header as="h3">Public note</Header>
              <ShowMoreContent content={document.metadata.note} lines={10} />
            </>
          )}

          {document.metadata.note && document.metadata.internal_notes && (
            <Divider />
          )}

          {document.metadata.internal_notes && (
            <>
              <Header as="h3">Internal notes</Header>
              {document.metadata.internal_notes.map(element => (
                // eslint-disable-next-line react/jsx-key
                <MetadataTable rows={this.prepareInternalNotes(element)} />
              ))}
            </>
          )}
          {(document.metadata.note || document.metadata.internal_notes) && (
            <Divider />
          )}
          <>
            <Header as="h3">Curation</Header>
            <MetadataTable rows={rows} />
          </>
        </>
      );
    }
    return (
      <InfoMessage
        header="No stored information."
        content="Edit document to add information"
      />
    );
  }
}

DocumentCuration.propTypes = {
  document: PropTypes.object.isRequired,
};
