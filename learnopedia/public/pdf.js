document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const username = localStorage.getItem('userName');
    if (username) {
        showWelcomeMessage(username);
    }
});

// Login Function
document.getElementById('login-btn').addEventListener('click', function() {
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");
    const phone = prompt("Enter your phone number:");
    const age = prompt("Enter your age:");
    const study = prompt("Enter your current field of study:");
    const dob = prompt("Enter your date of birth:");
    const profilePic = prompt("Enter the URL of your profile picture:");

    // Store user data in localStorage
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPhone', phone);
    localStorage.setItem('userAge', age);
    localStorage.setItem('userStudy', study);
    localStorage.setItem('userDob', dob);
    localStorage.setItem('profilePic', profilePic);

    // Show welcome message and toggle login/logout buttons
    showWelcomeMessage(name);
});

// Logout Function
document.getElementById('logout-btn').addEventListener('click', function() {
    // Clear user data from localStorage
    localStorage.clear();
    // Reset UI for logged-out state
    document.getElementById('welcome-message').style.display = 'none';
    document.getElementById('login-btn').style.display = 'inline';
    document.getElementById('logout-btn').style.display = 'none';
});

// Function to display the welcome message with the user's name
function showWelcomeMessage(name) {
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.innerHTML = `Welcome, <span id="user-name">${name}</span>`;
    welcomeMessage.style.display = 'inline';
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'inline';
}

// PDF Generation on "My Data" Button Click
document.getElementById('my-data-btn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Retrieve stored profile data
    const name = localStorage.getItem('userName') || "N/A";
    const email = localStorage.getItem('userEmail') || "N/A";
    const phone = localStorage.getItem('userPhone') || "N/A";
    const age = localStorage.getItem('userAge') || "N/A";
    const study = localStorage.getItem('userStudy') || "N/A";
    const dob = localStorage.getItem('userDob') || "N/A";
    const profilePic = localStorage.getItem('profilePic') || null;

    // Add text data to the PDF
    doc.text(`Name: ${name}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Phone: ${phone}`, 10, 30);
    doc.text(`Age: ${age}`, 10, 40);
    doc.text(`Study: ${study}`, 10, 50);
    doc.text(`Date of Birth: ${dob}`, 10, 60);

    // If a profile picture exists, add it to the PDF
    if (profilePic) {
        const img = new Image();
        img.onload = function() {
            doc.addImage(img, 'JPEG', 10, 70, 40, 40);
            doc.save('profile-data.pdf'); // Save the PDF
        };
        img.src = profilePic;
    } else {
        doc.save('profile-data.pdf'); // Save the PDF without image
    }
});
