import 'reflect-metadata';

import express, { json } from 'express';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('BackEnd Started!');
});
