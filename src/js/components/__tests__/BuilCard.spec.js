
import React from 'react';
import renderer from 'react-test-renderer';

import ThemeWrapper from '../../ThemeWrapper';
import BuildCard from '../BuildCard.react';


jest.mock('react-dom');

describe('BuildCard component', () => {

  it('should render correctly', () => {
    const data = {
      id: 'abcd',
      build: {
        type: 'DEBUG',
        version: '1.0.1'
      }
    };

    const component = renderer.create(
      <ThemeWrapper>
        <BuildCard job={data} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onClick handler when clicking on image', () => {
    const onClick = jasmine.createSpy();
    const data = {
      id: 'abcd',
      build: {
        type: 'DEBUG',
        version: '1.0.1'
      }
    };

    const component = renderer.create(
      <ThemeWrapper>
        <BuildCard job={data} onClick={onClick} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();

    // click on image
    tree.children[0].children[0].children[0].children[0].props.onClick();

    expect(onClick.calls.count()).toBe(1);
  });
});
