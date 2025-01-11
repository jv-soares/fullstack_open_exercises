export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: { date: string; criteria: string };
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | OccupationalHealthcareEntry
  | HospitalEntry
  | HealthCheckEntry;

export type DiagnosisCodes = Array<Diagnosis['code']>;

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

export type EntryFormValues = UnionOmit<Entry, 'id'>;

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export interface EntryFormFieldsProps {
  onSubmit: (entry: EntryFormValues) => void;
  onCancel: () => void;
}
