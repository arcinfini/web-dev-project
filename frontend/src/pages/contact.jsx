import { useState } from "react";
import Input from "../components/input";
import "../styles/contact.css"

const CONTACT_RESOURCE = `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}${import.meta.env.VITE_PATH}/contact/send`;

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    let submitContact = () => {
        fetch(CONTACT_RESOURCE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Contact Shared!")
            })
            .catch((error) => {
                // Handle errors
                console.error('Error:', error);
                alert("Failed to share contact :(")
            });
    }

    return (
        <section className="contact-form">
            <p className="contact-instruction">
                Have Questions? Feel free to contact me!
            </p>
            <form>
                <Input type="text" identifier="name" label="Name" onChange={handleChange}/>
                <Input type="email" identifier="email" label="Email" onChange={handleChange}/>

                <label htmlFor="message">Message</label>
                <br />
                <textarea name="message" onChange={handleChange} required></textarea>
                <br />

                <button type="button" onClick={submitContact}>Submit</button>
            </form>
        </section>

    )
}