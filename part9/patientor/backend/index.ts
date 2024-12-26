import cors from 'cors';
import express, { Response } from 'express';
import diagnosisService from './src/services/diagnosisService';
import patientService from './src/services/patientService';
import { Diagnosis, NonSensitivePatient } from './src/types';

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

app.get('/api/patients', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getAll();
  res.json(patients);
});

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
