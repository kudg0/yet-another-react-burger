export default function getRandomInteger(max: number, min: number) : number{
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min; 
}