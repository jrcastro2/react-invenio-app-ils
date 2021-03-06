import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import { Grid, Button, Icon } from 'semantic-ui-react';

class NotFound extends Component {
  render() {
    return (
      <Overridable id="NotFound.layout" {...this.props}>
        <div className="frontsite">
          <Grid
            container
            verticalAlign="middle"
            textAlign="center"
            className="not-found error-page"
          >
            <Grid.Column>
              <Icon name="compass outline" size="massive" />
              <h1>404</h1>
              <h2>Not all who wander are lost...</h2>
              <Link to="/">
                <Button icon labelPosition="left" primary>
                  <Icon name="home" />
                  Back to home
                </Button>
              </Link>
            </Grid.Column>
          </Grid>
        </div>
      </Overridable>
    );
  }
}

NotFound.propTypes = {};

export default Overridable.component('NotFound', NotFound);
