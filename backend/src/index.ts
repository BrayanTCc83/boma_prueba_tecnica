import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const expressApp = express();

expressApp.use(cors({
  origin: process.env.SITE,
  methods: ['GET', 'POST', 'PATCH']
}));

expressApp.use(bodyParser.json({}));

expressApp.get('/', (_, res) => {
  res.send({
    message: 'Inicializando proyecto backend.'
  });
});

expressApp.listen(process.env.PORT, () => {
  console.log(`[Server] Listen on port ${process.env.PORT}`);
});

export default expressApp;