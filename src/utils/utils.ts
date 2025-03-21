export const GenerateRandomNumber = (c: number, e: number) => {
  return c + e * Math.floor(e * Math.random());
};
