import { MenuItem, Select } from '@mui/material';

const EntryTypeDropdownField = ({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (value: string) => void;
}) => {
  return (
    <Select
      size="small"
      displayEmpty
      value={value}
      onChange={(event) => onSelect(event.target.value)}
      sx={{ mb: 2 }}
    >
      <MenuItem disabled value="">
        Select an entry type
      </MenuItem>
      <MenuItem value="HealthCheck">Health Check</MenuItem>
      <MenuItem value="OccupationalHealthcare">
        Occupational Healthcare
      </MenuItem>
      <MenuItem value="Hospital">Hospital</MenuItem>
    </Select>
  );
};

export default EntryTypeDropdownField;
