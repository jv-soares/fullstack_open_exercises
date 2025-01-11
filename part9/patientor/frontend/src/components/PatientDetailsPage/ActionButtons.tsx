import { Button, Stack } from '@mui/material';

const ActionButtons = ({ onCancel }: { onCancel: () => void }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Button variant="contained" color="error" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Stack>
  );
};

export default ActionButtons;
