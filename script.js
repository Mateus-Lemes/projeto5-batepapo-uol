let name = null;
name = prompt("Bem-vindo ao bate-papo Uol! Qual seu lindo nome?");
let nameSent = {
    name: name
}
// enviar nome para o servidor
const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nameSent);
    promise.then(done);
    promise.catch(failed);


function done(see) {
    console.log(see.status);
}

function failed(fail) {
    while (fail.response.status == 400) {
        name = prompt("Nome em uso! Escolha outro.");
    }
}

// verificar status de online
function onOff() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nameSent);
    promise.then(done);
    promise.catch(failed);
}
setInterval (onOff, 5000);
























function startMenu() {
    const aside = document.querySelector("aside");
    aside.classList.remove("hidden");
}


function select(selected) {
    const icon = selected.querySelector(".check");
        icon.classList.toggle("hidden")
}