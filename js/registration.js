const api_url = 'http://127.0.0.1:8000/api/register';

const token = localStorage.getItem('access_token');

if (token) {
    window.location.href = 'index.html';
}

async function register() {
    const usernameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const password1Field = document.getElementById("password1");
    const password2Field = document.getElementById("password2");

    const error_elem = document.getElementById("error-input");

    if (!usernameField.checkValidity()) {
        error_elem.textContent = "Некорректное имя пользователя";
        return;
    } else {
        error_elem.textContent = "";
    }

    if (!emailField.checkValidity()) {
        error_elem.textContent = "Некорректный адрес электронной почты";
        return;
    } else {
        error_elem.textContent = "";
    }

    if (!password1Field.checkValidity()) {
        error_elem.textContent = "Пароль должен быть не менее 6 символов";
        return;
    } else {
        error_elem.textContent = "";
    }

    if (password1Field.value !== password2Field.value) {
        error_elem.textContent = "Пароли не совпадают";
        return;
    } else {
        error_elem.textContent = "";
    }

    const data = {
        email: emailField.value,
        password1: password1Field.value,
        password2: password2Field.value,
        username: usernameField.value
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
        window.location.href = 'login.html';

    } else {
        const errorResponse = await response.json();
        error_elem.textContent = errorResponse.detail;
    }
}
