import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const args = {
  number: 17,
  msg: 'Message',
  defaultMsg: 'Oops!',
};

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const data = await resolveValue(args.number);
    expect(data).toBe(args.number);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(args.msg)).toThrow(args.msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow(args.defaultMsg);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
