import { Alert, Box } from '@mui/material';

const Notification = ({ notification }) => {
  if (notification === null) return null;

  return (
    <Box mb={4}>
      <Alert severity={notification.isError ? 'error' : 'success'}>
        {notification.message}
      </Alert>
    </Box>
  );
};

export default Notification;
