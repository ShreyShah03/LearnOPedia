// script.js

async function fetchProfileData() {
    const token = localStorage.getItem("token");

    if (!token) {
        // Redirect to login if token is not present
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch("/profile", {
            headers: {
                "Authorization": token
            }
        });

        const result = await response.json();

        if (result.success) {
            // Populate profile fields with fetched user data
            document.getElementById("user-name").textContent = result.user.name;
            document.getElementById("user-email").textContent = result.user.email;
        } else {
            alert(result.message);
            window.location.href = "/login.html"; // Redirect if not authenticated
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        alert("An error occurred. Please try again later.");
        window.location.href = "/login.html"; // Redirect on error
    }
}

// Fetch profile data when the page loads
window.addEventListener("DOMContentLoaded", fetchProfileData);
