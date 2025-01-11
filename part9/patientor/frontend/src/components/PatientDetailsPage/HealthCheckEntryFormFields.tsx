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
  const [rating, setRating] = useState('');

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
      healthCheckRating: parseInt(rating),
    });
  };

  return (
    <EntryFormScaffold
      value={baseEntry}
      onChange={setBaseEntry}
      onSubmit={submitForm}
      onCancel={onCancel}
    >
      <div>
        <label>Rating: </label>
        <input
          type="text"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          required
        />
      </div>
    </EntryFormScaffold>
  );
};

export default HealthCheckEntryFormFields;
