import { useEffect, useState } from "react"

import { query, where, getDocs,collectionGroup}
    from 'firebase/firestore';
import { db } from "../firebase";
export const Lists = (props) => {

    const [idtasks, setTasks] = useState([])
    //session user
    //primero consulto la lista y traigos los id de las tareas ligados a ese usuario

    const getUserListsTasks = async () => {
        //se traen los ids primero de las listas
        const q = query(collectionGroup(db, "lists"), where("idUser", "==", props.idUser));

        const querySnapshot = await getDocs(q);
        const idTareas = []
        querySnapshot.forEach(async (doc) => {
            console.log(doc.data());
            const { idTasks } = doc.data();
            idTareas.push(idTasks);
            //console.log(idTareas);
            //console.log(doc.id, " => ", doc.data());
        });
        //utilizar funcion
        setTasks(idTareas);
    }

    const getTasks = async (id) => {
        
        for (let index = 0; index < id.length; index++) {
            const q = query(collectionGroup(db, "tasks"), where("id", "==", id[index]));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                
            });
        }

        //console.log(idTasks)

    }

    useEffect(() => {
        getUserListsTasks();
        //getTasks(idtasks);
    }, [])
    return (
        <div>
            Listas
        </div>
    )

}