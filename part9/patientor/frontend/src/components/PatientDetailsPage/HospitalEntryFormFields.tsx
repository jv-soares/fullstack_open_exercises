import { Typography } from '@mui/material';
import { useState } from 'react';
import {
  BaseEntryFormValues,
  Discharge,
  EntryFormFieldsProps,
} from '../../types';
import EntryFormScaffold from './EntryFormScaffold';

const HospitalEntryFormFields = ({
  onSubmit,
  onCancel,
}: EntryFormFieldsProps) => {
  const [baseEntry, setBaseEntry] = useState<BaseEntryFormValues>({
    date: '',
    description: '',
    specialist: '',
    diagnosisCodes: [],
  });
  const [discharge, setDischarge] = useState<Discharge>({
    date: '',
    criteria: '',
  });

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'Hospital',
      ...{
        ...baseEntry,
        diagnosisCodes:
          baseEntry.diagnosisCodes!.length > 0
            ? baseEntry.diagnosisCodes
            : undefined,
      },
      discharge: discharge,
    });
  };

  return (
    <EntryFormScaffold
      value={baseEntry}
      onChange={setBaseEntry}
      onSubmit={submitForm}
      onCancel={onCancel}
    >
      <Typography variant="body1"> Discharge</Typography>
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={discharge.date}
          onChange={(event) =>
            setDischarge({ ...discharge, date: event.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Criteria: </label>
        <input
          type="text"
          value={discharge.criteria}
          onChange={(event) =>
            setDischarge({ ...discharge, criteria: event.target.value })
          }
          required
        />
      </div>
    </EntryFormScaffold>
  );
};

export default HospitalEntryFormFields;
