export const runCalculator = (callback: () => void) => {
  try {
    callback();
  } catch (error) {
    let message = 'something went wrong';
    if (error instanceof Error) {
      message += `: ${error.message}`;
    }
    console.log(message);
  }
};
