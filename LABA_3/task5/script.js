const countVowels = (str) => {
    const vowels = "аеєиіїоуюяaeiou";
    let count = 0;
    let lowerStr = str.toLowerCase();

    for (let char of lowerStr) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    console.log("Завдання 5: Кількість голосних =", count);
    return count;
};