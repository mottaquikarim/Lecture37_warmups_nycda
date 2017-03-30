(function() {

    const GET = (url = null) => {
        return new Promise((resolve, reject) => {
            if (url === null) {
                reject('URL not valid');
            }

            const http = new XMLHttpRequest();
            http.open('GET', url);

            http.onload = () => {
                try {
                    const jsonData = JSON.parse(http.responseText);
                    resolve(jsonData);
                } catch (e) {
                    reject(e);
                }
            } // onload

            http.send();
        });
    }

    const templateName = document.querySelector('body').getAttribute('data-template-name');

    if (templateName === 'home') {
        GET('/api/info')
            .then((data) => {
                if (!data.success) {
                    window.location.href = '/login.html';
                }

                const title = document.querySelector('.js-title');
                if (title !== null) { 
                    title.innerHTML = data.message;
                }
            })
            .catch((e) => {
                alert(e);
            });
    }
    else if (templateName === 'login') {
        // handle stuff with js-login here
    }



})();
