/**
 * Build card component.
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



export default class BuildCard extends Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    styles: PropTypes.object
  };

  render() {
    const job = this.props.job;
    if (!job.build) {
      return null;
    }

    const styles = this.props.styles || {};

    return (
      <Card className={styles['item-card']}>
        <CardMedia>
          <img
            src="images/release.png"
            onClick={this._onClick}
            className={styles['item-media']}
          />
        </CardMedia>
        <CardTitle
          title="Build"
          style={cardTitleStyles}
          titleStyle={cardTitleTitleStyles}
        />
        <CardText style={cardTextStyles}>
          {job.build.type} v{job.build.version}
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
