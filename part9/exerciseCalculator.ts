import { runCalculator } from './utils';

interface ExerciseParams {
  dailyHours: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  isSuccess: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (params: ExerciseParams): Result => {
  const average = getAverage(params.dailyHours);
  const rating = getRating(average, params.target);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength: params.dailyHours.length,
    trainingDays: params.dailyHours.filter((e) => e > 0).length,
    isSuccess: average >= params.target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: params.target,
    average: average,
  };
};

const getAverage = (dailyHours: number[]): number => {
  return dailyHours.reduce((a, b) => a + b) / dailyHours.length;
};

const getRating = (average: number, target: number): number => {
  const rating = 1 + 2 * (average / target);
  return rating > 3 ? 3 : rating;
};

const getRatingDescription = (rating: number): string => {
  if (rating < 2) {
    return 'you can do better than this!';
  } else if (rating < 3) {
    return 'good, but next time aim for the target!';
  } else {
    return 'very good job!';
  }
};

const parseArguments = (args: string[]): ExerciseParams => {
  const relevantArgs = args.slice(2);

  const targetIndex = relevantArgs.findIndex((e) => e.includes('target='));
  if (targetIndex === -1) throw Error('target must be provided');

  const target = Number(relevantArgs[targetIndex].split('=')[1]);

  if (isNaN(target)) throw Error('target must be number');
  if (target <= 0) throw Error('target must be greater than 0');

  relevantArgs.splice(targetIndex, 1);
  const dailyHours = relevantArgs.map((e) => Number(e));

  if (dailyHours.some((e) => isNaN(e))) {
    throw Error('daily exercise hours must be numbers');
  }

  return { dailyHours, target };
};

runCalculator(() => {
  const params = parseArguments(process.argv);
  const result = calculateExercises(params);
  console.log(result);
});
