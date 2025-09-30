const projects = [
    {
        "name": "anime_recommender",
        "html_url": "https://github.com/Courtesi/anime_recommender",
        "description": "Featured: Anime recommendation system using content-based filtering",
        "languages": {
            "CSS": 3682,
            "HTML": 1405,
            "Python": 20999
        },
        "updated_at": "2025-01-30T21:15:37.000+00:00"
    },
    {
        "name": "spacetime-crawler4py",
        "html_url": "https://github.com/BrettTK/spacetime-crawler4py",
        "description": "Brett Kaplan CS 121 Web Crawler",
        "languages": {
            "Python": 23494
        },
        "updated_at": "2023-01-31T02:56:56.000+00:00"
    },
    {
        "name": "search_engine",
        "html_url": "https://github.com/Courtesi/search_engine",
        "description": "Search engine for UCI directory",
        "languages": {
            "HTML": 2347,
            "Python": 16275
        },
        "updated_at": "2025-01-30T21:15:53.000+00:00"
    },
    {
        "name": "movie_machine",
        "html_url": "https://github.com/Courtesi/movie_machine",
        "description": "Featured: IMDB-like movie browsing website (Java Maven package)",
        "languages": {
            "Dockerfile": 1300,
            "Java": 108526,
            "CSS": 6683,
            "JavaScript": 37128,
            "HTML": 26687
        },
        "updated_at": "2025-02-07T10:31:07.000+00:00"
    },
    {
        "name": "AIRES",
        "html_url": "https://github.com/Courtesi/AIRES",
        "description": "Featured: AIRES (AI - Read, Explore, Share) messaging platform React Native app",
        "languages": {
            "TypeScript": 62954,
            "CSS": 58,
            "JavaScript": 4902
        },
        "updated_at": "2025-02-07T10:31:27.000+00:00"
    },
    {
        "name": "wenslo_page",
        "html_url": "https://github.com/Courtesi/wenslo_page",
        "description": "Featured: Frontend for wenslo.me",
        "languages": {
            "Java": 47145,
            "CSS": 59160,
            "SCSS": 43427,
            "JavaScript": 26768,
            "HTML": 58940
        },
        "updated_at": "2025-02-12T00:42:30.000+00:00"
    },
    {
        "name": "spring_boot_boiler_plate",
        "html_url": "https://github.com/Courtesi/spring_boot_boiler_plate",
        "description": "Spring Boot boilerplate for browsing API calls",
        "languages": {
            "Java": 60191
        },
        "updated_at": "2025-02-07T10:31:43.000+00:00"
    },
    {
        "name": "snowboard_spring_boot_api",
        "html_url": "https://github.com/Courtesi/snowboard_spring_boot_api",
        "description": "Spring Boot API project for browsing snowboards",
        "languages": {
            "Java": 45199
        },
        "updated_at": "2025-02-07T10:31:56.000+00:00"
    }
]

const filtered = projects.filter(element => element.description.includes("Featured:")).map(element => ({...element, description: element.description.slice(10)}));
filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

filtered.forEach(element => {
    const total = Object.values(element.languages).reduce((sum, value) => sum + value, 0);

    // Step 2: Convert to Percentage
    const percentagesArray = Object.entries(element.languages).map(([key, value]) => [
        key, 
        ((value / total) * 100).toFixed(2) // Convert to percentage & round
    ]);

    // Step 3: Sort the Array in Descending Order (Greatest percentage first)
    percentagesArray.sort((a, b) => b[1] - a[1]);

    // Step 4: Convert Back to an Object (Optional)
    const sortedPercentages = Object.fromEntries(percentagesArray);

    element.languages = sortedPercentages;
});


console.log(filtered);

export default filtered;