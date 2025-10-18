import http from 'node:http';
import { handleRequest } from './router.js';

const PORT = Number(process.env.API_PORT ?? process.env.PORT ?? 4000);
const HOST = process.env.API_HOST ?? '0.0.0.0';

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`API server listening on http://${HOST}:${PORT}`);
});
