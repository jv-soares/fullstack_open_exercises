import { Chip } from '@mui/material';
import { Entry } from '../../types';
import { assertNever } from '../../utils';

const EntryTypeChip = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'OccupationalHealthcare':
      return <Chip label="Occupational Health" />;
    case 'Hospital':
      return <Chip label="Hospital" />;
    case 'HealthCheck':
      return <Chip label="Health Check" />;
    default:
      return assertNever(entry);
  }
};

export default EntryTypeChip;
