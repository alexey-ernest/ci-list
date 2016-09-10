
import React from 'react';
import renderer from 'react-test-renderer';

import ThemeWrapper from '../../ThemeWrapper';
import TestCard from '../TestCard.react';


jest.mock('react-dom');

describe('TestCard component', () => {

  const data = {
    id: 'abcd',
    tests: {
      total: 150,
      passed: 102,
      failed: 48,
      coverage: 33.1
    }
  };

  it('should not render without job.tests provided', () => {
    const component = renderer.create(
      <ThemeWrapper>
        <TestCard job={{}} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const component = renderer.create(
      <ThemeWrapper>
        <TestCard job={data} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onClick handler when clicking on image', () => {
    const onClick = jasmine.createSpy();

    const component = renderer.create(
      <ThemeWrapper>
        <TestCard job={data} onClick={onClick} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();

    // click on image
    tree.children[0].children[0].children[0].children[0].props.onClick();

    expect(onClick.calls.count()).toBe(1);
  });
});
