import { HospitalEntry } from '../../types';
import DiagnosesList from './DiagnosesList';

const HospitalEntryContent = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && <DiagnosesList codes={entry.diagnosisCodes} />}
      <p>
        Discharged on {entry.discharge.date} due to "{entry.discharge.criteria}"
      </p>
      <p>Diagnose by {entry.specialist}</p>
    </>
  );
};

export default HospitalEntryContent;
