/* ================= THEME TOGGLE ================= */
function toggleTheme() {
  document.body.dataset.theme =
    document.body.dataset.theme === "light" ? "dark" : "light";
}

/* ================= ADMIN CONFIG ================= */
const ADMIN_PASSKEY = "alexshee@2026";
let isAdmin = localStorage.getItem("isAdmin") === "true";

/* SHOW ADMIN PANEL */
function showAdmin() {
  isAdmin = true;
  localStorage.setItem("isAdmin", "true");

  const adminPanel = document.getElementById("adminPanel");
  adminPanel.style.display = "block";
  adminPanel.scrollIntoView({ behavior: "smooth" });

  renderJobs();
}

/* LOGOUT ADMIN (OPTION 1 FIX) */
function logoutAdmin() {
  isAdmin = false;
  localStorage.removeItem("isAdmin");

  const adminPanel = document.getElementById("adminPanel");
  adminPanel.style.display = "none";

  alert("Admin logged out");
}

/* ================= DESKTOP ACCESS ================= */
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
    const pass = prompt("Enter admin passkey:");
    if (pass === ADMIN_PASSKEY) {
      showAdmin();
      alert("Admin access granted");
    } else {
      alert("Wrong passkey");
    }
  }
});

/* ================= MOBILE ACCESS (LONG PRESS) ================= */
let pressTimer = null;

document.addEventListener("touchstart", () => {
  pressTimer = setTimeout(() => {
    const pass = prompt("Enter admin passkey:");
    if (pass === ADMIN_PASSKEY) {
      showAdmin();
      alert("Admin access granted");
    } else {
      alert("Wrong passkey");
    }
  }, 1500); // 1.5 seconds long press
});

document.addEventListener("touchend", () => {
  clearTimeout(pressTimer);
});

/* ================= JOB SYSTEM ================= */
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

function renderJobs() {
  const list = document.getElementById("jobList");
  list.innerHTML = "";

  jobs.forEach((job, i) => {
    list.innerHTML += `
      <div class="job">
        <img src="${job.image}">
        <div>
          <h3>${job.title}</h3>
          <p>${job.desc}</p>
          ${isAdmin ? `<button onclick="deleteJob(${i})">Delete</button>` : ""}
        </div>
      </div>
    `;
  });
}

function addJob() {
  if (!isAdmin) return alert("Unauthorized");

  const reader = new FileReader();
  reader.onload = () => {
    jobs.push({
      title: jobTitle.value,
      desc: jobDesc.value,
      image: reader.result
    });

    localStorage.setItem("jobs", JSON.stringify(jobs));
    renderJobs();

    jobTitle.value = "";
    jobDesc.value = "";
    jobImage.value = "";
  };

  if (jobImage.files[0]) {
    reader.readAsDataURL(jobImage.files[0]);
  }
}

function deleteJob(i) {
  if (!isAdmin) return;

  if (confirm("Delete this job?")) {
    jobs.splice(i, 1);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    renderJobs();
  }
}

/* ================= MOBILE MENU ================= */
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

/* ================= AUTO RESTORE ADMIN ================= */
if (isAdmin) {
  const adminPanel = document.getElementById("adminPanel");
  adminPanel.style.display = "block";
}

/* INITIAL LOAD */
renderJobs();
