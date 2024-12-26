/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
const port = 3003;

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  if (!body['daily_exercises'] || !body['target']) {
    res.status(400).json({ error: 'parameters missing' });
  }

  const dailyHours = body['daily_exercises'] as number[];
  const target = Number(body['target']);

  if (
    !Array.isArray(dailyHours) ||
    dailyHours.some((e) => isNaN(Number(e))) ||
    isNaN(target)
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  if (dailyHours.length === 0) {
    res.status(400).json({ error: 'daily hours must not be empty' });
  }

  try {
    const result = calculateExercises({
      dailyHours: dailyHours,
      target: target,
    });
    res.json(result);
  } catch (error) {
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
