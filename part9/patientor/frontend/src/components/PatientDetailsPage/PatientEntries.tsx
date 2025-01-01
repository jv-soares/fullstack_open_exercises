import { Stack } from '@mui/material';
import { Entry } from '../../types';
import EntryDetailsCard from './EntryDetailsCard';

const PatientEntries = ({ entries }: { entries: Entry[] }) => {
  return (
    <div>
      <h3>Entries</h3>
      <Stack spacing={1}>
        {entries.map((entry) => (
          <EntryDetailsCard key={entry.id} entry={entry} />
        ))}
      </Stack>
    </div>
  );
};

export default PatientEntries;
