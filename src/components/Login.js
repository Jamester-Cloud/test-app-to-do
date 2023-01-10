import { useState } from "react";
import { useAuth } from "../context/authContex";
import { Link, useNavigate } from "react-router-dom";
import Tasks from "./Tasks";
import { Container } from "./Container";

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
        <Container>
            <div>
                {error && <p>{error}</p>}
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form className="card card-body" onSubmit={handleSubmit}>
                            <h2>Iniciar Sesion</h2>
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" id="email" onChange={handleChange} />

                            <label htmlFor="pass">Password</label>
                            <input type="password" className="form-control" name="pass" id="pass" onChange={handleChange} />

                            <button className="btn btn-primary btn-block mt-3">Login</button>
                        </form>
                        <Link to="/register">Registrate</Link>
                    </div>
                </div>

                {/* Lista publica */}

                <h3>Los usuarios registrados, tienen benefecios extras en la aplicacion, registrate ahora!</h3>
                <p>Esta es una lista publica</p>
                <div className="row">
                    <Tasks></Tasks>
                </div>
            </div>
        </Container>
    );
}