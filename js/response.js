const token = localStorage.getItem('access_token');

if (!token) {
    window.location.href = 'register.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('access_token');

    if (!token) {
        window.location.href = 'register.html';
    }

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
            if (index < 5) { // Проверка на максимальное количество (5)
                const a = document.createElement('a');
                a.className = 'img-href';
                a.href = link;
                a.textContent = 'Ссылка ' + (index + 1); // Замените на текст ссылки

                imageUrlsContainer.appendChild(a);
            }
        });
    }
});




