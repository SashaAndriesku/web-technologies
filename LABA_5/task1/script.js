const bulb = document.getElementById('bulb');
const toggleBtn = document.getElementById('toggleBtn');
const typeSelect = document.getElementById('typeSelect');
const brightBtn = document.getElementById('brightBtn');
const statusDisplay = document.getElementById('statusDisplay');

let lamp = {
    isOn: false,
    type: 'regular',
    brightness: 1
};

function updateBulb() {
    bulb.className = 'bulb';
    if (lamp.isOn) {
        bulb.classList.add('on');
        bulb.classList.add(lamp.type);
        bulb.style.opacity = lamp.brightness;
    } else {
        bulb.style.opacity = 1;
    }
    statusDisplay.innerText = `Статус: ${lamp.isOn ? 'Ввімкнено' : 'Вимкнено'}`;
}

toggleBtn.onclick = function() {
    lamp.isOn = !lamp.isOn;
    updateBulb();
};

typeSelect.onchange = function() {
    lamp.type = this.value;
    updateBulb();
};

brightBtn.onclick = function() {
    let val = prompt("Яскравість (0.1 - 1):", lamp.brightness);
    if (val !== null) {
        lamp.brightness = parseFloat(val);
        updateBulb();
    }
};