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

const findById = (id: string): NonSensitivePatient | undefined => {
  const patient = data.find((e) => e.id === id);
  if (!patient) return;
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient, entries: [] };
  return newPatient;
};

export default { getAll, findById, addPatient };
