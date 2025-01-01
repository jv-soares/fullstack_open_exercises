import { HospitalEntry } from '../../types';
import DiagnosesList from './DiagnosesList';

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <p>
        {entry.date}: {entry.description}
      </p>
      <p>
        Discharge: on {entry.discharge.date} criteria {entry.discharge.criteria}
      </p>
      <p>Diagnose by {entry.specialist}</p>
      {entry.diagnosisCodes && <DiagnosesList codes={entry.diagnosisCodes} />}
    </div>
  );
};

export default HospitalEntryDetails;
