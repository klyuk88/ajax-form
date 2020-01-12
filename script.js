//Form

let form = document.querySelectorAll('form');

for (let i = 0; i < form.length; i++) {

    form[i].addEventListener('submit', (e) => {
        e.preventDefault();
        let input = form[i].querySelectorAll('input'),
            statusMessage = document.createElement('div'),
            message = {
                loading: 'Загрузка...',
                sacces: 'Успешно',
                fail: 'Ошибка'
            };

        form[i].appendChild(statusMessage);

        let request = new XMLHttpRequest();

        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');


        let formData = new FormData(form[i]);
        let obj = {};

        formData.forEach((value, key) => {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);
        request.send(json);
        request.addEventListener('readystatechange', () => {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.sacces;
            } else {
                statusMessage.innerHTML = message.fail;
            }
            for (let index = 0; index < input.length; index++) {
                input[index].value = '';
            }

        });

    });

}
// end form