import { v1 as uuid } from 'uuid';
import data from '../../data/patients';

import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getAll = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = data.find((e) => e.id === id);
  if (!patient) return;
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient, entries: [] };
  return newPatient;
};

export default { getAll, findById, addPatient };
