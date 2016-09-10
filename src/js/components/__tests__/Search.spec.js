
import React from 'react';
import renderer from 'react-test-renderer';

import ThemeWrapper from '../../ThemeWrapper';
import Search from '../Search.react';


jest.mock('react-dom');

describe('Search component', () => {

  it('should render correctly', () => {
    const component = renderer.create(
      <ThemeWrapper>
        <Search />
      </ThemeWrapper>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should update value by onChange event', () => {
    const component = renderer.create(
      <ThemeWrapper>
        <Search />
      </ThemeWrapper>
    );

    let tree = component.toJSON();

    // manually trigger the callback
    tree.children[0].children[0].children[0].children[1].props.onChange({
      target: {
        value: 'a'
      }
    });

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onSubmit handler if <Enter> key pressed', () => {
    let onSubmit = jasmine.createSpy();

    const component = renderer.create(
      <ThemeWrapper>
        <Search onSubmit={onSubmit} />
      </ThemeWrapper>
    );

    let tree = component.toJSON();

    // type some text
    tree.children[0].children[0].children[0].children[1].props.onChange({
      target: {
        value: 'alex'
      }
    });

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // type space
    tree.children[0].children[0].children[0].children[1].props.onKeyDown({
      keyCode: 32
    });

    // type enter
    tree.children[0].children[0].children[0].children[1].props.onKeyDown({
      keyCode: 13
    });

    expect(onSubmit.calls.count()).toBe(1);
    expect(onSubmit.calls.argsFor(0)[0]).toBe('alex');
  });
});
