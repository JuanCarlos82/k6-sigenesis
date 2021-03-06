import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

const BASE_URL = 'https://tramites.goes.sigenesishost.com/';
const USERNAME = 'test';
const PASSWORD = 'test';

export default function () {
    const loginRes = http.post(`${BASE_URL}`, {
        username: USERNAME,
        password: PASSWORD,
      });

      check(loginRes, {
        'logged in successfully': (resp) => resp.json('token') !== '',
      });

  const responses = http.batch([
    ['GET', `${BASE_URL}#tramites`, null, { tags: { name: 'tramites' } }],
    ['GET', `${BASE_URL}#usuarios/`, null, { tags: { name: 'usuarios' } }],
  ]);

  sleep(1);
}