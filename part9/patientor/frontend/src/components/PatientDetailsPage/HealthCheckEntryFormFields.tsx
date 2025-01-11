import { Favorite } from '@mui/icons-material';
import { Box, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import { BaseEntryFormValues, EntryFormFieldsProps } from '../../types';
import EntryFormScaffold from './EntryFormScaffold';

const HealthCheckEntryFormFields = ({
  onSubmit,
  onCancel,
}: EntryFormFieldsProps) => {
  const [baseEntry, setBaseEntry] = useState<BaseEntryFormValues>({
    date: '',
    description: '',
    specialist: '',
    diagnosisCodes: [],
  });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(-1);

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'HealthCheck',
      ...{
        ...baseEntry,
        diagnosisCodes:
          baseEntry.diagnosisCodes!.length > 0
            ? baseEntry.diagnosisCodes
            : undefined,
      },
      healthCheckRating: getHealthCheckRating(),
    });
  };

  const getHealthCheckRating = (): number => {
    return {
      1: 3,
      2: 2,
      3: 1,
      4: 0,
    }[rating]!;
  };

  const getLabelText = (): string => {
    const value = hoverRating !== -1 ? hoverRating : rating;
    return {
      1: 'Critical risk',
      2: 'High risk',
      3: 'Low risk',
      4: 'Healthy',
    }[value]!;
  };

  return (
    <EntryFormScaffold
      value={baseEntry}
      onChange={setBaseEntry}
      onSubmit={submitForm}
      onCancel={onCancel}
    >
      <Typography>Rating</Typography>
      <Box display="flex" alignItems="center">
        <Rating
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue!);
          }}
          onChangeActive={(_, newHoverValue) => setHoverRating(newHoverValue)}
          icon={<Favorite />}
          emptyIcon={<Favorite />}
          max={4}
        />
        {<Box sx={{ ml: 2 }}>{getLabelText()}</Box>}
      </Box>
    </EntryFormScaffold>
  );
};

export default HealthCheckEntryFormFields;
