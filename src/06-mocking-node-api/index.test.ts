import fs from 'fs';
import fsPs from 'fs/promises';
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const cb = jest.fn();

describe('doStuffByTimeout', () => {
  beforeEach(() => jest.spyOn(global, 'setTimeout'));

  beforeAll(() => jest.useFakeTimers());

  afterAll(() => jest.useRealTimers());

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(cb, 1000);

    expect(setTimeout).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(cb, 1000);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(cb, 1000);

    expect(cb).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(cb).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => jest.spyOn(global, 'setInterval'));

  beforeAll(() => jest.useFakeTimers());

  afterAll(() => jest.useRealTimers());

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(cb, 1000);

    expect(setInterval).toHaveBeenCalled();
    expect(setInterval).toHaveBeenLastCalledWith(cb, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByTimeout(cb, 1000);

    expect(cb).not.toBeCalled();

    for (let i = 1; i <= 10; i++) {
      jest.advanceTimersByTime(1000);
      expect(cb).toBeCalledTimes(i);
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously('a.txt');
    expect(spy).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    const data = await readFileAsynchronously('a.txt');
    expect(data).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fsPs, 'readFile').mockResolvedValueOnce('data');

    const data = await readFileAsynchronously('a.txt');
    expect(data).toBe('data');
  });
});
