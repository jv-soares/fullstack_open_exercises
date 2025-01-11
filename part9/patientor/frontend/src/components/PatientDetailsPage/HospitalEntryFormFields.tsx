import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Discharge, EntryFormFieldsProps } from '../../types';
import ActionButtons from './ActionButtons';

const HospitalEntryFormFields = ({
  onSubmit,
  onCancel,
}: EntryFormFieldsProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [discharge, setDischarge] = useState<Discharge>({
    date: '',
    criteria: '',
  });

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'Hospital',
      date: date,
      description: description,
      specialist: specialist,
      diagnosisCodes: [],
      discharge: discharge,
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
        <DischargeFormFields discharge={discharge} onChange={setDischarge} />
      </Stack>
      <ActionButtons onCancel={onCancel} />
    </form>
  );
};

const DischargeFormFields = ({
  discharge,
  onChange,
}: {
  discharge: Discharge;
  onChange: (value: Discharge) => void;
}) => {
  return (
    <div>
      <Typography variant="body1"> Discharge</Typography>
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={discharge.date}
          onChange={(event) =>
            onChange({ ...discharge, date: event.target.value })
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
            onChange({ ...discharge, criteria: event.target.value })
          }
          required
        />
      </div>
    </div>
  );
};

export default HospitalEntryFormFields;
