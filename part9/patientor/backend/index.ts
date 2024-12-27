import cors from 'cors';
import express, { Response } from 'express';
import diagnosisService from './src/services/diagnosisService';
import patientService from './src/services/patientService';
import { Diagnosis, NonSensitivePatient } from './src/types';
import { toNewPatient } from './src/utils';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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

app.post('/api/patients', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let message = 'something went wrong';
    if (error instanceof Error) {
      message += `: ${error.message}`;
    }
    res.status(500).send({ error: message });
  }
});

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
