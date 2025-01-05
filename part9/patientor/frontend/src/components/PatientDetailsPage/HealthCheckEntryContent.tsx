import { Favorite } from '@mui/icons-material';
import { HealthCheckEntry, HealthCheckRating } from '../../types';
import DiagnosesList from './DiagnosesList';

const HealthCheckEntryContent = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <>
      <p>{entry.description}</p>
      {entry.diagnosisCodes && <DiagnosesList codes={entry.diagnosisCodes} />}
      <p>
        Rating: {<HealthCheckRatingIcon rating={entry.healthCheckRating} />}
      </p>
      <p>Diagnose by {entry.specialist}</p>
    </>
  );
};

const HealthCheckRatingIcon = ({
  rating,
}: {
  rating: HealthCheckEntry['healthCheckRating'];
}) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <Favorite style={{ color: 'green' }} />;
    case HealthCheckRating.LowRisk:
      return <Favorite style={{ color: 'yellow' }} />;
    case HealthCheckRating.HighRisk:
      return <Favorite style={{ color: 'orange' }} />;
    case HealthCheckRating.CriticalRisk:
      return <Favorite style={{ color: 'red' }} />;
  }
};

export default HealthCheckEntryContent;
