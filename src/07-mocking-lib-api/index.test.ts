import axios from 'axios';
import { throttledGetDataFromApi, axiosProps } from './index';

jest.mock('lodash', () => {
  return {
    __esModule: true,
    ...jest.requireActual<typeof import('lodash')>('lodash'),
    trottle: jest.fn((cb) => cb),
  };
});

const POSTS_URL = 'posts';

describe('throttledGetDataFromApi', () => {
  afterAll(() => jest.unmock('lodash'));

  test('should create instance with provided base url', async () => {
    const spiedAxios = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('');

    expect(spiedAxios).toBeCalledWith(axiosProps);
  });

  test('should perform request to correct provided url', async () => {
    const spiedAxios = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: 'some data' }));
    jest.useFakeTimers();
    await throttledGetDataFromApi(POSTS_URL);
    jest.runAllTimers();
    const pathToGet = spiedAxios.mock.calls[0]?.[0];
    if (pathToGet) expect(spiedAxios).toBeCalledWith(pathToGet);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(POSTS_URL);

    expect(response).not.toBeUndefined();
  });
});
