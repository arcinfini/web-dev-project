import { useState, useEffect } from 'react';
import Project from '../components/project';
import Search from '../components/search';
import "../styles/portfolio.css"

const PROJECT_RESOURCE = `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}${import.meta.env.VITE_PATH}/projects`;// 'https://randomuser.me/api?results=20&inc=name,picture';

export default function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState("")

    useEffect(() => {
        fetch(PROJECT_RESOURCE)
        .then(response => response.json())
        .then(result => {
            let v = result.results
            
            setProjects(v)
        });
    }, [])

    return (
        <>
            <Search setFilter={setFilter} label={"Filter: "}/>
            <div className="project-holder">
                {
                projects.map((item, index) => (
                    item.title.toLowerCase().indexOf(filter.toLowerCase()) != -1 ? <Project key={index}
                        img={item.img_url} 
                        title={item.title}
                        content={item.content}
                    /> : null
                )) 
                }
            </div>
        </>
    )
}