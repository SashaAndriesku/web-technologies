function task7() {
  let student = {
    name: "Петро",
    age: 20,
    course: 2
  };
  console.log("Завдання 7.1:", { ...student });

  student.subjects = ["Математика", "Фізика"];
  console.log("Завдання 7.2:", { ...student });
  
  delete student.age;
  console.log("Завдання 7.3:", { ...student });
  
  console.log("Завдання 7.4:", student);
}
task7();