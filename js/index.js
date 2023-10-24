const token = localStorage.getItem('access_token');

if (!token) {
    window.location.href = 'register.html';
}

document.addEventListener('DOMContentLoaded', function() {

    const logoutLink = document.getElementById('logout-link');

    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('access_token');
        window.location.href = 'login.html';
    });


});


async function get_api() {
    const url = 'http://127.0.0.1:8000/api/get_image'
    const promptField = document.getElementById("main-prompt");

    const prompt = {
        prompt : promptField.value,
    }

    const response = await fetch(url, {
        method: 'POST',  // Используем метод POST
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prompt),
    });

    if (response.status === 200) {
        const data = await response.json();

        const links = data['links'];

        localStorage.setItem('links', JSON.stringify(links));
        window.location.href = 'response.html';

    } else {
        const errorResponse = await response.json();
        console.error('Ошибка при получении данных:', errorResponse.detail);
    }
}
