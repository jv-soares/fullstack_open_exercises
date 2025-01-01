import {
  Diagnosis,
  Entry,
  HealthCheck,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';

interface PatientEntriesProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const PatientEntries = ({ entries, diagnoses }: PatientEntriesProps) => {
  return (
    <div>
      <h3>Entries</h3>
      {entries.map((entry) => {
        switch (entry.type) {
          case 'OccupationalHealthcare':
            return (
              <OccupationalHealthcareEntryDetails
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          case 'Hospital':
            return (
              <HospitalEntryDetails
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          case 'HealthCheck':
            return (
              <HealthCheckEntryDetails
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          default:
            return assertNever(entry);
        }
      })}
    </div>
  );
};

const OccupationalHealthcareEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div key={entry.id}>
      <p>
        {entry.date}: {entry.description}
      </p>
      <p>Employer name: {entry.employerName}</p>
      <p>Diagnose by {entry.specialist}</p>
      {entry.sickLeave && (
        <p>
          Sick leave: from {entry.sickLeave.startDate} to{' '}
          {entry.sickLeave.endDate}
        </p>
      )}
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes
            .map((code) => diagnoses.find((e) => e.code === code))
            .filter((diagnosis) => diagnosis !== undefined)
            .map((diagnosis) => (
              <li key={diagnosis.code}>
                {diagnosis.code}: {diagnosis.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

const HospitalEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div key={entry.id}>
      <p>
        {entry.date}: {entry.description}
      </p>
      <p>
        Discharge: on {entry.discharge.date} criteria {entry.discharge.criteria}
      </p>
      <p>Diagnose by {entry.specialist}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes
            .map((code) => diagnoses.find((e) => e.code === code))
            .filter((diagnosis) => diagnosis !== undefined)
            .map((diagnosis) => (
              <li key={diagnosis.code}>
                {diagnosis.code}: {diagnosis.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

const HealthCheckEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheck;
  diagnoses: Diagnosis[];
}) => {
  return (
    <div key={entry.id}>
      <p>
        {entry.date}: {entry.description}
      </p>
      <p>Health check rating: {entry.healthCheckRating}</p>
      <p>Diagnose by {entry.specialist}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes
            .map((code) => diagnoses.find((e) => e.code === code))
            .filter((diagnosis) => diagnosis !== undefined)
            .map((diagnosis) => (
              <li key={diagnosis.code}>
                {diagnosis.code}: {diagnosis.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default PatientEntries;
