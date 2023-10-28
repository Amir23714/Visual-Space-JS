const login_url = 'http://127.0.0.1:8000/api/login';
const auth_url = 'http://127.0.0.1:8000/api/auth';
const sendResetToken_url = "http://127.0.0.1:8000/api/send_reset_code";

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

        } else {
            window.location.href = 'index.html';
        }
        
    }
}

checkAuth();

document.addEventListener('DOMContentLoaded', async function() {
    if (localStorage.getItem("registrationSuccess")){
        const error_elem = document.getElementById("error-input");
        error_elem.value = localStorage.getItem("registrationSuccess");
        localStorage.removeItem('registrationSuccess');
    }
});

async function login() {
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password1");

    const error_elem = document.getElementById("error-input");

    const data = {
        email: emailField.value,
        password: passwordField.value
    };

    const headers = {
        'Content-Type': 'application/json'
    }

    const response = await callAPI(login_url, 'POST', data, headers);
    
    if (response.status == 200) {
        const data = await response.json();
        const token = data['token'];
        localStorage.setItem('access_token', token);
        window.location.href = 'index.html';

    } else {
        const errorResponse = await response.json();
        error_elem.textContent = errorResponse.detail;
    }
}

async function forgotPassword(){
    const passwordField = document.getElementById("password1");
    passwordField.style.display = "none";

    const submitField = document.getElementById("submitButton");
    const resetField = document.getElementById("resetButton");

    resetField.style.display = "none";  
    submitField.innerText = "Изменить пароль";
    submitField.onclick = async function(){
        const error_elem = document.getElementById("error-input");

        const emailField = document.getElementById("email");
        if (!emailField.checkValidity()){
            error_elem.textContent = "Некорректный почтовый адрес";
            return;
        } 
        console.log(emailField.value);
        const data = {
            'email': emailField.value
           
        };
    
        const headers = {
            'Content-Type': 'application/json'
        }

        const response = await callAPI(sendResetToken_url, 'POST', data, headers);
    
        if (response.status == 200) {
            error_elem.textContent = "На вашу почту отправлено письмо"
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 2000);

        } else {
            const errorResponse = await response.json();
            console.log(errorResponse);
            error_elem.textContent = errorResponse.detail;
        }
    }

}
