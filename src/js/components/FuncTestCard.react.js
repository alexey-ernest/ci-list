/**
 * Func Tests card component.
 */

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



export default class FuncTestCard extends Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    styles: PropTypes.object
  };

  render() {
    const job = this.props.job;
    if (!job.functests) {
      return null;
    }

    const testPassRate = (job.functests.passed / job.functests.total * 100).toFixed(1);
    const styles = this.props.styles || {};

    return (
      <Card className={styles['item-card']}>
        <CardMedia>
          <img
            src="images/ftests.png"
            onClick={this._onClick}
            className={styles['item-media']}
          />
        </CardMedia>
        <CardTitle
          title="FuncTests"
          style={cardTitleStyles}
          titleStyle={cardTitleTitleStyles}
        />
        <CardText style={cardTextStyles}>
          Pass rate: {testPassRate}%, <br/>
          Coverage: {job.functests.coverage}%
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
