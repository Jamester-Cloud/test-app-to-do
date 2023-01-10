import { useState } from "react";
import { useAuth } from "../context/authContex";
import { useNavigate } from "react-router-dom";
import { Container } from "./Container";
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
            if (error.code === 'auth/internal-error') {
                setError('Correo invalido')
            }
            setError(err.message);
        }
    }

    return (
        <Container>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div>
                        {error && <p>{error}</p>}
                        <form className="card card-body" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" id="email" onChange={handleChange} />

                            <label htmlFor="pass">Password</label>
                            <input type="password" className="form-control" name="pass" id="pass" onChange={handleChange} />

                            <button className="btn btn-primary">Registrarse</button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}