import { useState } from "react";
import { useAuth } from "../context/authContex";
import { useNavigate } from "react-router-dom";
import Tasks from "./Tasks";
//import {Tasks} from "../components/Tasks";
export function Login() {

    const navigate = useNavigate();

    const [error, setError] = useState()
    const [user, setUser] = useState({
        email: '',
        pass: ''
    })

    const { login } = useAuth()

    const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(user.email, user.pass);
            navigate('/')
        } catch (err) {
            console.log(err.message)
            
            setError(err.message);
        }
    }

    return (

        <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={handleChange} />

                <label htmlFor="pass">Password</label>
                <input type="password" name="pass" id="pass" onChange={handleChange} />

                <button>Login</button>

            </form>

            {/* Lista publica */}
            <h3>Aun puedes agregar tareas sin tener una cuenta</h3>
            <Tasks></Tasks>
        </div>
    );
}