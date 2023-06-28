// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 423, b: 243, action: Action.Add })).toBe(666);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 789, b: 123, action: Action.Subtract })).toBe(
      666,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 111, action: Action.Multiply })).toBe(
      666,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 1332, b: 2, action: Action.Divide })).toBe(
      666,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Exponentiate })).toBe(
      3125,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '423', b: '243', action: Action.Add })).toBe(
      null,
    );
  });
});
