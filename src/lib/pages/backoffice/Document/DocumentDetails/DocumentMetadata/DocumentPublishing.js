import { MetadataTable } from '@components/backoffice/MetadataTable';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import capitalize from 'lodash/capitalize';
import { InfoMessage } from '@components/backoffice/InfoMessage';

export class DocumentPublishing extends Component {
  prepareImprintInfo = () => {
    const { document } = this.props;

    return [
      { name: 'Publisher', value: document.metadata.imprint.publisher },
      { name: 'Date', value: document.metadata.imprint.date },
      { name: 'Place', value: document.metadata.imprint.place },
      { name: 'Reprint date', value: document.metadata.imprint.reprint_date },
    ];
  };

  preparePublicationInfo = element => {
    return [
      { name: 'Aricle ID', value: element.artid },
      { name: 'Journal title', value: element.journal_title },
      { name: 'Journal volume', value: element.journal_volume },
      { name: 'Journal issue', value: element.journal_issue },
      { name: 'Pages', value: element.pages },
      { name: 'Year', value: element.year },
      { name: 'Note', value: element.note },
    ];
  };

  renderConferenceInfo = () => {
    const {
      document: {
        metadata: { conference_info },
      },
    } = this.props;
    let rows = [];
    for (const [key, val] of Object.entries(conference_info)) {
      if (Array.isArray(val)) {
        const arrayVals = (
          <List>
            {val.map((entry, idx) => (
              <List.Item key={idx}>
                <List.Content>
                  <List.Header>{entry.scheme}</List.Header>
                  <List.Description>{entry.value}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        );
        rows.push({ name: capitalize(key), value: arrayVals });
      } else {
        rows.push({ name: capitalize(key), value: val });
      }
    }
    return rows;
  };

  render() {
    const { document } = this.props;

    if (
      !_isEmpty(document.metadata.imprint) ||
      !_isEmpty(document.metadata.conference_info) ||
      !_isEmpty(document.metadata.publication_info)
    ) {
      return (
        <>
          {document.metadata.imprint && (
            <>
              <Header as="h3">Imprint</Header>
              <MetadataTable rows={this.prepareImprintInfo()} />
            </>
          )}

          {document.metadata.imprint && document.metadata.publication_info && (
            <Divider />
          )}

          {document.metadata.publication_info && (
            <>
              <Header as="h3">Publication info</Header>
              {document.metadata.publication_info.map(element => (
                // eslint-disable-next-line react/jsx-key
                <MetadataTable rows={this.preparePublicationInfo(element)} />
              ))}
            </>
          )}

          {(document.metadata.imprint || document.metadata.publication_info) &&
            document.metadata.conference_info && <Divider />}

          {document.metadata.conference_info && (
            <>
              <Header>Conference info</Header>
              <MetadataTable rows={this.renderConferenceInfo()} />
            </>
          )}
        </>
      );
    }
    return (
      <InfoMessage
        header="No stored publishing info."
        content="Edit document to add publishing info"
      />
    );
  }
}

DocumentPublishing.propTypes = {
  document: PropTypes.object.isRequired,
};
