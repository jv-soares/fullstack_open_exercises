import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { DiagnosisCodes, EntryFormFieldsProps, SickLeave } from '../../types';
import ActionButtons from './ActionButtons';
import DiagnosisCodesFormField from './DiagnosisCodesFormFields';

const OccupationalHealthcareEntryFormFields = ({
  onSubmit,
  onCancel,
}: EntryFormFieldsProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<DiagnosisCodes>([]);
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
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined,
      employerName: employerName,
      sickLeave: sickLeave,
    });
  };

  return <FormScaffold></FormScaffold>;
};

const FormScaffold = () => {
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
        <DiagnosisCodesFormField
          codes={diagnosisCodes}
          onChange={setDiagnosisCodes}
        />
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

export default OccupationalHealthcareEntryFormFields;
