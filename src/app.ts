import express from 'express';
import router from './routes';
import 'reflect-metadata';
import { appDataSource } from './config/dataSource';

const app = express();
app.use(express.json());
router(app);

appDataSource
  .initialize()
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch((erro) => {
    console.log(erro);
  });
export default app;
