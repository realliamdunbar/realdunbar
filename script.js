const stateError = document.getElementById("state-error");
const stateLoading = document.getElementById("state-loading");
const stateTerminal = document.getElementById("state-terminal");

const okBtn = document.getElementById("btn-ok");
const fill = document.getElementById("loadingFill");
const dataContent = document.getElementById("dataContent");

/* BOOT SEQUENCE */
okBtn.onclick = () => {
  stateError.classList.remove("active");
  stateLoading.classList.add("active");

  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.random() * 10;
    fill.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(timer);
      stateLoading.classList.remove("active");
      stateTerminal.classList.add("active");
    }
  }, 120);
};

/* DATA BLOCKS — WORDS UNCHANGED */
const DATA = {
  info: `
SUBJECT PROFILE — LEVEL 1

Name: Froylan Fahlan Aditya
Alias: Liam Dunbar
Age: 18
Origin: Indonesia

Froylan Fahlan Aditya, known online as Liam Dunbar, is an 18-year-old from Indonesia.
He has a calm but introspective presence. He speaks Indonesian and English with a
preference for a UK accent, and he's currently learning German.

His heart is drawn to Austria and Germany — places he dreams of living in someday,
hoping to find peace within himself and a sense of belonging he's been searching for.

Fahlan Aditya is a quiet soul who carries many storms inside.
He grew up being told to silence his emotions, but deep down he feels everything.
He calls himself "a boy made of water and soil."
  `,

  wounds: `
PSYCHOLOGICAL RECORD — LEVEL 2

• Social Anxiety
• Depression
• Intermittent Explosive Disorder (IED)
• Complex PTSD (C-PTSD)
• Autism Spectrum Disorder
• Borderline Personality Traits (BPD)
• Executive Dysfunction
• Dissociative Symptoms
• Chronic Loneliness and Alienation

NOTE:
You can use this as a weapon to hurt me, judge me, and turn it against me.
Or you can choose to understand what I carry, show kindness,
and earn the rarest thing I give: my trust.

STATUS: SUBJECT NO LONGER HIDING
  `
};

/* PANEL INTERACTION */
document.querySelectorAll(".entry.unlocked").forEach(entry => {
  entry.onclick = () => {
    const key = entry.dataset.view;
    dataContent.textContent = DATA[key] || "NO DATA";
  };
});

/* DENIED */
document.querySelectorAll(".entry.denied").forEach(entry => {
  entry.onclick = () => {
    dataContent.textContent = "ACCESS DENIED\nINSUFFICIENT AUTHORIZATION LEVEL";
  };
});
