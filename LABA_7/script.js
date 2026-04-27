const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playTone(freq, type, duration) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type; 
    osc.frequency.value = freq;
    osc.connect(gain); 
    gain.connect(audioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
    osc.stop(audioCtx.currentTime + duration);
}

const sounds = {
    shoot: () => playTone(150, 'square', 0.15),
    win: () => { playTone(400, 'sine', 0.1); setTimeout(() => playTone(600, 'sine', 0.3), 100); },
    lose: () => { playTone(250, 'sawtooth', 0.3); setTimeout(() => playTone(150, 'sawtooth', 0.4), 300); },
    step: () => playTone(300, 'triangle', 0.05)
};

const getInitState = () => ({ level: 1, score: 0, reward: 500, maxTime: 1.20 });
const calcWin = (state) => ({
    level: state.level + 1,
    score: state.score + state.reward,
    reward: state.reward + 200,
    maxTime: Math.max(0.30, state.maxTime * 0.85) 
});

const CHARS = ['🤠', '👽', '🤖', '🥷', '🧟'];
let state = getInitState();
let phase = 'idle'; 
let timerId = null;
let fireStartTime = 0;

const ui = {
    start: document.getElementById('start-screen'),
    container: document.getElementById('game-container'),
    char: document.getElementById('character'),
    msg: document.getElementById('message'),
    score: document.getElementById('ui-score'),
    reward: document.getElementById('ui-reward'),
    pTime: document.getElementById('ui-p-time'),
    eTime: document.getElementById('ui-e-time'),
    // Нові елементи:
    gameOverScreen: document.getElementById('game-over-screen'),
    finalScore: document.getElementById('final-score'),
    restartBtn: document.getElementById('restart-btn')
};

function updateUI() {
    ui.score.innerText = state.score;
    ui.reward.innerText = state.reward;
    ui.eTime.innerText = state.maxTime.toFixed(2);
}

function initGame() {
    ui.start.classList.add('hidden');
    ui.gameOverScreen.classList.add('hidden'); 
    if (audioCtx.state === 'suspended') audioCtx.resume();
    state = getInitState();
    startRound();
}

function startRound() {
    updateUI();
    phase = 'walking';
    ui.msg.classList.add('hidden');
    ui.pTime.innerText = "0.00";
    
    ui.char.innerText = CHARS[Math.floor(Math.random() * CHARS.length)];
    ui.char.classList.remove('hidden');
    ui.char.style.left = '-20%'; 
    
    let pos = -20;
    const walkInterval = setInterval(() => {
        pos += 5;
        ui.char.style.left = pos + '%';
        sounds.step();
        
        if (pos >= 50) { 
            clearInterval(walkInterval);
            phase = 'ready';
            timerId = setTimeout(triggerFire, Math.random() * 2000 + 1000);
        }
    }, 150);
}

function triggerFire() {
    phase = 'fire';
    ui.msg.innerText = "FIRE!!";
    ui.msg.style.color = "#f8b800";
    ui.msg.classList.remove('hidden');
    fireStartTime = performance.now();
    
    timerId = setTimeout(() => {
        handleEnd(false, "YOU LOST!"); 
    }, state.maxTime * 1000);
}

function handleEnd(isWin, message, reactTime = 0) {
    phase = 'end';
    clearTimeout(timerId); 
    ui.msg.innerText = message;
    ui.msg.classList.remove('hidden');
    
    if (isWin) {
        sounds.win();
        ui.pTime.innerText = (reactTime / 1000).toFixed(2);
        state = calcWin(state);
        setTimeout(startRound, 3000); 
    } else {
        if (message !== "FOUL!") sounds.shoot(); 
        sounds.lose();
        ui.msg.style.color = "#ff0000";
        
        
        setTimeout(() => {
            ui.finalScore.innerText = state.score;
            ui.gameOverScreen.classList.remove('hidden');
            ui.msg.classList.add('hidden'); 
        }, 1500);
    }
}


ui.container.addEventListener('mousedown', (e) => {
    if (phase === 'idle' || phase === 'walking' || phase === 'end') return;
    
    sounds.shoot();
    ui.container.classList.add('flash');
    setTimeout(() => ui.container.classList.remove('flash'), 50);

    if (phase === 'ready') {
        handleEnd(false, "FOUL!");
    } else if (phase === 'fire') {
        if (e.target === ui.char) {
            const reactTime = performance.now() - fireStartTime;
            handleEnd(true, "YOU WON!", reactTime);
        } else {
            handleEnd(false, "MISS!");
        }
    }
});

ui.start.addEventListener('click', initGame);
ui.restartBtn.addEventListener('click', initGame); 