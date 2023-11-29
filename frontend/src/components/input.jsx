
export default function Input({type, label, identifier, onChange}) {
    return (
        <>
            <label htmlFor={identifier}>{label}</label>
            <br/>
            <input type={type} name={identifier} onChange={onChange} required />
            <br />
        </>
    )
}