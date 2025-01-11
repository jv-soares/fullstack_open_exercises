import { Alert, Box, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { Entry, EntryFormValues } from '../../types';
import EntryTypeDropdownField from './EntryTypeDropdownField';
import HealthCheckEntryFormFields from './HealthCheckEntryFormFields';
import HospitalEntryFormFields from './HospitalEntryFormFields';
import OccupationalHealthcareEntryFormFields from './OccupationalHealthcareEntryFormFields';

interface AddEntryFormProps {
  onAdded: (values: Entry) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onAdded, onCancel }: AddEntryFormProps) => {
  const patientId = useParams().id!;

  const [entryType, setEntryType] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const submitForm = async (entry: EntryFormValues) => {
    if (!entryType) {
      setErrorMessage('Please select an entry type');
    }

    try {
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

  const buildFormFields = () => {
    switch (entryType) {
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryFormFields />;
      case 'Hospital':
        return (
          <HospitalEntryFormFields onSubmit={submitForm} onCancel={onCancel} />
        );
      case 'HealthCheck':
        return (
          <HealthCheckEntryFormFields
            onSubmit={submitForm}
            onCancel={onCancel}
          />
        );
    }
  };

  return (
    <Box border={1} padding={2} marginBottom={2}>
      <Typography sx={{ fontWeight: 'bold', mb: 1 }}>NEW ENTRY</Typography>
      <EntryTypeDropdownField value={entryType} onSelect={setEntryType} />
      {buildFormFields()}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};

export default AddEntryForm;
