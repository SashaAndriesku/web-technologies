function task1() {
  let fruits = ["яблуко", "банан", "апельсин", "груша"];
  
  
  fruits.pop();
  console.log("Завдання 1.1 (Після видалення):", [...fruits]); 
  
  
  fruits.unshift("ананас");
  console.log("Завдання 1.2 (Додано ананас):", [...fruits]);
  
  
  fruits.sort().reverse();
  console.log("Завдання 1.3 (Сортування):", [...fruits]);
  
  
  let index = fruits.indexOf("яблуко");
  console.log("Завдання 1.4 (Індекс яблука):", index);
}
task1();