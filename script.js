let name = prompt("Bem-vindo ao bate-papo Uol! Qual seu lindo nome?");
let nameSent = {
    name: name
}
let messages = [];
let main = document.querySelector("main");
let objectSendMessage = {};


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




function onOff() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", nameSent);
    promise.then(done);
    promise.catch(failed);
}
setInterval (onOff, 5000);




const promiseMessages = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promiseMessages.then(takeMessages);

    
function takeMessages(promise){
    main.innerHTML = "";
    messages = promise.data;
    messages.forEach(showMessages);
}



function showMessages(object) {
    
    if (object.type === "status") {
        main.innerHTML += `
        <div class="in-out" data-identifier="message">
            <p>(${object.time}) <b>${object.from}</b>: ${object.text}</p>
        </div> 
        `
    } else if ((object.type === "private_message") && ((name == object.from) || (name == object.to))) {
        main.innerHTML += `
        <div class="reserved" data-identifier="message">
            <p>(${object.time}) <b>${object.from}</b> reservadamente para <b>${object.to}</b>: ${object.text}</p>
        </div> 
        `
    } else if (object.type === "message") {
        main.innerHTML += `
        <div class="normal" data-identifier="message">
            <p>(${object.time}) <b>${object.from}</b> para <b>${object.to}</b> : ${object.text}</p>
        </div> 
        `
    }
    const seeLastMessage = document.querySelector("main div:last-child");
    seeLastMessage.scrollIntoView();
}

function reloadMessages() {
    const promiseMessages = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promiseMessages.then(takeMessages);
}
setInterval (reloadMessages, 3000);



function sendMessage() {
    let input = document.querySelector("input").value;
    let objectSendMessage = {
        from: name,
        to: "Todos",
        text: input,
        type: "message"
    }
    const promiseSendMessage = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", objectSendMessage);
    promiseSendMessage.then(reloadMessages);
    promiseSendMessage.catch(failSendMessage);
    document.querySelector("input").value = "";
}

document.addEventListener("keypress", 
function (e) {
    if (e.key === 'Enter') {
        document.querySelector("footer ion-icon").click();
    }
}
);

function failSendMessage (statusFail) {
   window.location.reload(true);
}

function startMenu() {
    const aside = document.querySelector("aside");
    aside.classList.toggle("hidden");
    const shadowbox = document.querySelector(".shadowbox");
    shadowbox.classList.toggle("hidden");
}


function select(selected) {
    const icon = selected.querySelector(".check");
        icon.classList.toggle("hidden")
}