import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../styles/home.css"

const ABOUT_RESOURCE = `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}${import.meta.env.VITE_PATH}/about`

function ScrollTo() {
    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView()
    // run this function from an event handler or an effect to execute scroll 

    return (
        <>
            <button onClick={executeScroll}> Click to scroll </button>
            <div className="net-title" ref={myRef}>Element to scroll to</div>
        </>
    )
}

export default function Home() {
    const myRef = useRef(null)
    const [aboutContent, setAboutContent] = useState("LOADING")

    useEffect(() => {
        fetch(ABOUT_RESOURCE)
            .then((resp) => { return resp.json() })
            .then((value) => {setAboutContent(value.content)})
            .catch(() => {
                setAboutContent("Failed to fetch resource")
            })
    }, [])

    console.log(aboutContent)

    const executeScroll = () => myRef.current.scrollIntoView()


    return (
        <>
            <div className="home-section" id="home-title">

                <h1 className='title-font'>arcinfini.net</h1>
                <button onClick={executeScroll}><h3>Read About Me</h3></button>

            </div>
            <div className="home-section second-color" id="about-me">


                    <section ref={myRef}>
                        {aboutContent}
                    </section>


            </div>
            <div className="home-section">

                Want to contact me? <Link to="/contact">Click here</Link>!

            </div>
        </>
    )
}