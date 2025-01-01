import { OccupationalHealthcareEntry } from '../../types';
import DiagnosesList from './DiagnosesList';

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div>
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
      {entry.diagnosisCodes && <DiagnosesList codes={entry.diagnosisCodes} />}
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;
