import { HealthCheck } from '../../types';
import DiagnosesList from './DiagnosesList';

const HealthCheckEntryContent = ({ entry }: { entry: HealthCheck }) => {
  return (
    <>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && <DiagnosesList codes={entry.diagnosisCodes} />}
      <p>Health check rating: {entry.healthCheckRating}</p>
      <p>Diagnose by {entry.specialist}</p>
    </>
  );
};

export default HealthCheckEntryContent;
