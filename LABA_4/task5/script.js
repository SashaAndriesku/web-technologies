function task5() {
  let numbers = [1, 2, 3, 4, 5, 6];
  console.log("Завдання 5.0:", [...numbers]);
  
  let squares = numbers.map(n => n * n);
  console.log("Завдання 5.1:", squares);
  
  let evens = numbers.filter(n => n % 2 === 0);
  console.log("Завдання 5.2:", evens);
  
  let sum = numbers.reduce((acc, curr) => acc + curr, 0);
  console.log("Завдання 5.3:", sum);
  
  let extra = [10, 20, 30, 40, 50];
  let combined = numbers.concat(extra);
  console.log("Завдання 5.4:", [...combined]);
  
  combined.splice(0, 3);
  console.log("Завдання 5.5:", [...combined]);
}
task5();