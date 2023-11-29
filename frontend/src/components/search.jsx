import Input from "./input";

export default function Search({label, setFilter}) {
    function handleFilter(event) {
        let newValue = event.target.value;
        setFilter(newValue);
    }
    
    return (
        <>
            <div className="search">
                <Input type="text" identifier={label} label="Search" onChange={handleFilter}/>
            </div>
        </>
    )
}

