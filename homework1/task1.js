// note: run file by typing in terminal 'node' then press tab
// if num divides with 2 or 3 or 5:
const num = 123;
Number(num % 2 === 0 || num % 3 === 0 || num % 5 === 0) && console.log("1");

// if num divides with 2 and 3 or 3 and 5 or 2 and 5:
Number(
  (num % 2 === 0 && num % 3 === 0) ||
    (num % 3 === 0 && num % 5 === 0) ||
    (num % 2 === 0 && num % 5 === 0)
) && console.log("2");

// if num divides with 2 and 3 and 5
Number(num % 2 === 0 && num % 3 === 0 && num % 5 === 0) && console.log("3");
