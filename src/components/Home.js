import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContex"

export function Home(){
    const navigate = useNavigate()
    const {user, logout, loading} = useAuth();
    const handleLogout = async() =>{
        await logout();
        navigate('/login');
    }
    if(loading) return <h1>Cargando...</h1>
    return(
    <><
        h1>
            Welcome {user.email}
        </h1>
        <button onClick={handleLogout}>Log out</button>
    </>)
}