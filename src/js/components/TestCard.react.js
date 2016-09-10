/**
 * Tests card component.
 */

// CSS
import styles from '../../sass/modules/list-item-card.sass';

// React
import React, {Component, PropTypes} from 'react';

// Material UI
import {Card, CardActions, CardHeader, CardText, CardMedia, CardTitle} from 'material-ui/Card';


const cardTitleStyles = {
  paddingBottom: 0
};

const cardTitleTitleStyles = {
  fontSize: 16,
  fontWeight: 400
};

const cardTextStyles = {
  paddingTop: 6,
  lineHeight: 1.5
};



export default class TestCard extends Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    onClick: PropTypes.func
  };

  render() {
    const job = this.props.job;
    if (!job.tests) {
      return null;
    }

    var testPassRate = (job.tests.passed / job.tests.total * 100).toFixed(1);

    return (
      <Card className={styles['item-card']}>
        <CardMedia>
          <img
            src="images/crash.png"
            onClick={this._onClick}
            className={styles['item-media']}
          />
        </CardMedia>
        <CardTitle
          title="Tests"
          style={cardTitleStyles}
          titleStyle={cardTitleTitleStyles}
        />
        <CardText style={cardTextStyles}>
          Pass rate: {testPassRate}%,
          Coverage: {job.tests.coverage}%
        </CardText>
      </Card>
    );
  }

  _onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

};
