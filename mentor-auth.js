const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "792375564264-pbqpma68qhpr16m9idpfmli9sga00hbf.apps.googleusercontent.com",  
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("googleSignInBtn"), // 👈 Your button's ID
    { theme: "outline", size: "large" } // Optional styling
  );
};

function handleCredentialResponse(response) {
  console.log("Google ID token: ", response.credential);
  // You can send this to your backend later for real login.
  alert("Logged in with Google!");
}

// ✅ Add redirection when SIGN IN (class="b2") is clicked
document.querySelector('.b2').addEventListener('click', function(e) {
  e.preventDefault(); // prevent default form submission
  window.location.href = "http://127.0.0.1:5500/mentor-dashboard.html"; // ✅ replace with your real destination
});

// ✅ Add redirection when SIGN UP (class="b1") is clicked
document.querySelector('.b1').addEventListener('click', function(e) {
  e.preventDefault();
  window.location.href = "http://127.0.0.1:5500/mentor-dashboard.html"; // ✅ replace with your real destination
});
