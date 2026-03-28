import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNjg0MzUzMzUzMjlkYTY3MTc3Nzk2MDA5MTYxYjA2ZCIsIm5iZiI6MTc3NDU3MzA2Ni4wNzIsInN1YiI6IjY5YzVkNjBhMTE2NWUzYTIwNzRkYzdhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MCuaYoqCNoSGnPrsl5zbMFUhNI0FipPp0KT6zmEENcs',
  },
});
