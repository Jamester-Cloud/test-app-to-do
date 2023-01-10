import React, { useEffect, useState } from "react"
import TasksFormPrivate from "./TasksFormPrivate";
import { useAuth } from "../context/authContex";
import { Datatable } from "./datatables/Datatable";
//metodos para incluir
import { collection, addDoc, deleteDoc, doc, setDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from 'react-toastify';
const TasksPrivate = () => {
    //User
    const { user, loading } = useAuth();
    //
    const [tasks, setTasks] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const addTask = async (taskObject) => {
        //Add
        try {
            //Agrega
            if (currentId === '' || currentId === undefined) {
                await addDoc(collection(db, "tasks"),
                    taskObject
                )
                toast("Tarea Agregada", {
                    type: 'success'
                })
                //Limpiar datos
                getTasks();
                //Edita
            } else {
                const docRef = doc(db, "tasks", currentId);
                //editar
                await setDoc(docRef, taskObject)
                toast("Tarea editada", {
                    type: 'info'
                })
                setCurrentId('');
                console.log(currentId);
                //Limpiar datos
                getTasks();
                console.log("editando")
            }

        } catch (error) {
            console.log("error en: ", error);
        }
    }

    const getCustomCategorie = async (idCategory) => {
        const docRef = doc(db, "categories", idCategory);
        const docSnap = await getDoc(docRef);
        const { category } = docSnap.data();
        return category;
    }
    const getTasks = async () => {
        //limpiando el estado data
        setTasks([])
        //traer las tareas por usuario
        const q = query(collection(db, "tasks"), where("idUser", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const docus = [];
        querySnapshot.forEach((doc) => {
            docus.push({ ...doc.data(), id: doc.id })
            docus.forEach(async (d) => {
                const category = await getCustomCategorie(d.taskCategory);
                const updateDocus = docus.findIndex((obj => obj.taskCategory === d.taskCategory))
                docus[updateDocus].taskCategory = category;
                setTasks(docus);
            })
        });
    }

    const onDeleteLink = async id => {
        if (window.confirm("Estas seguro de eliminar la tarea?")) {
            //eliminar
            await deleteDoc(doc(db, 'tasks', id));
            toast("Tarea Eliminada", {
                type: 'error',
                autoClose: 2000
            })
            getTasks();
        } else {
            toast("Tarea no eliminada", {
                type: 'success'
            })
        }
    }

    useEffect(() => {
        getTasks();
    }, [])
    if (loading) return <h1>Cargando...</h1>
    return (
        
        <>
        
            <div className="col-md-4 p-2">
                <TasksFormPrivate {...{ addTask, currentId, tasks }} />
            </div>

            <div className="col-md-8 p-2">
                <div className="card mb-1">
                    <div className="card-body mb-1">
                        <Datatable
                            data={tasks}
                            setCurrentId={setCurrentId}
                            onDeleteLink={onDeleteLink}
                        />
                    </div>
                </div>
                {/* filtros
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
                            <h5>Categoria:{task.taskCategory}</h5>
                            <h5>{task.taskPersonal}</h5>
                            <p>{task.taskDescription}</p>
                            <p>Status:{task.taskStatus === true ? 'Finalizada' : 'Pendiente'}</p>
                        </div>
                    </div>
                ))} */}
            </div>
        </>
    )
}

export default TasksPrivate;