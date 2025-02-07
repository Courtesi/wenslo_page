import { Octokit } from "https://esm.sh/@octokit/core@4.2.2";

// const GIT_KEY = config.API_KEY;
// const username = "Courtesi";
// const octokit = new Octokit({ auth: GIT_KEY,});

window.onload = () => {
    fetchAPIGitHub();
}

function fetchAPIGitHub() {
    fetch("projects", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`)
            }
            return response.json();
        })
        .then(resultData => {
            handleAPIGitHub(resultData);
        })
        .catch(error => console.error("Error fetching projects:", error));
}

function handleAPIGitHub(data) {
    console.log(data);
    const container = document.getElementById('github');

    // Sort repositories by 'updated_at' in descending order (most recent first)
    data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // Loop through the sorted data and create the list items
    data.forEach(async v => {
        //new section <section class="col-4 col-12-narrower feature"></section>
        const newSection = document.createElement("section");
        newSection.className = "col-4 col-12-narrower feature";

        //new div <div class="box"></div>
        const box = document.createElement("div");
        box.className = "box";

        //new a tag <a target="_blank" href="github.com/projectName" class="clickable-header"></a>
        const hrefLinkTag = document.createElement("a");
        hrefLinkTag.target = "_blank"
        hrefLinkTag.href = v.html_url;
        hrefLinkTag.className = "clickable-header";

        //new div box header <div class="box-header"></div>
        const boxHeader = document.createElement("div");
        boxHeader.className = "box-header";
        boxHeader.innerHTML = '<img src="../../images/web_icon.png" width = "30" height = "30" alt="Icon description" class = "icon"></i>';

        //new h3 element for projectTitle <h3 class="title"></h3>
        const title = document.createElement("h3");
        title.className = "title";
        title.textContent = v.name;

        //new boxBody div <div class="box-body"></div>
        const boxBody = document.createElement("div");
        boxBody.className = "box-body";

        //Attach language info to boxBody
        fetch(`/projects/${v.name}/languages`, {
            method: "GET",
            headers: {"Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {throw new Error(`HTTP Error! Status: ${response.status}`)}
                return response.json();
            })
            .then(languages => {
                handleAPIGitHubLanguages(languages, boxBody)
            })
            .catch(error => console.error(`Error fetching languages for project ${v.name}:`, error));

        //Attaching elements (divs, a tags, h3) to <div class="github"></div>
        boxHeader.appendChild(title);
        hrefLinkTag.appendChild(boxHeader);
        box.appendChild(hrefLinkTag);
        box.appendChild(boxBody);
        newSection.appendChild(box);
        container.appendChild(newSection);

        //Attach description to <section></section>
        const description = document.createElement("p");
        description.textContent = v.description;
        newSection.appendChild(description);
    });
}

function handleAPIGitHubLanguages(data, boxBody) {
    const totalSize = Object.values(data).reduce((sum, size) => sum + size, 0);

    let sortedLanguages = Object.entries(data)
        .sort((a, b) => b[1] - a[1]);

    sortedLanguages = sortedLanguages.slice(0, 3);

    sortedLanguages.forEach(([language, size]) => {
        const number = (size / totalSize) * 100;
        const percentage = Math.round(number);
        const shownPercentage = number.toFixed(2);
        const innerString = `<div class="box-body">
                                        <div class="progress-container">
                                            <div class ="progress-bar">
                                                <div class="single-chart">
                                                    <svg viewBox="0 0 36 36" class="circular-chart ${language}">
                                                        <path class="circle-bg"
                                                        d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <path class="circle"
                                                        stroke-dasharray="${percentage}, 100"
                                                        d="M18 2.0845
                                                            a 15.9155 15.9155 0 0 1 0 31.831
                                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                                        />
                                                        <text x="18" y="20.35" class="percentage">${shownPercentage}%</text>
                                                    </svg>
                                                </div>
                                                <a class = "language">${language}</a>
                                            </div>
                                        </div>`
        boxBody.innerHTML += innerString
    })
}