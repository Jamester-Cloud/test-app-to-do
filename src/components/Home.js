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
                    Welcome {user.email}
                </h1>
                <h2>Mis listas:</h2>
                <br />
                <div className="row">
                    <TaskPrivate></TaskPrivate>
                </div>
            </Container>
            <button onClick={handleLogout}>Log out</button>
        </>)
}