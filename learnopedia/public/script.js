// Handle form switching between login, register, and forgot password forms
document.getElementById("open-register").addEventListener("click", () => {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
  });
  
  document.getElementById("open-login").addEventListener("click", () => {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  });
  
  document.getElementById("open-forgot-password").addEventListener("click", () => {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("forgot-password-form").style.display = "block";
  });
  
  document.getElementById("open-login-forgot").addEventListener("click", () => {
    document.getElementById("forgot-password-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
  });
  
  // Login form submission
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    const result = await response.json();
  
    if (result.success) {
      // Login Successful
      alert("Login Successful!");
      localStorage.setItem('token', result.token);
      localStorage.setItem('userName', result.user.name);
  
      // Hide the login form and show the welcome message
      document.getElementById("login-form").style.display = "none";
      document.getElementById("header-login-btn").style.display = "none";
      document.getElementById("header-logout-btn").style.display = "inline-block";
      document.getElementById("welcome-message").style.display = "inline-block";
      document.getElementById("welcome-message").innerText = `Welcome, ${result.user.name}`;
  
      // Enable all other page elements like categories
      document.getElementById("categories").style.display = "block"; // Example for category section
    } else {
      alert(result.message);
    }
  });
  
  // Register form submission
  document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
  
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
  
    const result = await response.json();
  
    if (result.success) {
      alert("Registration Successful!");
      document.getElementById("register-form").style.display = "none";
      document.getElementById("login-form").style.display = "block";
    } else {
      alert(result.message);
    }
  });
  
  // Forgot password form submission
  document.getElementById("forgot-password-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("forgot-email").value;
  
    const response = await fetch("/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  
    const result = await response.json();
  
    if (result.success) {
      alert("Reset link sent!");
    } else {
      alert(result.message);
    }
  });
  
  // Logout functionality
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  
    document.getElementById("header-login-btn").style.display = "inline-block";
    document.getElementById("header-logout-btn").style.display = "none";
    document.getElementById("welcome-message").style.display = "none";
  
    document.getElementById("categories").style.display = "none"; // Hide categories
    alert("You have logged out successfully.");
  }
  