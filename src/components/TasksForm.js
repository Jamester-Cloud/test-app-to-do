import React, { useState, useEffect } from "react";
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

const TasksForm = (props) => {

    const [task, setValues] = useState({
        task:'',
        taskDescription:'',
        taskPersonal:'',
        taskStatus:false
    });

    const handleInputChange = e => {
        const target= e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setValues({ ...task, [name]: value });
        //console.log(task);
    }

    const handleSubmit = e => {

        e.preventDefault();
        console.log(task)
        props.addTask(task);
        
    }

    const getLinkByid = async id =>{
      const docRef = doc(db, 'tasks', id);
      const q = await getDoc(docRef);
      
      setValues({...q.data()});
    }
    useEffect(() => {
        if (props.currentId === undefined || props.currentId === '') {
            setValues({})
        } else {
            getLinkByid(props.currentId)
        }
    }, [props.currentId])
    return (
        <form onSubmit={handleSubmit} className="card card-body" action="">
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">archive</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Asunto de la tareas"
                    name="task"
                    value={task.task}
                    onChange={ handleInputChange}
                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Escribe una nota personal sobre la tarea"
                    name="taskPersonal"
                    value={task.taskPersonal}
                    onChange={ handleInputChange}
                />
            </div>
            <div className="form-group input-group">
                <textarea
                    type="text"
                    className="form-control"
                    placeholder="Describe la tarea a realizar"
                    name="taskDescription"
                    value={task.taskDescription}
                    onChange={ handleInputChange}
                    rows={3}
                />
            </div>
            <div className="form-group ">
                <input
                    type="checkbox"
                    className="form-check-input ml-3"
                    name="taskStatus"
                    onChange={handleInputChange}
                    checked={task.taskStatus}
                />
                <label className="form-check-label" htmlFor="taskStatus">
                    Completada
                </label>
            </div>
            <button type="submit" className="btn btn-primary btn-block">{props.currentId === '' ? 'Guardar':'Actualizar'}</button>
        </form>
    )
}

export default TasksForm;