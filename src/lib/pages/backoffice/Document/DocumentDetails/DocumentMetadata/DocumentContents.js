import DocumentToc from '@modules/Document/DocumentToc';
import { DocumentSubjects } from './DocumentSubjects';
import { DocumentKeywords } from './DocumentKeywords';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Header } from 'semantic-ui-react';
import _isEmpty from 'lodash/isEmpty';
import { ShowMoreContent } from '@components/ShowMoreContent';
import DocumentTags from '@modules/Document/DocumentTags';
import { InfoMessage } from '@components/backoffice/InfoMessage';

export class DocumentContents extends Component {
  render() {
    const { document } = this.props;
    if (
      document.metadata.abstract ||
      document.metadata.table_of_content ||
      document.metadata.subjects ||
      document.metadata.tags
    ) {
      return (
        <>
          {!_isEmpty(document.metadata.abstract) && (
            <>
              <Header as="h3">Abstract</Header>
              <ShowMoreContent
                content={document.metadata.abstract}
                lines={10}
              />
            </>
          )}

          {!_isEmpty(document.metadata.table_of_content) && (
            <>
              <Divider />
              <Header as="h3">Table of content</Header>
              <DocumentToc document={document} />
            </>
          )}

          {!_isEmpty(document.metadata.subjects) && (
            <>
              <Divider />
              <Header as="h3">Subjects</Header>
              <DocumentSubjects document={document} />
            </>
          )}

          {!_isEmpty(document.metadata.tags) && (
            <>
              <Divider />
              <Header as="h3">Tags</Header>
              <DocumentTags
                isBackOffice
                size="mini"
                metadata={document.metadata}
              />
            </>
          )}

          {!_isEmpty(document.metadata.keywords) && (
            <>
              <Divider />
              <Header as="h3">Keywords</Header>
              <DocumentKeywords document={document} />
            </>
          )}
        </>
      );
    } else {
      return (
        <InfoMessage
          header="No stored content information."
          content="Edit document to add content information"
        />
      );
    }
  }
}

DocumentContents.propTypes = {
  document: PropTypes.object.isRequired,
};
