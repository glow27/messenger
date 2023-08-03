import { expect } from 'chai';
import { set } from './helpers.ts';

describe('set function', () => {
  it('Should return object argument if passed object is not an real object', () => {
    const notAnObject = null;

    expect(set(notAnObject, '', '1')).to.equal(notAnObject);
  });

  it('Should set value by path', () => {
    const obj = { a: 123, b: { a: 345 }};
    const path = 'b.a';
    const value = 123;

    const result = set(obj, path, value);

    expect(result).to.have.nested.property(path).that.equals(value);
  });

  it('Should mutate original object', () => {
    const obj = { a: 123, b: { a: 345 }};
    const path = 'b.a';
    const value = 123;

    const result = set(obj, path, value);

    expect(result).to.equal(obj);
  });
});
