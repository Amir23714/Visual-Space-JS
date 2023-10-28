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

document.addEventListener('DOMContentLoaded', function() {

    const logoutLink = document.getElementById('logout-link');

    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem('access_token');
        window.location.href = 'login.html';
    });

    const linksJSON = localStorage.getItem('links');

    if (linksJSON) {
        const links = JSON.parse(linksJSON);

        const imageUrlsContainer = document.getElementById('image_urls');

        links.forEach((link, index) => {
            if (index < 5) {
                const a = document.createElement('a');
                a.className = 'img-href';
                a.href = link;
                a.textContent = 'Ссылка ' + (index + 1);

                imageUrlsContainer.appendChild(a);
            }
        });
    }
});




