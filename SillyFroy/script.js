const btn = document.getElementById('startBtn');
const partyArea = document.getElementById('partyArea');
const innerCard = document.getElementById('innerCard');
const ghostContainer = document.getElementById('ghostContainer');
const music = document.getElementById('music');
const body = document.getElementById('main-body');

const colors = ['#5dfc9f', '#60d4f1', '#f06292', '#ffeb3b', '#7c4dff', '#ff5722', '#00bcd4'];

btn.addEventListener('click', () => {
    document.getElementById('overlay').classList.add('hidden');
    partyArea.classList.remove('hidden');
    music.play();

    setTimeout(() => {
        partyArea.classList.add('zoomed-out');
    }, 50);

    setInterval(flashColors, 400);
    setInterval(spawnGhost, 600); 
});

function flashColors() {
    const colorBg = colors[Math.floor(Math.random() * colors.length)];
    const colorInner = colors[Math.floor(Math.random() * colors.length)];

    body.style.backgroundColor = colorBg;
    innerCard.style.backgroundColor = colorInner;
}

function spawnGhost() {
    const ghost = document.createElement('img');
    ghost.src = 'ditto.gif';
    ghost.className = 'ghost-ditto';
    
    // Position random height across the WHOLE screen
    ghost.style.top = Math.random() * 90 + 'vh';
    
    if (Math.random() > 0.5) ghost.classList.add('slide-right');
    else ghost.classList.add('slide-left');

    ghostContainer.appendChild(ghost);
    setTimeout(() => ghost.remove(), 3500);
}
