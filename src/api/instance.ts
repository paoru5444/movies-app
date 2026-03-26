import axios from 'axios';

export const api = axios.create({
  baseURL: ' https://developers.themoviedb.org',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});
