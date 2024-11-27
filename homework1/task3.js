// setting up a counter
let countZeros = 0;
const intArray = [7, 58, 0, 480, 0, 10, 0, 5000, 5, 1, 0, 0];

// for each cell in the array counting each time we encounter 0
intArray.forEach((num) => Number(num === 0 ? countZeros++ : null));

console.log(countZeros);
