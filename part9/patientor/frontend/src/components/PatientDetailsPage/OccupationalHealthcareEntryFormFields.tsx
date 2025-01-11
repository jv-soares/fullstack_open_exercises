import { Divider, Typography } from '@mui/material';
import { useState } from 'react';
import {
  BaseEntryFormValues,
  EntryFormFieldsProps,
  SickLeave,
} from '../../types';
import EntryFormScaffold from './EntryFormScaffold';

const OccupationalHealthcareEntryFormFields = ({
  onSubmit,
  onCancel,
}: EntryFormFieldsProps) => {
  const [baseEntry, setBaseEntry] = useState<BaseEntryFormValues>({
    date: '',
    description: '',
    specialist: '',
    diagnosisCodes: [],
  });
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: '',
    endDate: '',
  });

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: 'OccupationalHealthcare',
      ...{
        ...baseEntry,
        diagnosisCodes:
          baseEntry.diagnosisCodes!.length > 0
            ? baseEntry.diagnosisCodes
            : undefined,
      },
      employerName: employerName,
      sickLeave: sickLeave,
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
        <label>Employer name: </label>
        <input
          type="text"
          value={employerName}
          onChange={(event) => setEmployerName(event.target.value)}
          required
        />
      </div>
      <Divider />
      <SickLeaveFormFields sickLeave={sickLeave} onChange={setSickLeave} />
    </EntryFormScaffold>
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

export default OccupationalHealthcareEntryFormFields;
