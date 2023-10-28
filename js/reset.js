const reset_url = 'http://127.0.0.1:8000/api/reset_password';
const verify_url = 'http://127.0.0.1:8000/api/verify_reset_code';

async function callAPI( url, method, body, headers){

    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
    });
    console.log(response.status);

    return response
}

const currentUrl = window.location.search;

const urlParams = new URLSearchParams(currentUrl);

const resetToken = urlParams.get("reset_token");

async function checkTokenPresense(){

    if (resetToken) {

        headers = {
            'Content-Type': 'application/json'
        }

        data = {
            reset_token : resetToken
        }

        const response = await callAPI(verify_url, "POST", data, headers);
       
        if (response.status != 200) {
            alert("Срок действия ссылки истек");
            window.location.href = 'login.html';
        }
        
    } else {
        alert("Срок действия ссылки истек");
        window.location.href = 'login.html';
    }
}

checkTokenPresense();

async function resetPassword() {
    const password1Field = document.getElementById("password1");
    const password2Field = document.getElementById("password2");

    const error_elem = document.getElementById("error-input");

    const data = {
        reset_token: resetToken,
        password1: password1Field.value,
        password2 : password2Field.value
    };

    const headers = {
        'Content-Type': 'application/json'
    }

    const response = await callAPI(reset_url, 'POST', data, headers);
    
    if (response.status == 200) {
        error_elem.textContent = "Пароль успешно изменен";

        setTimeout(function() {
            window.location.href = 'login.html';
        }, 2000);

    } else {
        const errorResponse = await response.json();
        error_elem.textContent = errorResponse.detail;
        
        setTimeout(function() {
            window.location.href = 'login.html';
        }, 2000);
    }
}
