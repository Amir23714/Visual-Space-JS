const register_url = 'http://127.0.0.1:8000/api/register';
const auth_url = 'http://127.0.0.1:8000/api/auth';

const token = localStorage.getItem('access_token');

async function callAPI( url, method, body, headers){

    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
    });
    console.log(response.status);

    return response
}

async function checkAuth(){

    if (token) {

        headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }

        const response = await callAPI(auth_url, "POST", null, headers);
       
        if (response.status != 200) {
            
            alert("Ваша сессия неактивна/истекла. Авторизуйтесь повторно")
            localStorage.removeItem('access_token');
            window.localStorage.href = 'login.html';

        } else {
            window.location.href = 'index.html';
        }
        
    }
}

function validateInput(){

    const usernameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const password1Field = document.getElementById("password1");
    const password2Field = document.getElementById("password2");
    const error_elem = document.getElementById("error-input");

    if (!usernameField.checkValidity()) {
        error_elem.textContent = "Некорректное имя пользователя";
        return true;
    } else {
        error_elem.textContent = "";
    }

    if (!emailField.checkValidity()) {
        error_elem.textContent = "Некорректный адрес электронной почты";
        return true;
    } else {
        error_elem.textContent = "";
    }

    if (!password1Field.checkValidity()) {
        error_elem.textContent = "Пароль должен быть не менее 6 символов";
        return true;
    } else {
        error_elem.textContent = "";
    }

    if (password1Field.value !== password2Field.value) {
        error_elem.textContent = "Пароли не совпадают";
        return true;
    } else {
        error_elem.textContent = "";
    }

    return false;
}

checkAuth();

async function register() {
    const usernameField = document.getElementById("username");
    const emailField = document.getElementById("email");
    const password1Field = document.getElementById("password1");
    const password2Field = document.getElementById("password2");

    const error_elem = document.getElementById("error-input");

    if (validateInput()){
        return;
    }

    const data = {
        email: emailField.value,
        password1: password1Field.value,
        password2: password2Field.value,
        username: usernameField.value
    };

    const headers = {
        'Content-Type': 'application/json'
    }

    const response = await callAPI(register_url, 'POST', data, headers);

    if (response.status === 200) {
        const data = await response.json();
        error_elem.textContent = data['status']

        localStorage.setItem('confirmation', 'true');
        localStorage.setItem('email', emailField.value);
        localStorage.setItem('password1', password1Field.value);
        localStorage.setItem('password2', password2Field.value);
        localStorage.setItem('username', usernameField.value);

        window.location.href = 'confirmation.html';

    } else {
        const errorResponse = await response.json();
        error_elem.textContent = errorResponse.detail;
    }
}
