let name = null;
name = prompt("Bem-vindo ao bate-papo Uol! Qual seu lindo nome?");
let nameSent = {
    name: name
}
let messages = [];



// enviar nome para o servidor
const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nameSent);
    promise.then(done);
    promise.catch(failed);


function done(see) {
    console.log(see.status);
}

function failed(fail) {
    if (fail.response.status == 400) {
        name = prompt("Nome em uso! Escolha outro.");
        let nameSent = {
            name: name
        }
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", nameSent);
        promise.then(done);
        promise.catch(failed);
    }
}

// verificar status de online
function onOff() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nameSent);
    promise.then(done);
    promise.catch(failed);
}
setInterval (onOff, 5000);

// pegar as mensagens
const promiseMessages = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promiseMessages.then(takeMessages);

function takeMessages(promise){
    messages = promise.data;
    messages.forEach(showMessages);
}

// mostrar mensagens na tela
function showMessages(object) {
    let main = document.querySelector("main");
    if (object.type === "status") {
        main.innerHTML += `
        <div class="in-out">
            <p>(${object.time}) <b>${object.from}</b>: ${object.text}</p>
        </div> 
        `
    } else if (object.type === "private_message") {
        main.innerHTML += `
        <div class="reserved">
            <p>(${object.time}) <b>${object.from}</b> reservadamente para <b>${object.to}</b>: ${object.text}</p>
        </div> 
        `
    } else if (object.type === "message") {
        main.innerHTML += `
        <div class="in-out">
            <p>(${object.time}) <b>${object.from}</b>: ${object.text}</p>
        </div> 
        `
    }
}

























function startMenu() {
    const aside = document.querySelector("aside");
    aside.classList.remove("hidden");
}


function select(selected) {
    const icon = selected.querySelector(".check");
        icon.classList.toggle("hidden")
}