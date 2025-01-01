import { Box, Chip, Stack } from '@mui/material';
import { Entry } from '../../types';
import { assertNever } from '../../utils';
import EntryTypeChip from './EntryTypeChip';
import HealthCheckEntryContent from './HealthCheckEntryContent';
import HospitalEntryContent from './HospitalEntryContent';
import OccupationalHealthcareEntryContent from './OccupationalHealthcareEntryContent';

const EntryDetailsCard = ({ entry }: { entry: Entry }) => {
  const buildContent = () => {
    switch (entry.type) {
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryContent entry={entry} />;
      case 'Hospital':
        return <HospitalEntryContent entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckEntryContent entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <Box sx={{ border: 1, paddingX: 3, paddingY: 1 }}>
      <Stack direction="row" spacing={1}>
        <EntryTypeChip entry={entry} />
        <Chip label={entry.date} />
      </Stack>
      {buildContent()}
    </Box>
  );
};

export default EntryDetailsCard;
