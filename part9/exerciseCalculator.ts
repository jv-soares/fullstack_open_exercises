interface Result {
  periodLength: number;
  trainingDays: number;
  isSuccess: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const average = getAverage(dailyHours);
  const rating = getRating(average, target);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((e) => e > 0).length,
    isSuccess: average > target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
