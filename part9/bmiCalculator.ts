const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const heightInMeter = heightInCm / 100;
  const bmi = weightInKg / (heightInMeter * heightInMeter);

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

console.log(calculateBmi(170, 72));
