import { Gender, NewPatient } from './types';

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw Error('incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
  }
  throw Error('incorrect or missing fields');
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw Error(`incorrect name ${name}`);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw Error(`incorrect date of birth ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw Error(`incorrect ssn ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw Error(`incorrect gender ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw Error(`incorrect occupation ${occupation}`);
  }
  return occupation;
};

const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

const isDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
    .map((e) => e.toString())
    .includes(value);
};
