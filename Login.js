import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://tramites.goes.sigenesishost.com/';
const USUARIO = 'test';
const CONTRASEÑA = 'test';

export default () => {
  const loginRes = http.post(`${BASE_URL}`, {
    usuario: USUARIO,
    constraseña: CONTRASEÑA,
  });

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('token') !== '',
  });


  sleep(1);
};
