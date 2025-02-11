async function messageFormHandler() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message_text = document.getElementById("message_text").value;
    // console.log(name, email, message_text);

    if (!name || !email || !message_text) {
        alert("All fields are required!");
        return false;
    }

    const testing = document.getElementById("testing").value;
    console.log("token from html:", testing);

    const token = await getCsrfToken();

    console.log("first token:", token);

    fetch("/api/create_message", {
        method: "post",
        credentials: "include",
        body: JSON.stringify({
            "name": name,
            "email": email,
            "message_text": message_text
        }),
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": token
        }
    })
        .then(async response => {
            if (!response.ok) {
                const errorData = await response.json();
                alert(`Server says: ${errorData.message} (${response.status})`);
                throw new Error(`${errorData.message}`);
            }
            return response.json();
        })
        .then(data => {
            // console.log("Server Response:", data);
            window.location.replace("/message-sent.html");
            return false;
        })
        .catch(error => console.error("Error creating message:", error));

        return false;
}

function fetchMessages() {
    fetch("/api/messages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                const tempData = [
                    {
                        "id": "592ec17f-5c63-495b-aa16-0a241e51607b",
                        "name": "Uh oh",
                        "email": "yourmom@hotmail.com",
                        "message_text": "A little bit of a fucky wucky with the text belike when this is not over yet I can't beveliev someone typed this much",
                        "date": "2025-02-10T11:22:27.880+00:00"
                    },
                    {
                        "id": "ff080419-9f9e-4ca8-a9ee-3aae653cbe42",
                        "name": "Your",
                        "email": "balls@gmail.com",
                        "message_text": "are mine...",
                        "date": "2025-02-10T11:22:17.847+00:00"
                    }
                ];
                handleMessages(tempData);
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
            
            return response.json();
        })
        .then(resultData => {
            // console.log(resultData);
            handleMessages(resultData);
        })
        .catch(error => console.error("Error fetching message board:", error));
}

function handleMessages(resultData) {
    const container = document.getElementById("message_board");

    resultData.forEach(element => {
        //new section <section class="col-4 col-12-narrower feature"></section>
        const newSection = document.createElement("section");
        newSection.className = "col-4 col-12-narrower feature";

        //new div <div class="box"></div>
        const box = document.createElement("div");
        box.className = "message-box";

        //new div box header <div class="box-header"></div>
        const boxHeader = document.createElement("div");
        boxHeader.className = "name-header";
        boxHeader.innerHTML = '<img src="../../images/person_icon.png" width = "30" height = "30" alt="Icon description" class = "icon"></i>';

        //new h3 element for projectTitle <h3 class="title"></h3>
        const title = document.createElement("h3");
        title.className = "name";
        title.textContent = `${element.name} (${formatDate(element.date)})`;

        //new boxBody div <div class="box-body"></div>
        const boxBody = document.createElement("div");
        boxBody.className = "message-body";
        boxBody.innerHTML = element.message_text;

        boxHeader.appendChild(title);
        box.appendChild(boxHeader);
        box.appendChild(boxBody);
        newSection.appendChild(box);
        container.appendChild(newSection);
    });
}

function formatDate(timestamp) {
    // ✅ Parse the ISO timestamp
    const date = new Date(timestamp);

    // ✅ Format the date as "MM/dd/yyyy HH:mm"
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(date);

    return formattedDate.replace(",", ""); // Remove comma for clean output
}

async function getCsrfToken() {  
    const res = await fetch('/api/csrf-token')
    let obj = await res.json();

    return obj["token"];
  }