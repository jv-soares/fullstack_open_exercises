import { HealthCheck } from '../../types';
import DiagnosesList from './DiagnosesList';

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheck }) => {
  return (
    <div>
      <p>
        {entry.date}: {entry.description}
      </p>
      <p>Health check rating: {entry.healthCheckRating}</p>
      <p>Diagnose by {entry.specialist}</p>
      {entry.diagnosisCodes && <DiagnosesList codes={entry.diagnosisCodes} />}
    </div>
  );
};

export default HealthCheckEntryDetails;
