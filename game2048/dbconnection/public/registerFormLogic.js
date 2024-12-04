        const form = document.getElementById('registerForm');
        const messageElement = document.getElementById('message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    messageElement.style.color = 'green';
                    messageElement.textContent = data.message;
                    form.reset();
                } else {
                    messageElement.style.color = 'red';
                    messageElement.textContent = data.message || 'Failed to register!';
                }
            } catch (error) {
                messageElement.style.color = 'red';
                messageElement.textContent = 'Error: Could not connect to the server!';
            }
        });