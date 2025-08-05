const appointments = [
  {
    student: "Rahul Verma",
    date: "2025-08-01",
    time: "10:00",
    topic: "Career in AI",
    reason: "Want to learn AI for startup.",
    status: "Pending"
  },
  {
    student: "Sneha Joshi",
    date: "2025-08-02",
    time: "16:30",
    topic: "Resume Review",
    reason: "Internship preparation.",
    status: "Accepted"
  }
];

const appointmentsBody = document.getElementById("appointments-body");

function loadAppointments() {
  appointmentsBody.innerHTML = "";
  appointments.forEach((app, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${app.student}</td>
      <td>${app.date} @ ${app.time}</td>
      <td>${app.topic}</td>
      <td>${app.reason}</td>
      <td>${app.status}</td>
      <td>
        <button class="action-btn accept-btn" onclick="acceptSession(${index})">Accept</button>
        <button class="action-btn reject-btn" onclick="rejectSession(${index})">Reject</button>
      </td>
    `;
    appointmentsBody.appendChild(tr);
  });

  document.getElementById("total-sessions").textContent = appointments.length;
  document.getElementById("pending-requests").textContent = appointments.filter(a => a.status === "Pending").length;
}

function acceptSession(index) {
  appointments[index].status = "Accepted";
  loadAppointments();
}

let rejectIndex = -1;
function rejectSession(index) {
  rejectIndex = index;
  document.getElementById("allotModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("allotModal").style.display = "none";
}

function submitNewSession() {
  const date = document.getElementById("new-date").value;
  const time = document.getElementById("new-time").value;
  if (!date || !time) return alert("Please select both date and time.");

  appointments[rejectIndex] = {
    ...appointments[rejectIndex],
    date,
    time,
    status: "Rescheduled"
  };
  closeModal();
  loadAppointments();
}

document.querySelector(".dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

window.onload = loadAppointments;
