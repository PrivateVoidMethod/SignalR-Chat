var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var sendButton = document.getElementById("send_button");
var messageInput = document.getElementById("message_input");
var nameInput = document.getElementById("name_input");

connection.start();
sendButton.disabled = true;

connection.on("ReceiveMessage", function (message) {
    addMessage(message.user, message.userMessage, false)
})

sendButton.addEventListener("click", function (event) {
    var userName = nameInput.value;
    var message = messageInput.value;

    connection.invoke("SendMessage", userName, message);
    addMessage("You", message, true)
    messageInput.value = "";
    messageInput.focus();
    sendButton.disabled = true;
})

messageInput.addEventListener("keyup", function (event) {

    if (messageInput.value === "") {
        sendButton.disabled = true;
    } else {
        sendButton.disabled = false
    }

    if (event.keyCode === 13) {
        event.preventDefault();
        sendButton.click();
    }
})

var addMessage = function (user, message, ownMessage) {
    var container = document.createElement("div");
    var messageContainer = document.createElement("div");
    var userMessage = document.createElement("li");
    var name = document.createElement("div");
    var tooltip = document.createElement("span");
    var messageList = document.getElementById("message_list");


    if (ownMessage) {
        messageContainer.classList.add("message_self");
        container.classList.add("message_container_self");
    }
    else {
        messageContainer.classList.add("message_other");
        container.classList.add("message_container_other");
    }
    name.classList.add("message_name");
    tooltip.classList.add("tooltip");

    var time = new Date().toLocaleTimeString("da-DK", { hour: '2-digit', minute: '2-digit' });

    userMessage.textContent = message;
    name.textContent = user;
    tooltip.textContent = time;

    messageContainer.appendChild(userMessage);
    container.appendChild(tooltip);

    container.appendChild(name);
    container.appendChild(messageContainer);

    messageList.appendChild(container);
    messageList.scrollTop = messageList.scrollHeight;
}