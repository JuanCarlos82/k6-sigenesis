import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://tramites.goes.sigenesishost.com';

const SLEEP_DURATION = 0.1;

const authParams = {
    headers: {
        'Accept': 'text/plain'
    },
};