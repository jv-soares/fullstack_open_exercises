import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { EntryFormFieldsProps, OccupationalHealthcareEntry } from '../../types';
import ActionButtons from './ActionButtons';

const OccupationalHealthcareEntryFormFields = ({
  onSubmit,
  onCancel,
}: EntryFormFieldsProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: '',
    endDate: '',
  });

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'OccupationalHealthcare',
      date: date,
      description: description,
      specialist: specialist,
      diagnosisCodes: [],
      employerName: employerName,
      sickLeave: sickLeave,
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
          <label>Employer name: </label>
          <input
            type="text"
            value={employerName}
            onChange={(event) => setEmployerName(event.target.value)}
            required
          />
        </div>
        <SickLeaveFormFields sickLeave={sickLeave} onChange={setSickLeave} />
      </Stack>
      <ActionButtons onCancel={onCancel} />
    </form>
  );
};

const SickLeaveFormFields = ({
  sickLeave,
  onChange,
}: {
  sickLeave: SickLeave;
  onChange: (value: SickLeave) => void;
}) => {
  return (
    <div>
      <Typography variant="body1">Sick leave</Typography>
      <div>
        <label>Start: </label>
        <input
          type="date"
          value={sickLeave?.startDate}
          onChange={(event) =>
            onChange({
              startDate: event.target.value,
              endDate: sickLeave?.endDate ?? '',
            })
          }
        />
      </div>
      <div>
        <label>End: </label>
        <input
          type="date"
          value={sickLeave?.endDate}
          onChange={(event) =>
            onChange({
              startDate: sickLeave?.startDate ?? '',
              endDate: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

type SickLeave = OccupationalHealthcareEntry['sickLeave'];

export default OccupationalHealthcareEntryFormFields;
