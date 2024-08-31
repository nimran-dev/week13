import jsonServer from 'json-server';
import { Request, Response, NextFunction } from 'express';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
