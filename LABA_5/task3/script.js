setInterval(() => {
    const d = new Date();
    document.getElementById('clock').innerHTML = 
        `${String(d.getHours()).padStart(2,0)}<span>:</span>${String(d.getMinutes()).padStart(2,0)}<span>:</span>${String(d.getSeconds()).padStart(2,0)}`;
}, 1000);


let tInt;
function setTimer() {
    const target = new Date(prompt("Вкажіть дату (YYYY-MM-DD HH:MM):", "2026-12-31 23:59")).getTime();
    if (isNaN(target)) return;
    clearInterval(tInt);
    tInt = setInterval(() => {
        const diff = target - Date.now();
        if (diff <= 0) return (document.getElementById('timer').innerText = "ЧАС ВИЙШОВ");
        const d = Math.floor(diff/864e5), h = Math.floor(diff%864e5/36e5), m = Math.floor(diff%36e5/6e4), s = Math.floor(diff%6e4/1e3);
        document.getElementById('timer').innerText = `${d}д ${h}г ${m}хв ${s}с`;
    }, 1000);
}


const calM = document.getElementById('cal-m');
calM.value = new Date().toISOString().slice(0, 7);
function renderCal() {
    const grid = document.getElementById('cal-grid');
    grid.innerHTML = "";
    const [y, m] = calM.value.split('-').map(Number);
    const first = new Date(y, m-1, 1).getDay();
    const days = new Date(y, m, 0).getDate();
    for(let i=0; i<(first||7)-1; i++) grid.innerHTML += '<div></div>';
    for(let d=1; d<=days; d++) {
        const isT = new Date().toDateString() === new Date(y, m-1, d).toDateString();
        grid.innerHTML += `<div class="${isT?'today':''}">${d}</div>`;
    }
}
renderCal();


let bInt;
function calcBday() {
    clearInterval(bInt); 
    bInt = setInterval(() => {
        const now = new Date();
        const target = new Date(document.getElementById('bday-in').value);
        
        const diff = target - now;
        if (diff <= 0) {
            document.getElementById('bday-out').innerText = "Цей день вже настав!";
            return;
        }

        
        const mo = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
        const d = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1e3);

        document.getElementById('bday-out').innerText = `${mo}міс ${d}д ${h}г ${m}хв ${s}с`;
    }, 1000);
}