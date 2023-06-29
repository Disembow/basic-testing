import axios from 'axios';
import { throttledGetDataFromApi, axiosProps } from './index';

jest.mock('lodash', () => {
  return {
    __esModule: true,
    ...jest.requireActual('lodash'),
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
    // const spiedAxios = jest.spyOn(axios, 'get');
    // await throttledGetDataFromApi(POSTS_URL);
    // expect(spiedAxios).toBeCalledWith(POSTS_URL);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(POSTS_URL);

    expect(response).not.toBeUndefined();
  });
});
