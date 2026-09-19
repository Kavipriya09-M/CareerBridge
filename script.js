/* PlacementPro - Frontend Review 1 */

const studentNav = [
  ["Dashboard", "student.html", "⌂"], ["My Tasks", "student-tasks.html", "📝"], ["Placement Events", "student-events.html", "📅"],
  ["Aptitude Practice", "student-practice.html", "🧠"], ["Coding Practice", "student-practice.html", "💻"], ["My Performance", "student-performance.html", "📊"],
  ["Company Drives", "student-drives.html", "🏢"], ["Notifications", "student-notifications.html", "🔔"], ["Profile", "student-profile.html", "👤"]
];

const cdcNav = [
  ["Dashboard", "cdc.html", "⌂"], ["Students", "cdc-students.html", "👨‍🎓"], ["Tasks", "cdc-tasks.html", "📝"], ["Create Task", "cdc.html", "➕"],
  ["Placement Events", "cdc-events.html", "📅"], ["Company Drives", "cdc-drives.html", "🏢"], ["Submissions", "cdc-submissions.html", "📥"],
  ["Performance", "cdc-performance.html", "📊"], ["Reports", "cdc-reports.html", "📈"], ["Notifications", "cdc-notifications.html", "🔔"]
];

const tasks = [
  { title: "Aptitude Assessment", type: "Quantitative Aptitude • 20 Questions", duration: "30 Minutes", deadline: "Today, 6:00 PM", status: "pending", icon: "📝" },
  { title: "Coding Challenge", type: "Arrays & Strings • 2 Problems", duration: "60 Minutes", deadline: "Tomorrow, 5:00 PM", status: "upcoming", icon: "💻" },
  { title: "Mock Interview Preparation", type: "HR & Technical Interview", duration: "20 Minutes", deadline: "28 September", status: "completed", icon: "🎤" },
  { title: "Technical Quiz", type: "DBMS • OS • OOP", duration: "25 Minutes", deadline: "30 September", status: "completed", icon: "🧠" }
];

const events = [
  { date: "25", month: "SEP", title: "Aptitude Assessment", detail: "III Year • CSE", time: "10:00 AM", state: "Active" },
  { date: "28", month: "SEP", title: "Coding Challenge", detail: "III Year • CSE / IT", time: "2:00 PM", state: "Upcoming" },
  { date: "30", month: "SEP", title: "Mock Interview", detail: "IV Year • All Departments", time: "10:00 AM", state: "Upcoming" },
  { date: "03", month: "OCT", title: "Technical Quiz", detail: "II Year • CSE / AIML", time: "11:00 AM", state: "Upcoming" }
];

function navHTML(role) {
  const items = role === "cdc" ? cdcNav : studentNav;
  const path = location.pathname.split("/").pop() || "index.html";
  let html = `<div class="side-brand"><span class="brand-mark">P</span><div><b>PlacementPro</b><small>${role === "cdc" ? "CDC Portal" : "Student Portal"}</small></div></div>`;
  html += `<div class="side-menu"><span class="menu-label">MAIN MENU</span>`;
  items.forEach((item, i) => {
    const active = path === item[1] ? "active" : "";
    html += `<a class="side-link ${active}" href="${item[1]}"><span>${item[2]}</span>${item[0]}</a>`;
  });
  if (role === "student") html += `<span class="menu-label extra">ACCOUNT</span>`;
  else html += `<span class="menu-label extra">MANAGEMENT</span>`;
  html += `</div><button class="logout-button" onclick="logout()">↪ Logout</button>`;
  return html;
}

function initSidebar() {
  const side = document.getElementById("sidebar");
  if (side) side.innerHTML = navHTML(document.body.dataset.role || "student");
}

function openRoleModal() { const m = document.getElementById("roleModal"); if (m) m.classList.add("show"); }
function openLogin(role) {
  closeModals();
  const m = document.getElementById("loginModal");
  if (!m) return;
  m.dataset.role = role;
  document.getElementById("loginTitle").textContent = role === "cdc" ? "CDC Login" : "Student Login";
  document.getElementById("loginIcon").textContent = role === "cdc" ? "C" : "P";
  document.getElementById("demoText").textContent = role === "cdc" ? "cdc@placementpro.com / cdc123" : "student@placementpro.com / student123";
  m.classList.add("show");
}
function closeModals() { document.querySelectorAll(".modal").forEach(m => m.classList.remove("show")) }

function handleLogin(e) {
  e.preventDefault();
  const m = document.getElementById("loginModal");
  const role = m.dataset.role;
  const email = document.getElementById("loginEmail").value.trim();
  const pass = document.getElementById("loginPassword").value.trim();
  const ok = (role === "student" && email === "student@placementpro.com" && pass === "student123") ||
    (role === "cdc" && email === "cdc@placementpro.com" && pass === "cdc123");
  const err = document.getElementById("loginError");
  if (!ok) { err.textContent = "Invalid demo credentials. Please use the credentials shown below."; return; }
  localStorage.setItem("placementUser", JSON.stringify({ role, email }));
  window.location.href = role === "cdc" ? "cdc.html" : "student.html";
}

function logout() { localStorage.removeItem("placementUser"); window.location.href = "index.html"; }

function taskCard(t) {
  const label = t.status === "completed" ? "Completed" : t.status === "pending" ? "Pending" : "Upcoming";
  return `<article class="task-row"><span class="large-task-icon">${t.icon}</span><div class="task-content"><h3>${t.title}</h3><p>${t.type}</p><small>⏱ ${t.duration} &nbsp; • &nbsp; 📅 ${t.deadline}</small></div><div class="task-side"><mark class="pill ${t.status}">${label}</mark><button class="small-btn" onclick="demoAction('${t.title}')">${t.status === "completed" ? "✓ Done" : t.status === "pending" ? "Start Task" : "View Task"}</button></div></article>`;
}

function eventCard(e) {
  return `<article class="event-card-full"><div class="date-box"><b>${e.date}</b><small>${e.month}</small></div><div class="event-info"><h3>${e.title}</h3><p>${e.detail}</p><small>📅 ${e.time}</small></div><mark class="pill ${e.state === "Active" ? "done" : "neutral"}">${e.state}</mark></article>`;
}

function renderData() {
  const dashTasks = document.getElementById("dashboardTasks");
  if (dashTasks) dashTasks.innerHTML = tasks.slice(0, 3).map(taskCard).join("");
  const allTasks = document.getElementById("allTasks");
  if (allTasks) allTasks.innerHTML = tasks.map(taskCard).join("");
  const dashEvents = document.getElementById("dashboardEvents");
  if (dashEvents) dashEvents.innerHTML = events.slice(0, 3).map(eventCard).join("");
  const allEvents = document.getElementById("allEvents");
  if (allEvents) allEvents.innerHTML = events.map(eventCard).join("");
  const cdcEvents = document.getElementById("cdcUpcomingEvents");
  if (cdcEvents) cdcEvents.innerHTML = events.slice(0, 3).map(eventCard).join("");
  const cdcAllEvents = document.getElementById("cdcAllEvents");
  if (cdcAllEvents) cdcAllEvents.innerHTML = events.map(eventCard).join("");
  const cdcTasks = document.getElementById("cdcTasks");
  if (cdcTasks) {
    const stored = JSON.parse(localStorage.getItem("placementTasks") || "[]");
    const custom = stored.map(x => ({ title: x.title, type: x.type + " • " + x.year, duration: x.duration, deadline: x.deadline, status: "upcoming", icon: "📝" }));
    cdcTasks.innerHTML = [...custom, ...tasks].map(taskCard).join("");
  }
}

function filterTasks(type, btn) {
  document.querySelectorAll(".filter").forEach(x => x.classList.remove("active"));
  if (btn) btn.classList.add("active");
  const data = type === "all" ? tasks : tasks.filter(t => t.status === type);
  const box = document.getElementById("allTasks");
  if (box) box.innerHTML = data.map(taskCard).join("");
}

function createTask(e) {
  e.preventDefault();
  const f = e.target;
  const item = {
    title: f.title.value, type: f.type.value, year: f.year.value,
    department: f.department.value, section: f.section.value,
    deadline: f.deadline.value, duration: f.duration.value
  };
  const arr = JSON.parse(localStorage.getItem("placementTasks") || "[]");
  arr.unshift(item);
  localStorage.setItem("placementTasks", JSON.stringify(arr));
  alert("Task assigned successfully!\n\n" + item.title + "\nTarget: " + item.year + " • " + item.department);
  f.reset();
}

function demoAction(name) { alert(name + " is available in the frontend prototype. This interaction will connect to the server/database in Review 2."); }

document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  renderData();
  document.querySelectorAll(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m) closeModals() }));
});