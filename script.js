const errorScreen = document.getElementById("systemError");
const loadingScreen = document.getElementById("loadingScreen");
const terminal = document.getElementById("terminal");
const okBtn = document.getElementById("okBtn");
const loaderFill = document.getElementById("loaderFill");

okBtn.onclick = () => {
  errorScreen.classList.remove("active");
  loadingScreen.classList.add("active");

  let progress = 0;
  const timer = setInterval(() => {
    progress += Math.random() * 8;
    loaderFill.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(timer);
      loadingScreen.classList.remove("active");
      terminal.classList.add("active");
    }
  }, 120);
};

/* NAVIGATION */
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.target).classList.add("active");
  };
});

/* SHOW LOGIC */
document.getElementById("acceptBtn").onclick = () => {
  document.getElementById("choiceBox").classList.add("hidden");
  document.getElementById("socialBox").classList.remove("hidden");
};

document.getElementById("rejectBtn").onclick = () => {
  alert("CHOICE REJECTED.");
};
