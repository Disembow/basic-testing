import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 423, b: 243, action: Action.Add, expected: 666 },
  { a: 789, b: 123, action: Action.Subtract, expected: 666 },
  { a: 6, b: 111, action: Action.Multiply, expected: 666 },
  { a: 1332, b: 2, action: Action.Divide, expected: 666 },
  { a: 5, b: 5, action: Action.Exponentiate, expected: 3125 },
  { a: 423, b: 243, action: Action, expected: null },
  { a: '423', b: '243', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should test all cases from simple tests',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
