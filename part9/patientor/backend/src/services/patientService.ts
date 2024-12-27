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

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), ...patient };
  return newPatient;
};

export default { getAll, addPatient };
