    fetch('https://cors-anywhere.herokuapp.com/https://yandex.ru')
    .then(response => {
        return response.text();
    }).then(data => {
        const html = document.querySelector('.container');
        html.innerHTML = data;
        console.log(data);
    })