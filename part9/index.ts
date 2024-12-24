import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();
const port = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  try {
    const bmi = calculateBmi({ heightInCm: height, weightInKg: weight });
    res.json({ weight, height, bmi });
  } catch (error: unknown) {
    let message = '';
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = 'unknown error';
    }
    res.status(500).json({ error: message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
