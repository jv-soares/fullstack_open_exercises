import { Stack } from '@mui/material';
import { BaseEntryFormValues } from '../../types';
import ActionButtons from './ActionButtons';
import DiagnosisCodesFormField from './DiagnosisCodesFormFields';

interface EntryFormScaffoldProps {
  children: React.ReactNode;
  value: BaseEntryFormValues;
  onChange: (entry: BaseEntryFormValues) => void;
  onSubmit: (event: React.SyntheticEvent) => void;
  onCancel: () => void;
}

const EntryFormScaffold = (props: EntryFormScaffoldProps) => {
  return (
    <form onSubmit={props.onSubmit}>
      <Stack spacing={1} mb={2}>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={props.value.date}
            onChange={(event) =>
              props.onChange({ ...props.value, date: event.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={props.value.description}
            onChange={(event) =>
              props.onChange({
                ...props.value,
                description: event.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label>Specialist: </label>
          <input
            type="text"
            value={props.value.specialist}
            onChange={(event) =>
              props.onChange({ ...props.value, specialist: event.target.value })
            }
            required
          />
        </div>
        <DiagnosisCodesFormField
          codes={props.value.diagnosisCodes!}
          onChange={(codes) =>
            props.onChange({ ...props.value, diagnosisCodes: codes })
          }
        />
        {props.children}
      </Stack>
      <ActionButtons onCancel={props.onCancel} />
    </form>
  );
};

export default EntryFormScaffold;
