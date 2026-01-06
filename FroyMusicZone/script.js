const audio = document.getElementById('audio');
const lyricDisplay = document.getElementById('active-lyric');

// Your LRC Data
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
const lines = lrcData.trim().split('\n');
const timeReg = /\[(\d{2}):(\d{2})\.(\d{2})\]/;

lines.forEach(line => {
    const match = timeReg.exec(line);
    if (match) {
        const time = parseInt(match[1]) * 60 + parseInt(match[2]) + parseInt(match[3]) / 100;
        const text = line.replace(timeReg, '').trim();
        lyrics.push({ time, text });
    }
});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    let currentLine = "";

    for (let i = 0; i < lyrics.length; i++) {
        if (currentTime >= lyrics[i].time) {
            currentLine = lyrics[i].text;
        }
    }

    if (lyricDisplay.innerText !== currentLine) {
        lyricDisplay.style.opacity = 0;
        setTimeout(() => {
            lyricDisplay.innerText = currentLine;
            lyricDisplay.style.opacity = 1;
        }, 150);
    }
});

function unmute() {
    audio.muted = false;
    document.getElementById('unmute-hint').style.display = 'none';
}
