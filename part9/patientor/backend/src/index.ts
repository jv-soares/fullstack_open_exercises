import cors from 'cors';
import express, { Request, Response } from 'express';
import {
  errorHandler,
  newEntryValidator,
  newPatientValidator,
} from './middlewares';
import diagnosisService from './services/diagnosisService';
import patientService from './services/patientService';
import { Diagnosis, NewEntry, NewPatient, NonSensitivePatient } from './types';

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

app.get('/api/patients/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ error: 'missing patient id' });
    return;
  }

  const patient = patientService.findById(id);
  if (!patient) {
    res.status(404).send({ error: 'patient not found' });
    return;
  }

  res.json(patient);
});

app.post(
  '/api/patients/:id/entries',
  newEntryValidator,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response) => {
    const patientId = req.params.id;
    if (!patientId) {
      res.status(400).send({ error: 'missing patient id' });
      return;
    }

    const patient = patientService.findById(patientId);
    if (!patient) {
      res.status(404).send({ error: 'patient not found' });
      return;
    }

    const addedEntry = patientService.addPatientEntry(patientId, req.body);
    res.send(addedEntry);
  }
);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
