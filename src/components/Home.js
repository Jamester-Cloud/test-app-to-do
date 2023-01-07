import { useAuth } from "../context/authContex"

export function Home(){
     const {user} = useAuth();
    console.log(user);

    return(<><h1>Homepage</h1></>)
}