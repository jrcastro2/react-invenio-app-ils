import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import LocationOpeningHours from './LocationOpeningHours';

class OpeningHours extends Component {
  constructor(props) {
    super(props);
    this.fetchAllLocations = props.fetchAllLocations;
  }

  componentDidMount() {
    this.fetchAllLocations();
  }

  renderItems = () => {
    const {
      data: { hits },
    } = this.props;
    return hits.map(location => (
      <LocationOpeningHours key={location.pid} location={location} />
    ));
  };

  render() {
    const { error, isLoading } = this.props;
    return (
      <Container className="spaced">
        <Header as="h2">Opening hours</Header>
        <Loader isLoading={isLoading}>
          <Error error={error}>{this.renderItems()}</Error>
        </Loader>
      </Container>
    );
  }
}

OpeningHours.propTypes = {
  /* Redux */
  data: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchAllLocations: PropTypes.func.isRequired,
};

export default Overridable.component('OpeningHours', OpeningHours);
