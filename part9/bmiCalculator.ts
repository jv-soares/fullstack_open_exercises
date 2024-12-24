import { runCalculator } from './utils';

interface BmiParams {
  heightInCm: number;
  weightInKg: number;
}

const calculateBmi = (params: BmiParams): string => {
  const heightInMeter = params.heightInCm / 100;
  const bmi = params.weightInKg / (heightInMeter * heightInMeter);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal weight';
  } else if (bmi < 30) {
    return 'Overweight';
  } else if (bmi < 35) {
    return 'Obesity class I';
  } else if (bmi < 40) {
    return 'Obesity class II';
  } else {
    return 'Obesity class III';
  }
};

const parseArguments = (args: string[]): BmiParams => {
  const relevantArgs = args.slice(2);

  if (relevantArgs.length < 2) throw Error('not enough arguments');
  if (relevantArgs.length > 2) throw Error('too many arguments');

  if (!isNumber(relevantArgs[0]) || !isNumber(relevantArgs[1])) {
    throw Error('arguments must be numbers');
  }

  const params = {
    heightInCm: Number(relevantArgs[0]),
    weightInKg: Number(relevantArgs[1]),
  };

  if (params.heightInCm <= 0 || params.weightInKg <= 0) {
    throw Error('arguments must be greater than 0');
  }

  return params;
};

const isNumber = (value: any): boolean => !isNaN(Number(value));

if (require.main === module) {
  runCalculator(() => {
    const params = parseArguments(process.argv);
    const bmi = calculateBmi(params);
    console.log(bmi);
  });
}

export default calculateBmi;
