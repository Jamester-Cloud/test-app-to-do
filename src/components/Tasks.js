import React, { useEffect, useState } from "react"
import TasksForm from "./TasksForm"
//metodos para incluir
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from 'react-toastify';
const Tasks = () => {

    const [tasks, setTasks] = useState([]);
    const [currentId, setCurrentId] = useState();
    const addTask = async (taskObject) => {
        //Add
        console.log(taskObject);
        try {
            if (currentId === undefined) {
                await addDoc(collection(db, "tasks"),
                    taskObject
                )
                toast("Tarea Agregada", {
                    type: 'success'
                })
            }else{
                const docRef = doc(db, "tasks", currentId);
                await setDoc(docRef, taskObject)
                toast("Tarea editada", {
                    type: 'info'
                })
                setCurrentId(undefined);
            }
            console.log("new task added")
        } catch (error) {
            console.log("error en: ", error);
        }
    }



    const getTasks = async () => {
        // debo hacer esto en tiempo real, por ahora lo dejo asi para poder avanzar mas
        const tasks = await getDocs(collection(db, "tasks"));
        const docs = [];
        tasks.forEach((d) => {
            docs.push({ ...d.data(), id: d.id })
        })
        setTasks(docs);
    }

    const onDeleteLink = async id => {
        if (window.confirm("Estas seguro de eliminar la tarea?")) {
            //eliminar
            await deleteDoc(doc(db, 'tasks', id));
            toast("Tarea Eliminada", {
                type: 'error',
                autoClose: 2000
            })
        } else {
            toast("Tarea no eliminada", {
                type: 'success'
            })
        }
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <>
            <div className="col-md-4 p-2">
                <TasksForm {...{ addTask, currentId, tasks }} />
            </div>
            <div className="col-md-8 p-2">
                {tasks.map(task => (
                    <div key={task.id} className="card mb-1">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{task.task}</h4>

                                <button
                                    className="btn btn-info btn-sm d-flex align-items-center"
                                    onClick={() => setCurrentId(task.id)}
                                >
                                    <i className="material-icons">create</i>
                                </button>
                                <button
                                    className="btn btn-danger btn-sm d-flex align-items-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteLink(task.id);
                                    }}
                                >
                                    <i className="material-icons">close</i>

                                </button>
                            </div>

                            <h5>{task.taskPersonal}</h5>
                            <p>{task.taskDescription}</p>
                            <p>Status:</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Tasks;