import { Stack } from '@mui/material';
import React, { useState } from 'react';
import { EntryFormFieldsProps } from '../../types';
import ActionButtons from './ActionButtons';

const HealthCheckEntryFormFields = ({
  onSubmit,
  onCancel,
}: EntryFormFieldsProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'HealthCheck',
      date: date,
      description: description,
      specialist: specialist,
      diagnosisCodes: [],
      healthCheckRating: parseInt(rating),
    });
  };

  return (
    <form onSubmit={submitForm}>
      <Stack spacing={1} mb={2}>
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
      <ActionButtons onCancel={onCancel} />
    </form>
  );
};

export default HealthCheckEntryFormFields;
