document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('passwordagain').value;

    if (password !== password2) {
        document.getElementById('message').textContent = "Passwords do not match.";
        document.getElementById('message').style.color = 'red';
        return; 
    }

 try {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            })            
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('message').textContent = "User registered successfully!";
            document.getElementById('message').style.color = 'green';            
        } else if (response.status === 409) {
            document.getElementById('message').textContent = result.message || "Username already exists.";
            document.getElementById('message').style.color = 'red';
        } else if (response.status === 410) {
            document.getElementById('message').textContent = result.message || "E-Mail-Address already exists.";
            document.getElementById('message').style.color = 'red';            
        } else {
            document.getElementById('message').textContent = result.message || "Failed to register. Please try again.";
        }
    } catch (error) {
        document.getElementById('message').textContent = "Es gab einen Fehler: " + error.message;
        document.getElementById('message').style.color = 'red';
    }
});
