import z from 'zod';
import { Gender, NewPatient } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

const NewBaseEntrySchema = z
  .object({
    date: z.string().date(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
  })
  .strict();

const NewOccupationalHealthcareEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

const NewHospitalEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({ date: z.string(), criteria: z.string() }),
});

const NewHealthCheckEntrySchema = NewBaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number().int().min(0).max(3),
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema,
  NewHealthCheckEntrySchema,
]);
