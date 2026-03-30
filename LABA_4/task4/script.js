function task4() {
  let students = [
    { name: "Олексій", age: 20, course: 2 },
    { name: "Дмитро", age: 22, course: 4 },
    { name: "Олена", age: 21, course: 3 }
  ];
  console.log("Завдання 4.1:", [...students]);
  
  students = students.filter(s => s.name !== "Олексій");
  console.log("Завдання 4.2:", [...students]);
  
  students.push({ name: "Ігор", age: 19, course: 1 });
  console.log("Завдання 4.3:", [...students]);
  
  students.sort((a, b) => b.age - a.age);
  console.log("Завдання 4.4:", [...students]);
  
  let student3 = students.find(s => s.course === 3);
  console.log("Завдання 4.5:", student3);
}
task4();