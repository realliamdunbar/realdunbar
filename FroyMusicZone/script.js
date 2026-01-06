const audio = document.getElementById('audio');
const container = document.getElementById('lyrics-container');

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
`;

const lyrics = [];

function parseLRC() {
    const lines = lrcData.split('\n');
    const timeReg = /\[(\d{2}):(\d{2})\.(\d{2})\]/;
    
    lines.forEach(line => {
        const match = timeReg.exec(line);
        if (match) {
            const minutes = parseInt(match[1]);
            const seconds = parseInt(match[2]);
            const ms = parseInt(match[3]);
            const time = minutes * 60 + seconds + ms / 100;
            const text = line.replace(timeReg, '').trim();
            if (text) lyrics.push({ time, text });
        }
    });

    lyrics.forEach((item, index) => {
        const p = document.createElement('p');
        p.innerText = item.text;
        p.classList.add('lyric-line');
        p.setAttribute('id', `line-${index}`);
        container.appendChild(p);
    });
}

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    
    for (let i = 0; i < lyrics.length; i++) {
        if (currentTime >= lyrics[i].time && (!lyrics[i+1] || currentTime < lyrics[i+1].time)) {
            const activeLine = document.getElementById(`line-${i}`);
            
            document.querySelectorAll('.lyric-line').forEach(el => el.classList.remove('active'));
            
            if (activeLine) {
                activeLine.classList.add('active');
              
                const offset = activeLine.offsetTop - (window.innerHeight / 2);
                container.style.transform = `translateY(-${offset}px)`;
            }
            break;
        }
    }
});

parseLRC();
