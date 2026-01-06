const lrcData = `
[00:14.04]It's not true
[00:19.54]Tell me I've been lied to
[00:26.57]Crying isn't like you, ooh
[00:40.46]What the hell did I do?
[00:47.41]Never been the type to
[00:54.41]Let someone see right through, ooh
[01:10.09]Maybe won't you take it back?
[01:13.02]Say you were tryna make me laugh
[01:16.47]And nothing has to change today
[01:20.10]You didn't mean to say "I love you"
[01:29.69]I love you and I don't want to, ooh
[01:51.43]Up all night on another red-eye
[02:03.70]I wish we never learned to fly, ah
[02:17.85]Maybe we should just try
[02:24.55]To tell ourselves a good lie
[02:31.85]Didn't mean to make you cry, ah
[02:47.49]Maybe won't you take it back?
[02:50.46]Say you were tryna make me laugh
[02:53.98]And nothing has to change today
[02:57.46]You didn't mean to say "I love you"
[03:06.98]I love you and I don't want to, ooh
[03:28.89]The smile that you gave me
[03:31.70]Even when you felt like dying
[03:42.97]We fall apart as it gets dark
[03:46.18]I'm in your arms in Central Park
[03:49.95]There's nothing you could do or say
[03:53.14]I can't escape the way I love you
[04:02.31]I don't want to, but I love you, ooh
[04:23.13]Ooh, ooh
[04:37.04]Ooh, ooh
`;

const music = document.getElementById('music');
const startBtn = document.getElementById('startBtn');
const wrapper = document.getElementById('lyrics-wrapper');
const viewport = document.getElementById('lyrics-viewport');
const overlay = document.getElementById('overlay');

let lyrics = [];

function parseLRC(text) {
    const lines = text.trim().split('\n');
    const parsed = [];
    lines.forEach(line => {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.+)/);
        if (match) {
            parsed.push({
                time: parseInt(match[1]) * 60 + parseFloat(match[2]),
                text: match[3].trim()
            });
        }
    });
    return parsed;
}

function initLyrics() {
    lyrics = parseLRC(lrcData);
    wrapper.innerHTML = ''; // Clear existing
    lyrics.forEach((l, i) => {
        const el = document.createElement('div');
        el.className = 'lyric-line';
        el.textContent = l.text;
        el.id = `line-${i}`;
        wrapper.appendChild(el);
    });
}

startBtn.addEventListener('click', () => {
    console.log("Button clicked, starting music...");
    overlay.classList.add('hidden');
    viewport.classList.remove('hidden');
    initLyrics();
    
    music.play().catch(e => console.error("Music play failed:", e));
});

music.addEventListener('timeupdate', () => {
    const curTime = music.currentTime;
    const index = lyrics.findIndex((l, i) => 
        curTime >= l.time && (!lyrics[i + 1] || curTime < lyrics[i + 1].time)
    );

    if (index !== -1) {
        const lines = document.querySelectorAll('.lyric-line');
        lines.forEach(line => line.classList.remove('active'));
        
        const activeLine = document.getElementById(`line-${index}`);
        if (activeLine) {
            activeLine.classList.add('active');
            
            // Calculate center scroll
            const offset = activeLine.offsetTop - (window.innerHeight / 2);
            wrapper.style.transform = `translateY(-${offset}px)`;
        }
    }
});
