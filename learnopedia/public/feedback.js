// Login function
const login = async (email, password) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            // Save user ID and name to localStorage
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', data.name);
            alert('Login successful!');

            // Show the feedback section and hide the login form
            document.getElementById('feedbackSection').classList.remove('hidden');
            document.getElementById('loginForm').classList.add('hidden');

            // Fetch feedback after login
            fetchFeedback();
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login');
    }
};

// Feedback submission function
const submitFeedback = async (feedbackText) => {
    const userId = localStorage.getItem('userId'); // Get user ID from localStorage

    if (!userId) {
        alert('You need to log in before submitting feedback.');
        return;
    }

    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feedback: feedbackText }) // Include only feedback in the request body
        });

        const data = await response.json();
        if (response.ok) {
            alert('Feedback submitted successfully!');
            fetchFeedback(); // Fetch updated feedback list
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Error submitting feedback');
    }
};

// Function to fetch feedback and display it
const fetchFeedback = async () => {
    try {
        const response = await fetch('/api/feedback');
        const feedbacks = await response.json();

        const feedbackList = document.getElementById('feedbackList');
        feedbackList.innerHTML = ''; // Clear previous feedback
        feedbacks.forEach(feedback => {
            const feedbackItem = document.createElement('div');
            feedbackItem.className = 'feedback-item';
            feedbackItem.innerHTML = `
                <p><strong>${feedback.userId.name}</strong> <em>${new Date(feedback.createdAt).toLocaleString()}</em></p>
                <p>${feedback.feedback}</p>
            `;
            feedbackList.prepend(feedbackItem); // Add new feedback at the top
        });
    } catch (error) {
        console.error('Error fetching feedback:', error);
    }
};
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});

document.getElementById('feedbackForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const feedbackText = document.getElementById('feedback').value;
    submitFeedback(feedbackText);
    document.getElementById('feedback').value = '';
});