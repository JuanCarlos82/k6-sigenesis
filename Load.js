import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '3m', target: 10 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '6m', target: 10 }, // stay at 100 users for 10 minutes
    { duration: '3m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    //'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://tramites.goes.sigenesishost.com/';
const USERNAME = 'test';
const PASSWORD = 'test';

export default () => {
  const loginRes = http.post(`${BASE_URL}`, {
    username: USERNAME,
    password: PASSWORD,
  });

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('token') !== '',
  });


  const myObjects = http.get(`${BASE_URL}#tramites`);
  check(myObjects, { 
    'Verificando Tramites': (resp) => resp.status ==  200
  });

  sleep(1);
};
