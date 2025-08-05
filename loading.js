window.onload = () => {
  setTimeout(() => {
    // Hide loader
    document.getElementById('loader').style.display = 'none';

    // Show preference section with transition
    const preferenceSection = document.getElementById('preference');
    preferenceSection.classList.add('active');
  }, 3000); // Loader duration: 3 seconds
};

function chooseRole(role) {
  if (role === "student") {
    // Redirect to student login page
    window.location.href = "file:///C:/Users/Akanksha/career/login-auth.html";
  } else if (role === "mentor") {
    // Redirect to mentor login page
    window.location.href = "file:///C:/Users/Akanksha/career/mentor-auth.html";
  }
}
