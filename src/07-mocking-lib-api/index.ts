import axios from 'axios';
import { throttle } from 'lodash';

export const THROTTLE_TIME = 5000;

export const axiosProps = {
  baseURL: 'https://jsonplaceholder.typicode.com',
};

const getDataFromApi = async (relativePath: string) => {
  const axiosClient = axios.create(axiosProps);
  const response = await axiosClient.get(relativePath);
  return response.data;
};

export const throttledGetDataFromApi = throttle(getDataFromApi, THROTTLE_TIME);
