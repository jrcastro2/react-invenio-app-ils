import { FrontSiteRoutes } from '@routes/urls';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Segment,
  Container,
  Loader as UILoader,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react';
import { Loader } from '@components';
import { parseParams } from '../../utils';

const Confirmed = ({ isConfirmed }) => {
  return isConfirmed ? (
    <Message icon positive size="big">
      <Icon name="check" />

      <Message.Content>
        <Message.Header>Your are all set!</Message.Header>
        Your email has been confirmed. Go back to the{' '}
        <Link className="alternative" to={FrontSiteRoutes.home}>
          home page
        </Link>{' '}
        to browse the library catalogue
      </Message.Content>
    </Message>
  ) : (
    <Message icon negative size="big">
      <Icon name="warning" />

      <Message.Content>
        <Message.Header>Oh snap!</Message.Header>
        Your e-mail could <strong>not</strong> be confirmed. Please contact the
        library.
      </Message.Content>
    </Message>
  );
};

export default class ConfirmEmail extends Component {
  componentDidMount() {
    const { confirmUser } = this.props;
    const params = parseParams(window.location.search);
    confirmUser(params.token);
  }

  render() {
    const { isConfirmed, isConfirmedLoading, backgroundImage } = this.props;
    return (
      <div className="frontsite">
        <Container
          fluid
          className="auth-page blur"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : null,
          }}
        >
          <Container padded>
            <Segment
              className="background-transparent pb-default pt-default"
              color="orange"
            >
              <Header as="h1">E-mail confirmation</Header>
              <Loader
                isLoading={isConfirmedLoading}
                renderElement={() => (
                  <UILoader active indeterminate size="large" inline="centered">
                    Waiting for e-mail confirmation...
                  </UILoader>
                )}
              >
                <Confirmed isConfirmed={isConfirmed} />
              </Loader>
            </Segment>
          </Container>
        </Container>
      </div>
    );
  }
}

ConfirmEmail.propTypes = {
  backgroundImage: PropTypes.string,
  /* Redux */
  isConfirmed: PropTypes.bool.isRequired,
  isConfirmedLoading: PropTypes.bool.isRequired,
  confirmUser: PropTypes.func.isRequired,
};

ConfirmEmail.defaultProps = {
  backgroundImage: null,
};