
import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('react-dom');

jest.mock('material-ui/CircularProgress', () => {
  return () => {
    return (
      <p>CircularProgress</p>
    );
  }
});

jest.mock('../../actions/JobActionCreators', () => {
  return {
    requestJobBuild: jest.fn()
  };
});

jest.mock('../../../sass/modules/build-details.sass', () => {
  return {};
});


import ThemeWrapper from '../../ThemeWrapper';
import BuildDetails from '../BuildDetails.react';


describe('BuildDetails component', () => {

  it('should render correctly when there is no build data', () => {
    const component = renderer.create(
      <ThemeWrapper>
        <BuildDetails job={{}} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should request data for the job', () => {
    const actionCreators = require('../../actions/JobActionCreators');
    const spy = jest.fn();
    actionCreators.requestJobBuild = spy;

    const job = {
      id: 5
    };

    const component = renderer.create(
      <ThemeWrapper>
        <BuildDetails job={job} />
      </ThemeWrapper>
    );

    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toBe(job.id);
  });

  it('should render build details when build property specified', () => {
    const build = {
      type: 'DEBUG',
      version: '1.0.2',
      package: {
        uri: 'goo.gl/packagelink',
        size: 1024 * 1024 * 5
      }
    };
    const component = renderer.create(
      <ThemeWrapper>
        <BuildDetails job={{}} build={build} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
