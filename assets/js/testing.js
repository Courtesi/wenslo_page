import { Octokit, App } from "https://esm.sh/octokit?dts";
import {config} from "./config.js";

window.onload = () => {
    fetchRepos();
}

const GIT_KEY = config.API_KEY;
const username = "Courtesi";
const octokit = new Octokit({ auth: GIT_KEY,});

async function fetchLanguages(repoName, boxBody) {
    // console.log(GIT_KEY, "LANGUAGES");
    try {
        const response = await octokit.request("GET /repos/{owner}/{repo}/languages", {
            owner: username,
            repo: repoName,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    
        const data = await response.data;
    
        // console.log(data);
    
        const totalSize = Object.values(data).reduce((sum, size) => sum + size, 0);
    
        let sortedLanguages = Object.entries(data)
        .sort((a, b) => b[1] - a[1]);
    
        sortedLanguages = sortedLanguages.slice(0, 3);
    
        console.log(sortedLanguages);

    
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
            // console.log(boxBody.innerHTML);
        })
        
    } catch (error) {
        console.log("fetchLanguages did not work!!")
    }
}

async function fetchRepos() {
    try {
        // console.log(GIT_KEY)
        
        
        const response = await octokit.request('GET /users/{user}/repos', {
            user: username,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        
        const data = response.data;

        //replacee
        const container = document.getElementById('github');
                
        // Sort repositories by 'updated_at' in descending order (most recent first)
        data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        
        // Loop through the sorted data and create the list items
        data.forEach(async v => {
            const newSection = document.createElement("section");
            newSection.className = "col-4 col-12-narrower feature";

            const box = document.createElement("div");
            box.className = "box";
            

            const hLinky = document.createElement("a");
            hLinky.target = "_blank"
            hLinky.href = v.html_url;
            hLinky.className = "clickable-header";
            

            const boxHeader = document.createElement("div");
            boxHeader.className = "box-header";
            boxHeader.innerHTML = '<img src="./images/icon.png" width = "30" height = "30" alt="Icon description" class = "icon"></i>';
            

            const title = document.createElement("h3");
            title.className = "title";
            title.textContent = v.name;
            

            const boxBody = document.createElement("div");
            boxBody.className = "box-body";

            await fetchLanguages(v.name, boxBody);

            boxHeader.appendChild(title);
            hLinky.appendChild(boxHeader);
            box.appendChild(hLinky);
            box.appendChild(boxBody);
            newSection.appendChild(box);
            container.appendChild(newSection);
            newSection.innerHTML += '<header> \
                                <h3>Spring Boot Boiler Plate coded in Java wrapped in a Maven package</h3> \
                            </header>';
            

            //DO NOT CHANGE ORDER OF APPENDCHILDS
            

            



            // const listItemRepo = document.createElement('li');
            // listrepos.appendChild(listItemRepo);
        
            // const hlink = document.createElement('a');
            // listItemRepo.appendChild(hlink);
        
            // // Set initial text content with the title (repo name) and a placeholder for languages and size
            // hlink.textContent = `${v.name} | Size: ${v.size} KB | Languages: Loading...`;
            // hlink.href = v.html_url;
            // hlink.target = '_blank';  // Open the link in a new tab

            
        
            // Fetch languages for each repo
            // fetch(v.languages_url)
            //     .then(languageResponse => languageResponse.json())
            //     .then(languages => {
            //         // Calculate the total size of all languages
            //         const totalSize = Object.values(languages).reduce((sum, size) => sum + size, 0);
        
            //         // Create a string with each language and its percentage of the total size
                    // const languageDetails = Object.keys(languages).map(language => {
                    //     const languageSize = languages[language];
                    //     const percentage = ((languageSize / totalSize) * 100).toFixed(2); // Calculate percentage
                    //     return `${language}: ${percentage}% (${languageSize} bytes)`;
                    // }).join(', ') || 'No languages detected';
        
            //         // Update the repository link text with languages and their percentages
            //         hlink.textContent = `${v.name} | Size: ${v.size} KB | Languages: ${languageDetails}`;
            //     })
            //     .catch(error => {
            //         console.error('Error fetching languages for', v.name, error);
            //         hlink.textContent = `${v.name} | Size: ${v.size} KB | Languages: Error fetching languages`;
            //     });
        });

    } catch (error) {
        console.log(error);
    }
}


// const user = 'Courtesi';
// const apirepo = `https://api.github.com/users/${user}/repos`;

// const listrepos = document.createElement('ul');
// document.getElementById('github').appendChild(listrepos);

// fetch(apirepo)
// .then(response => response.json())
// .then(data => {
// console.log('data now', data);
// // Sort repositories by 'updated_at' in descending order (most recent first)
// data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
// // Loop through the sorted data and create the list items
// data.forEach(v => {
//     const listItemRepo = document.createElement('li');
//     listrepos.appendChild(listItemRepo);

//     const hlink = document.createElement('a');
//     listItemRepo.appendChild(hlink);

//     // Set initial text content with the title (repo name) and a placeholder for languages and size
//     hlink.textContent = `${v.name} | Size: ${v.size} KB | Languages: Loading...`;
//     hlink.href = v.html_url;
//     hlink.target = '_blank';  // Open the link in a new tab

//     // Fetch languages for each repo
//     fetch(v.languages_url)
//     .then(languageResponse => languageResponse.json())
//     .then(languages => {
//         // Calculate the total size of all languages
//         const totalSize = Object.values(languages).reduce((sum, size) => sum + size, 0);

//         // Create a string with each language and its percentage of the total size
//         const languageDetails = Object.keys(languages).map(language => {
//         const languageSize = languages[language];
//         const percentage = ((languageSize / totalSize) * 100).toFixed(2); // Calculate percentage
//         return `${language}: ${percentage}% (${languageSize} bytes)`;
//         }).join(', ') || 'No languages detected';

//         // Update the repository link text with languages and their percentages
//         hlink.textContent = `${v.name} | Size: ${v.size} KB | Languages: ${languageDetails}`;
//     })
//     .catch(error => {
//         console.error('Error fetching languages for', v.name, error);
//         hlink.textContent = `${v.name} | Size: ${v.size} KB | Languages: Error fetching languages`;
//     });
// });
// })
//     .catch(error => {
//     console.error('Error fetching data:', error);
// });