
export default function Project({ img , title,  content}) {
    return (
        <>
            <div className="project">
                <img src={img}/>
                <section>
                    <p>{title}</p>
                    <p>{content}</p>
                </section>
            </div>
        </>
    )
}