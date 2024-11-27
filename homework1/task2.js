function isPrime(n) {
  // since 0 and 1 is not prime return false.
  if (n == 1 || n == 0) return false;

  // run a loop from 2 to n/2.
  for (let i = 2; i <= n / 2; i++)
    // if the number is divisible by i, then n is not a prime number.
    if (n % i == 0) return false;

  // otherwise, n is prime number.
  return true;
}

// string of prime numbers
let primes = "";

// check for every number from 1 to N
for (let i = 1; i <= 237; i++) {
  // check if current number is prime
  if (isPrime(i)) primes += i + " ";
}

console.log(primes);
