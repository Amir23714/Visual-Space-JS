const api_url = 'http://127.0.0.1:8000/api/login';

const token = localStorage.getItem('access_token');

if (token) {
    window.location.href = 'index.html';
}

async function login() {
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password1");

    const error_elem = document.getElementById("error-input");

    const data = {
        email: emailField.value,
        password: passwordField.value
    };

    const response = await fetch(api_url, {
        method: 'POST',  // Используем метод POST
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    if (response.status === 200) {
        const data = await response.json();
        const token = data['token'];
        localStorage.setItem('access_token', token);
        window.location.href = 'index.html';

    } else {
        const errorResponse = await response.json();
        error_elem.textContent = errorResponse.detail;
    }
}
