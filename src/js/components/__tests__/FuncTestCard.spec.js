
import React from 'react';
import renderer from 'react-test-renderer';

import ThemeWrapper from '../../ThemeWrapper';
import FuncTestCard from '../FuncTestCard.react';


jest.mock('react-dom');

describe('FuncTestCard component', () => {

  const data = {
    id: 'abcd',
    functests: {
      total: 50,
      passed: 33,
      failed: 17,
      coverage: 12.8
    }
  };

  it('should render correctly', () => {
    const component = renderer.create(
      <ThemeWrapper>
        <FuncTestCard job={data} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onClick handler when clicking on image', () => {
    const onClick = jasmine.createSpy();

    const component = renderer.create(
      <ThemeWrapper>
        <FuncTestCard job={data} onClick={onClick} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();

    // click on image
    tree.children[0].children[0].children[0].children[0].props.onClick();

    expect(onClick.calls.count()).toBe(1);
  });
});
