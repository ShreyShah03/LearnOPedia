// Login function to authenticate user and store userId in localStorage
async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem('userId', result.userId); // Store userId for authentication
            document.getElementById('login').style.display = 'none';
            document.getElementById('discussion-section').style.display = 'block';
            loadDiscussions(); // Load discussions after login
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

// Post question to the discussion
async function postQuestion() {
    const question = document.getElementById('question').value;
    const userId = localStorage.getItem('userId');

    try {
        const response = await fetch('http://localhost:5000/api/discussions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question, userId }),
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById('question').value = ''; // Clear input
            loadDiscussions(); // Reload discussions after posting
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error posting question:", error);
    }
}

// Load discussions with answers
async function loadDiscussions() {
    try {
        const response = await fetch('http://localhost:5000/api/discussions');
        const discussions = await response.json();
        const container = document.getElementById('discussion-container');
        container.innerHTML = '';

        discussions.forEach(discussion => {
            const discussionElement = document.createElement('div');
            discussionElement.className = 'discussion';
            discussionElement.innerHTML = `
                <h3>${discussion.question} <small>by ${discussion.createdBy.name}</small></h3>
                <div class="answers">
                    ${discussion.answers.map(answer => `
                        <div class="answer">
                            <p>${answer.answer} <small>by ${answer.postedBy.name} at ${new Date(answer.createdAt).toLocaleString()}</small></p>
                        </div>
                    `).join('')}
                </div>
                <input type="text" placeholder="Your answer..." id="answer-${discussion._id}">
                <button onclick="postAnswer('${discussion._id}')">Post Answer</button>
            `;
            container.appendChild(discussionElement);
        });
    } catch (error) {
        console.error("Error loading discussions:", error);
    }
}

// Post answer to a specific discussion
async function postAnswer(discussionId) {
    const answerInput = document.getElementById(`answer-${discussionId}`);
    const answer = answerInput.value;
    const userId = localStorage.getItem('userId');

    try {
        const response = await fetch(`http://localhost:5000/api/discussions/${discussionId}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer, userId }),
        });

        const result = await response.json();
        if (response.ok) {
            answerInput.value = ''; // Clear input
            loadDiscussions(); // Reload discussions after posting
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Error posting answer:", error);
    }
}

// Automatically load discussions on page load
window.onload = loadDiscussions;
