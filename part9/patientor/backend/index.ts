import cors from 'cors';
import express, { Response } from 'express';
import diagnosisService from './src/services/diagnosisService';
import { Diagnosis } from './src/types';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = diagnosisService.getAll();
  res.json(diagnoses);
});

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
