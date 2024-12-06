async function sendreq(){
    const manual = document.querySelector("#manual");
    const manualText = manual.value;
    manual.value = "";
    const request = document.querySelector("#request");
    const requestText = request.value;
    request.value = "";
    console.log("manual", manual.value);
    console.log("request", request.value);
    const res = await fetch('https://functions.yandexcloud.net/d4e3ol9dq47gl9rd5alb?integration=raw', {
    method: "POST",
    body: JSON.stringify({
    "httpMethod": "POST",
    "body": [manualText, requestText],
    "isBase64Encoded": true
    })
    });
    const answer = await res.json()
    const messages = answer['result']['alternatives']
    console.log(messages[0]['message']['text'])
    addChat(manualText + " " +requestText, messages[0]['message']['text']);
    }
    function addChat(input, product) {
    const messagesContainer = document.getElementById("messages");
    let userDiv = document.createElement("div");
    userDiv.className = "user response";
    userDiv.innerHTML = `<img src="user.png" class="avatar"><span>${input}</span>`;
    messagesContainer.append(userDiv);
    let botDiv = document.createElement("div");
    let botText = document.createElement("span");
    botDiv.className = "bot response";
    botText.innerText = "Typing...";
    botDiv.append(botText);
    messagesContainer.append(botDiv);
    botText.innerText = `${product}`;
    }
    