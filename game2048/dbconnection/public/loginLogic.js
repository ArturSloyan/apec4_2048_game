document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 

    try {
        // send request to server
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        });

        // convert response to json
        const result = await response.json(); 

        if (response.ok) {
            // login successful
            document.getElementById('message').textContent = "Login successful!";
            document.getElementById('message').style.color = 'green';
            
            window.location.href = '/dashboard.html'; // Example: Forwardingto a Dashboard-Page
        } else if (response.status === 404) {
            // User not found
            document.getElementById('message').textContent = result.message || "User not found.";
            document.getElementById('message').style.color = 'red';
        } else if (response.status === 401) {
            // Wrong Password
            document.getElementById('message').textContent = result.message || "Incorrect password.";
            document.getElementById('message').style.color = 'red';
        } else {
            // General error
            document.getElementById('message').textContent = result.message || "Failed to login. Please try again.";
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        // Request Error
        document.getElementById('message').textContent = "Es gab einen Fehler: " + error.message;
        document.getElementById('message').style.color = 'red';
    }
});
