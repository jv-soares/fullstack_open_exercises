import { Entry } from '../../types';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';

const PatientEntries = ({ entries }: { entries: Entry[] }) => {
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
              />
            );
          case 'Hospital':
            return <HospitalEntryDetails key={entry.id} entry={entry} />;
          case 'HealthCheck':
            return <HealthCheckEntryDetails key={entry.id} entry={entry} />;
          default:
            return assertNever(entry);
        }
      })}
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default PatientEntries;
