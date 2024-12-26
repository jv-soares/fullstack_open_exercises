import express from 'express';

const app = express();
const port = 3003;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
