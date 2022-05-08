export const getNumberValue = (value: string): number => {
  if (value === '' || value === '-') {
    return 0;
  }

  const numValue = Number(value);

  return isNaN(numValue) ? 0 : numValue;
};
