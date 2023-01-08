import { useState } from "react";
import { useAuth } from "../context/authContex";
import { useNavigate } from "react-router-dom";
export function Register() {

    const navigate = useNavigate();

    const [error, setError] = useState()
    const [user, setUser] = useState({
        email: '',
        pass: ''
    })

    const { signup } = useAuth()

    const handleChange = ({ target: { name, value } }) => setUser({ ...user, [name]: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signup(user.email, user.pass);
            navigate('/')
        } catch (err) {
            console.log(err.message)
            if (error.code === 'auth/internal-error'){
                setError('Correo invalido')
            }
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

                <button>Register</button>
            </form>
        </div>
    );
}