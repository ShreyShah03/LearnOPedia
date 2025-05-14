// login.js

const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        localStorage.setItem('token', data.token); // Store token in localStorage
        localStorage.setItem('userName', data.user.name); // Optionally store user name
        window.location.href = '/profile.html'; // Redirect to profile page
      } else {
        document.getElementById('login-error').textContent = data.message;
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  
  document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
  