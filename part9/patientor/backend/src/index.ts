import cors from 'cors';
import express, { Request, Response } from 'express';
import { errorHandler, newPatientValidator } from './middlewares';
import diagnosisService from './services/diagnosisService';
import patientService from './services/patientService';
import { Diagnosis, NewPatient, NonSensitivePatient } from './types';

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

app.post(
  '/api/patients',
  newPatientValidator,
  (req: Request<unknown, unknown, NewPatient>, res: Response) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
