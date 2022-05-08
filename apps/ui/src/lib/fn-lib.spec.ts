import { noop, callAll } from './fn-lib';

test('noop', () => {
  noop();
  expect(typeof noop).toBe('function');
});

test('callAll', () => {
  const fn1 = jest.fn();
  const fn2 = jest.fn();
  const returnedFn = callAll(fn1, undefined, fn2);

  returnedFn('Hello');

  expect(fn1).toHaveBeenCalledTimes(1);
  expect(fn1).toHaveBeenLastCalledWith('Hello');
  expect(fn2).toHaveBeenCalledTimes(1);
  expect(fn2).toHaveBeenLastCalledWith('Hello');
});
