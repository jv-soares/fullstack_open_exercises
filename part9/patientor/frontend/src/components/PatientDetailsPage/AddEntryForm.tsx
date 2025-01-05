import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Entry, EntryFormValues } from '../../types';

interface AddEntryFormProps {
  onAdded: (values: Entry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onAdded, onCancel }: AddEntryFormProps) => {
  const patientId = useParams().id!;

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');

  const [errorMessage, setErrorMessage] = useState<string>();

  const submitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const entry: EntryFormValues = {
        type: 'HealthCheck',
        date: date,
        description: description,
        specialist: specialist,
        healthCheckRating: parseInt(rating),
      };
      const addedEntry = await patientService.addEntry(patientId, entry);
      onAdded(addedEntry);
      onCancel();
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof AxiosError) {
        const errorData = error.response?.data.error;
        if (errorData instanceof Array) {
          const message = error.response?.data.error[0].message;
          setErrorMessage(message);
        }
      }
    }
  };

  return (
    <Box border={1} padding={2} marginBottom={2}>
      <form onSubmit={submitForm}>
        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>NEW ENTRY</Typography>
        <Stack spacing={1} marginBottom={2}>
          <div>
            <label>Date: </label>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>
          <div>
            <label>Description: </label>
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>
          <div>
            <label>Specialist: </label>
            <input
              type="text"
              value={specialist}
              onChange={(event) => setSpecialist(event.target.value)}
              required
            />
          </div>
          <div>
            <label>Rating: </label>
            <input
              type="text"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              required
            />
          </div>
        </Stack>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Stack direction="row" spacing={1}>
          <Button variant="contained" color="error" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddEntryForm;
