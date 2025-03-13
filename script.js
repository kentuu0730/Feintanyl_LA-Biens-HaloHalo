document.addEventListener('DOMContentLoaded', function() {
    const loginPage = document.getElementById('login-page');
    const loginBtn = document.getElementById('login-btn');

    const emailInput = document.getElementById('username'); // Change from username to email
    const passwordInput = document.getElementById('password');

    // Initially show the login page
    loginPage.style.display = 'flex';

    // Login button event
    loginBtn.addEventListener('click', async function() {
        const email = emailInput.value.trim(); // Change from username to email
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch('/api/employees/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) // Fix field names
            });

            const data = await response.json();
            if (response.ok) {
                // Redirect to main page on successful login
                window.location.href = '/dashboard'; // Change to the actual main page
            } else {
                alert(data.message || "Invalid credentials.");
            }
        } catch (error) {
            console.error('Login error:', error);
            alert("An error occurred. Please try again.");
        }
    });


});
