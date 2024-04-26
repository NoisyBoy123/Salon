import axios from 'axios';

export const HttpService = axios.create({
  baseURL: 'https://fiire01-001-site1.htempurl.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
