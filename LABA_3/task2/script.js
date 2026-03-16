function calculateFactorial() {
    let input = prompt("Введіть число для обчислення факторіала:");
    let n = parseInt(input);
    let factorial = 1;

    if (isNaN(n) || n < 0) {
        console.log("Завдання 2: Будь ласка, введіть коректне додатне число");
        return;
    }

    for (let i = 1; i <= n; i++) {
        factorial *= i;
    }

    console.log("Завдання 2: Факторіал числа " + n + " = " + factorial);
}