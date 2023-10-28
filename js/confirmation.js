const confirm_url = 'http://127.0.0.1:8000/api/confirm';
const auth_url = 'http://127.0.0.1:8000/api/auth';

const token = localStorage.getItem('access_token');
const confirmation = localStorage.getItem('confirmation');

async function callAPI( url, method, body, headers){

    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
    });

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
            window.location.href = 'login.html';

        } else {
            window.location.href = 'index.html';
        }
        
    }

    if (confirmation != 'true'){
        window.location.href = 'login.html';
    }
}

checkAuth();

const email = localStorage.getItem('email');
const password1 = localStorage.getItem('password1');
const password2 = localStorage.getItem('password2');
const username = localStorage.getItem('username');



async function confirm() {
    const codeField = document.getElementById("confirmation_code")

    const error_elem = document.getElementById("error-input");
    
    if (codeField.value.toString().length != 6) {
        error_elem.textContent = "Код должен состоять из 6 цифр!";
        return;
    } else {
        error_elem.textContent = "";
    }

    const data = {
        email: email,
        password1: password1,
        password2: password2,
        username: username,
        confirmation_code : codeField.value
    };

    if (email == null || password1 == null || password2 == null || username == null){
        alert('Ошибка при регистрации');
        window.location.href = 'register.html';
    }

    const headers = {
        'Content-Type': 'application/json'
    }

    const response = await callAPI(confirm_url, 'POST', data, headers);

    if (response.status == 200) {
        const data = await response.json();

        localStorage.removeItem('email');
        localStorage.removeItem('password1');
        localStorage.removeItem('password2');
        localStorage.removeItem('username');
        localStorage.removeItem('confirmation');

        localStorage.setItem("registrationSuccess", data['status'])

        window.location.href = 'login.html';

    } else {
        const errorResponse = await response.json();
        error_elem.textContent = errorResponse.detail;
    }
}