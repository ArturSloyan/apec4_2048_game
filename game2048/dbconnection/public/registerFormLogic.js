document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
            document.getElementById('message').textContent = "Erfolgreich registriert!";
            document.getElementById('message').style.color = 'green';
        } else {
            document.getElementById('message').textContent = result.message || "Fehler beim Registrieren. Bitte versuche es erneut.";
        }
    } catch (error) {
        document.getElementById('message').textContent = "Es gab einen Fehler: " + error.message;
        document.getElementById('message').style.color = 'red';
    }
});
