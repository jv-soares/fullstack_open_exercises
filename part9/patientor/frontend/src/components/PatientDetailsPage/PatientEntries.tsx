import { Add } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import { Entry } from '../../types';
import AddEntryForm from './AddEntryForm';
import EntryDetailsCard from './EntryDetailsCard';

interface PatientEntriesProps {
  entries: Entry[];
  onEntryAdded: (entry: Entry) => void;
}

const PatientEntries = ({ entries, onEntryAdded }: PatientEntriesProps) => {
  const [isAddingEntry, setIsAddingEntry] = useState(false);

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h3>Entries</h3>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setIsAddingEntry(true)}
        >
          Add entry
        </Button>
      </Stack>
      {isAddingEntry && (
        <AddEntryForm
          onAdded={onEntryAdded}
          onCancel={() => setIsAddingEntry(false)}
        />
      )}
      <Stack spacing={1}>
        {entries.map((entry) => (
          <EntryDetailsCard key={entry.id} entry={entry} />
        ))}
      </Stack>
    </div>
  );
};

export default PatientEntries;
