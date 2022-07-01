import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
};

const API_BASE_URL = 'https://tramites.goes.sigenesishost.com/';
const USERNAME = 'test';
const PASSWORD = 'test';

export default function () {

    const loginRes = http.post(`${API_BASE_URL}`, {
        username: USERNAME,
        password: PASSWORD,
      });

      check(loginRes, {
        'logged in successfully': (resp) => resp.json('token') !== '',
      });

  http.batch([
    ['GET', `${API_BASE_URL}#tramites`],
    ['GET', `${API_BASE_URL}#usuarios`],
  ]);

  sleep(1);
}
