import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContex";
import { Container } from "./Container";
import TaskPrivate from "./TaskPrivate";

export function Home() {
    const navigate = useNavigate()
    const { user, logout, loading } = useAuth();
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }
    // funcion que busca las listas
    if (loading) return <h1>Cargando...</h1>
    return (
        <>
            <Container>
                <h1>
                    Bienvenid@ {user.email}
                </h1>

                <div className="row">
                    <h2>Mis lista:</h2>
                    {/*Estas en realidad son mis tareas, en mis listas, se debe asociar */}
                    <TaskPrivate></TaskPrivate>
                </div>
            </Container>
            <button onClick={handleLogout}>Log out</button>
        </>)
}