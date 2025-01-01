import { OccupationalHealthcareEntry } from '../../types';
import DiagnosesList from './DiagnosesList';

const OccupationalHealthcareEntryContent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && <DiagnosesList codes={entry.diagnosisCodes} />}
      <p>Employer name: {entry.employerName}</p>
      <p>Diagnose by {entry.specialist}</p>
      {entry.sickLeave && (
        <p>
          Sick leave: from {entry.sickLeave.startDate} to{' '}
          {entry.sickLeave.endDate}
        </p>
      )}
    </>
  );
};

export default OccupationalHealthcareEntryContent;
