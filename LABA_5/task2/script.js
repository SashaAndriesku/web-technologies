let redTime = 5000;
let yellowTime = 3000;
let greenTime = 7000;

let currentTimer;
let currentState = "red";

const lights = {
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    green: document.getElementById('green')
};

function reset() {
    lights.red.style.backgroundColor = "#333";
    lights.yellow.style.backgroundColor = "#333";
    lights.green.style.backgroundColor = "#333";
}

function updateLight() {
    clearTimeout(currentTimer);
    reset();

    let delay = 0;

    if (currentState === "red") {
        lights.red.style.backgroundColor = "red";
        delay = redTime;
        currentState = "yellow";
    } else if (currentState === "yellow") {
        lights.yellow.style.backgroundColor = "yellow";
        delay = yellowTime;
        currentState = "green";
    } else if (currentState === "green") {
        lights.green.style.backgroundColor = "green";
        delay = greenTime;
        currentState = "red";
    }

    currentTimer = setTimeout(updateLight, delay);
}

document.getElementById('next-btn').addEventListener('click', () => {
    updateLight();
});

document.getElementById('settings-btn').addEventListener('click', () => {
    const r = prompt("Час червоного (сек):", redTime / 1000);
    const y = prompt("Час жовтого (сек):", yellowTime / 1000);
    const g = prompt("Час зеленого (сек):", greenTime / 1000);

    if (r) redTime = Number(r) * 1000;
    if (y) yellowTime = Number(y) * 1000;
    if (g) greenTime = Number(g) * 1000;

    currentState = "red";
    updateLight();
});

updateLight();