import { createUser } from "./api";
import { useState } from "react";

export function CreateUser() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    async function handleSubmit() {
        let res = await createUser(user);
        if (res === 200) {
            alert("User account could not be created");
        }
    }

    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder={"Username"} onChange={handleChange} name="name" required maxLength={20}/>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={256}/>
            <input placeholder={"Password"} onChange={handleChange} name="password" required maxLength={32}/>
            <button type="submit">Sign Up</button>
        </form>
    )
}