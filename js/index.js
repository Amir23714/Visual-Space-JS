const token = localStorage.getItem('access_token');

const auth_url = 'http://127.0.0.1:8000/api/auth';
const api_url = 'http://127.0.0.1:8000/api/get_image';

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

    if (!token) {
        window.location.href = 'register.html';
    } else {

        headers = {
            'Content-Type': 'application/json',
            'Authorization': token
        }

        const response = await callAPI(auth_url, "POST", null, headers);
    
        if (response.status != 200) {
            
            alert("Ваша сессия неактивна/истекла. Авторизуйтесь повторно")
            localStorage.removeItem('access_token');
            window.location.href = 'login.html';
        }

    }
}

checkAuth();

document.addEventListener('DOMContentLoaded', async function() {

    const logoutLink = document.getElementById('logout-link');

    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('access_token');
        window.location.href = 'login.html';
    });


});


async function get_api() {
    
    const promptField = document.getElementById("main-prompt");

    const prompt = {
        prompt : promptField.value,
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    const response = await callAPI(api_url, 'POST', prompt, headers);

    if (response.status == 200) {
        const data = await response.json();

        const links = data['links'];

        localStorage.setItem('links', JSON.stringify(links));
        window.location.href = 'response.html';

    } else {
        const errorResponse = await response.json();
        console.error('Ошибка при получении данных:', errorResponse.detail);
    }
}
