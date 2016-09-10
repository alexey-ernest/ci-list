
import React from 'react';
import renderer from 'react-test-renderer';

import ThemeWrapper from '../../ThemeWrapper';
import MetricsCard from '../MetricsCard.react';


jest.mock('react-dom');

describe('MetricsCard component', () => {

  const data = {
    id: 'abcd',
    metrics: {
      test: 63,
      maintainability: 51,
      security: 32,
      workmanship: 45
    }
  };

  it('should not render without job.metrics provided', () => {
    const component = renderer.create(
      <ThemeWrapper>
        <MetricsCard job={{}} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly', () => {

    const component = renderer.create(
      <ThemeWrapper>
        <MetricsCard job={data} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onClick handler when clicking on image', () => {
    const onClick = jasmine.createSpy();

    const component = renderer.create(
      <ThemeWrapper>
        <MetricsCard job={data} onClick={onClick} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();

    // click on image
    tree.children[0].children[0].children[0].children[0].props.onClick();

    expect(onClick.calls.count()).toBe(1);
  });
});
