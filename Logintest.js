import { check, sleep } from 'k6'
import http from 'k6/http'

export const options = {
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 10, duration: '1m' },
        { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  response = http.post(
    'https://tramites.goes.sigenesishost.com/',
    '{\r\n  "usuario": "test",\r\n  "password": "test"\r\n}\r\n',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, 
    }
  )
  check(response, { 'status was 200': (r) => r.status == 200 });
  sleep(1)
}