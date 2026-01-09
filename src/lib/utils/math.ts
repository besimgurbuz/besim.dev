export const sum = (vals: number[]): number => {
  return vals.reduce((total, v) => total + v, 0);
};
