import cors from 'cors';
import express from 'express';

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
