function task2() {
  let colors = ["червоний", "синій", "зелений", "темно-синій", "жовтий"];
  console.log("Завдання 2.1:", [...colors]);
  
  let longest = colors.reduce((a, b) => a.length >= b.length ? a : b);
  let shortest = colors.reduce((a, b) => a.length <= b.length ? a : b);
  console.log("Завдання 2.2 (найдовший):", longest);
  console.log("Завдання 2.2 (найкоротший):", shortest);
  
  colors = colors.filter(color => color.includes("синій"));
  console.log("Завдання 2.3:", [...colors]);
  
  let resultString = colors.join(", ");
  console.log("Завдання 2.5:", resultString);
}
task2();