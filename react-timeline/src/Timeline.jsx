
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import timelineElements from "./assets/timelineElements";

import ProfilePhoto from './images/profile_photo.jpg';
import ProjectPNG from "./images/project.png";
import ResumePDF from "./assets/Curtis_Chang_resume.pdf";

import ClipboardCopy from "./ClipBoardCopy";

import WorkIcon from "./assets/work.svg?react";
import SchoolIcon from "./assets/school.svg?react";
import WebIcon from "./assets/web_icon.svg?react";
import GitHub from './images/github.png';
import LinkedIn from './images/linkedin.png';
import Resume from './images/resume.png';
import React, {useEffect, useState} from "react";

function sortProjects(projects) {
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

    return filtered;
}

export default function Timeline() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('/api/projects')
            .then(response => response.json())
            .then(data => {
                const temp = sortProjects(data);
                setProjects(temp);
                setLoading(false);
            })
    }, []);

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    const testing = projects;
    console.log("whatever" + testing.length);
    // let workIconStyles = {background: "#06d6a0"};
    // let schoolIconStyles = {background: "#f9c74f"};
    const colors = {
        "JavaScript": "bg-amber-300",
        "Python": "bg-blue-400",
        "TypeScript": "bg-blue-300",
        "HTML": "bg-red-700",
        "CSS": "bg-indigo-700",
        "SCSS": "bg-pink-500",
        "Java": "bg-yellow-800",
        "Dockerfile": "bg-emerald-600",
        "Shell": "bg-slate-800",
        "Rust": "bg-red-600",
        "Roff": "bg-blue-700",
        "PHP": "bg-blue-400",
        "C": "bg-yellow-300"
    };

    // console.log(colors["JavaScript"]);

    return (
        
        <div className="flex flex-col lg:flex-row">
            <div id = "left-screen" className="items-center p-0 lg:p-20 border-b lg:border-r lg:border-b-0 border-blue-800">
                <div className="p-20 lg:p-0 items-center lg:mt-30 lg:place-items-center justify-center flex flex-row lg:flex-col text-3vh">
                    <div className="w-60 lg:w-55">
                        <img src={ProfilePhoto} className="rounded-full drop-shadow-2xl scale-150 sm:scale-100"/>
                    </div>
                    <div className="flex flex-col gap-10 ml-8 lg:ml-0 lg:p-10 scale-90 sm:scale-100 w-40 lg:w-75">
                        <div className="border-b pb-3 mt-5 border-dotted text-center text-gray-800 text-font-bold text-2xl lg:text-4xl drop-shadow-xl">Curtis Chang</div>
                        <div className="lg:mt-5 border-b pb-3 border-dotted text-center drop-shadow-xl">Software Developer</div>
                        <div className="border-b pb-3 border-dotted text-center drop-shadow-xl">
                            <ClipboardCopy copyText={"curtischang@wenslo.me"}/>
                        </div>                        
                    </div>
                    
                </div>
            </div>
            
            <div id = "right-screen" className="bg-sky-500 lg:max-h-screen lg:sticky lg:top-0 lg:overflow-y-auto place-items-center flex justify-center lg:block">
                <div className="w-7/10 mt-20">
                    <div className="border-b pb-10 border-slate-900 max-w-full">
                        <div className="items-center justify-center">
                            <div className="text-4xl mb-3 font-bold">Welcome to my web portfolio!</div>
                            <div>This page highlights the important parts of my education, projects, and experience! I'm a software engineer 
                                who's currently looking to have his chance in the industry. I'm interested in creating projects that support
                                niches around the world. If you have an idea, don't feel afraid to let me know and if you're hiring, 
                                please contact me. Test changes!
                            </div>
                        </div>
                        <div className="flex gap-5 justify-end mt-10">
                            <div className="border-r pr-3 flex items-center">
                                {/* <a className="text-blue-800 hover:text-blue-600" target="_blank" href="https://github.com/Courtesi">GitHub</a> */}
                                <a target="_blank" href="https://github.com/Courtesi"><img src={GitHub} className="w-8 hover:scale-120 duration-300"/></a>
                            </div>
                            <div className="border-r pr-5">
                                {/* <a className="text-blue-800 hover:text-blue-600" target="_blank" href="https://www.linkedin.com/in/changcurtis/">LinkedIn</a> */}
                                <a target="_blank" href="https://www.linkedin.com/in/changcurtis/"><img src={LinkedIn} className="w-8 hover:scale-120 duration-300"/></a>
                            </div>
                            <div className="">
                                <a target="_blank" href={ResumePDF}><img src={Resume} className="w-8 hover:scale-120 duration-300"/></a>
                            </div>
                        </div>
                    </div>

                    <div className="place-items- mt-10 border-b border-slate-900 pb-10 max-w-full">
                        <div className="">
                            <h2 className="text-3xl font-bold mb-4">Timeline</h2>
                        </div>
                        <VerticalTimeline animate={true}>
                            {timelineElements.map((element) => {
                                let isWorkIcon = element.icon === "work";
                                let showButton = 
                                    element.buttonText !== undefined && 
                                    element.buttonText !== null && 
                                    element.buttonText !== "";
                                return (
                                    <VerticalTimelineElement
                                        // contentArrowStyle={ {contentStyle: "#E6E7D9"} }
                                        contentStyle={{background: "#E6E7D9"}}
                                        key={element.id}
                                        date={element.date}
                                        dateClassName="date"
                                        iconStyle={{background: "#DBD9D1"}}
                                        icon = {isWorkIcon ? <WorkIcon className="rounded-full sm:scale-175 lg:scale-250"/> : <SchoolIcon className="max-w-full rounded-full sm:scale-175 lg:scale-250"/>}
                                    >

                                        <h3 className="font-bold text-lg">
                                            {element.title}
                                        </h3>
                                        <h5 className="vertical-timeline-element-subtitle">
                                            {element.location}
                                        </h5>

                                        <p id="description">{element.description}</p>
                                        {showButton && (<a className={`button ${isWorkIcon ? "workButton" : "schoolButton"}`}href="/">{element.buttonText}</a>)}

                                    </VerticalTimelineElement>
                                );
                            })}
                        </VerticalTimeline>
                    </div>

                    <div className="border-b border-slate-800 pb-10 pt-10 mb-5 max-w-full">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                            {testing.map((element) => {
                                return (
                                    <a key={element.name} className="" target="_blank" href={`${element.html_url}`}>
                                        <div className="m-5 p-10 border rounded-lg bg-stone-200 hover:shadow-2xl hover:opacity-75 hover:scale-110 duration-300">
                                            
                                            <div className="text-xl lg:text-3xl xl:text-xl border-b flex items-center justify-center">
                                                <div className="flex">
                                                    {element.name}
                                                </div>
                                                <div>
                                                    <img src={ProjectPNG} className="rounded-full drop-shadow-2xl min-w-10 w-10"/>
                                                </div>
                                            </div>

                                            <div className="pt-2 pb-5 text-base">
                                                {element.description}
                                            </div>

                                            <div>
                                                {Object.keys(element.languages).map(language => {
                                                    return (
                                                        <div key={language}>
                                                            <div className="mb-1 flex flow-root">
                                                                <div className="float-left">
                                                                    {language}
                                                                </div>
                                                                <div className="float-right text-sm">
                                                                    {`${element.languages[language]}%`}
                                                                </div>
                                                            </div>
                                                            <div className="w-full bg-gray-600 h-2.5 mb-4">
                                                                <div className={`${colors[language.toString()]} h-2.5 text-xs flex items-center`} style={{width: `${element.languages[language]}%`}}></div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>
                
            
        </div>
        
        // <div>
        //     {timelineElements.map((element) => {
        //         const colors = [
        //             "bg-red-500",
        //             "bg-blue-500",
        //             "bg-yellow-500",
        //             "bg-purple-500",
        //             "bg-orange-500"
        //         ]

        //         const color = defaultColor || `bg-${element.color}-500`;

        //         return (
        //         <div key={element.id} className="flex m-4 relative">
        //             <div className={`${color} w-0.5 h-6 translate-x-20 translate-y-56 opacity-60 sm:hidden`}></div>
        //             <div className={`${color} w-0.5 h-6 translate-x-80 translate-y-56 opacity-60 sm:hidden`}></div>
        //             <div className="hidden items-start w-44 pt-0.5 relative sm:flex">
        //                 <div className="w-4/5 text-gray-500">{element.date}</div>
        //                 <div className={`${color} w-px h-full translate-x-5 translate-y-10 opacity-30`}></div>
        //                 <img 
        //                 src={element.icon === "school" ? schoolIcon : workIcon} 
        //                 alt="icon" 
        //                 className={`${color} w-10 p-1 rounded-lg z-20`}/>
        //                 <div className={`${color} h-px w-8 translate-y-5 opacity-30`}></div>
        //             </div>
        //             <div className="border border-gray-600 rounded-lg px-8 py-4 bg-gray-800 w-full text-center z-10 sm:w-96">
        //                 <div className="text-xl font-medium">
        //                     {element.title}
        //                 </div>
        //                 <div className="text-gray-300 mb-6 sm:mb-8 sm:text-xs">
        //                     {element.location} <span className="sm:hidden">| {element.date}</span>
        //                 </div>
        //                 <div className="mb-4 text-left">
        //                     {element.description}
        //                 </div>
        //                 <div className="flex flex-wrap mb-6 justify-center">
        //                     {element.tech.map((tech, index) => {
        //                         return <span key={index} className="bg-gray-900 rounded-xl px-2 py-1 text-sm m-1">{tech}</span>
        //                     })}
        //                 </div>
        //                 <img 
        //                 src={element.icon === "school" ? schoolIcon : workIcon} 
        //                 alt="icon" 
        //                 className={`${color} w-8 p-1 rounded-lg z-20 absolute left-4 top-4 sm:hidden`}/>
        //                 <a className={`${color} text-gray-950 font-medium px-4 py-1 rounded-md mx-auto cursor-pointer hover:text-white`}>{element.buttonText}</a>
        //             </div>
        //         </div>
        //         );
        //     })}
        // </div>
    );
}
