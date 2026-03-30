function task3() {
  let employees = [
    { name: "Іван", age: 25, position: "розробник" },
    { name: "Анна", age: 30, position: "дизайнер" },
    { name: "Олег", age: 22, position: "розробник" }
  ];
  console.log("Завдання 3.1:", [...employees]);
  
  employees.sort((a, b) => a.name.localeCompare(b.name));
  console.log("Завдання 3.2:", [...employees]);
  
  let developers = employees.filter(emp => emp.position === "розробник");
  console.log("Завдання 3.3:", developers);
  
  employees = employees.filter(emp => emp.age <= 28);
  console.log("Завдання 3.4:", [...employees]);
  
  employees.push({ name: "Марія", age: 27, position: "HR" });
  console.log("Завдання 3.5:", [...employees]);
}
task3();