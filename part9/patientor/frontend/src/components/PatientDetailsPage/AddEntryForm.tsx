import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { EntryFormValues } from '../../types';

interface AddEntryFormProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: AddEntryFormProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');

  const submitForm = () => {
    const entry: EntryFormValues = {
      type: 'HealthCheck',
      date: date,
      description: description,
      specialist: specialist,
      healthCheckRating: parseInt(rating),
    };
    onSubmit(entry);
  };

  return (
    <Box border={1} padding={2} marginBottom={2}>
      <Typography sx={{ fontWeight: 'bold', mb: 1 }}>NEW ENTRY</Typography>
      <Stack spacing={1} marginBottom={2}>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label>Specialist: </label>
          <input
            type="text"
            value={specialist}
            onChange={(event) => setSpecialist(event.target.value)}
          />
        </div>
        <div>
          <label>Rating: </label>
          <input
            type="text"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          />
        </div>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" color="error" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={submitForm}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default AddEntryForm;
