
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
    requestJobFuncTests: jest.fn()
  };
});

jest.mock('react-chartjs', () => {
  return {
    Line: () => {
      return (
        <div>Chartjs</div>
      );
    }
  }
});

import ThemeWrapper from '../../ThemeWrapper';
import FuncTestDetails from '../FuncTestDetails.react';


describe('FuncTestDetails component', () => {

  it('should render correctly when there is no tests data', () => {
    const component = renderer.create(
      <ThemeWrapper>
        <FuncTestDetails job={{}} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should request data for the job', () => {
    const actionCreators = require('../../actions/JobActionCreators');
    const spy = jest.fn();
    actionCreators.requestJobFuncTests = spy;

    const job = {
      id: 5
    };

    const component = renderer.create(
      <ThemeWrapper>
        <FuncTestDetails job={job} />
      </ThemeWrapper>
    );

    expect(spy.mock.calls.length).toBe(1);
    expect(spy.mock.calls[0][0]).toBe(job.id);
  });

  it('should render chart when tests property specified', () => {
    const tests = {
      datasets: [{
        data: [1, 2, 3]
      }]
    };
    const component = renderer.create(
      <ThemeWrapper>
        <FuncTestDetails job={{}} tests={tests} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
