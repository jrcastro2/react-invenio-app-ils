import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class MetadataTable extends Component {
  renderRows() {
    const { labelWidth, rows } = this.props;
    console.log(rows);
    return rows.map(row => (
      <Table.Row key={row.name}>
        <Table.Cell width={labelWidth}>{row.name}</Table.Cell>
        <Table.Cell>
          {typeof row.value == 'boolean'
            ? row.value
              ? 'Yes'
              : 'No'
            : row.value}
        </Table.Cell>
      </Table.Row>
    ));
  }

  render() {
    return (
      <Table definition>
        <Table.Body>{this.renderRows()}</Table.Body>
      </Table>
    );
  }
}

MetadataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  labelWidth: PropTypes.number,
};

MetadataTable.defaultProps = {
  labelWidth: 4,
};
