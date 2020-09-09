import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1s', target: 100 },
    { duration: '10s', target: 500 },
    { duration: '30s', target: 1000 }
  ],
};

export default function() {
  let id = Math.floor(Math.random() * 10000000) + 1;
  let res = http.get(`http://localhost:3001/rooms/${id}/photogallery`);
  sleep(1);
}