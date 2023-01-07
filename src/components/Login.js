import { useAuth } from "../context/authContex"


export function Login(){
    const authContext= useAuth();
    console.log(authContext);
    return(
    <>
        <form action="">
            <input type="email" name="email" id="" />
            <input type="password" name="pass" id="" />
        </form>
    </>)
}