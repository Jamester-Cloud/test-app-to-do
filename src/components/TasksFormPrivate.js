import React, { useState, useEffect } from "react";
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useAuth } from "../context/authContex";

const TasksFormPrivate = (props) => {
    const [categories, setCategories] = useState([]);
    const { user } = useAuth();

    const [task, setValues] = useState({
        task: '',
        taskDescription: '',
        taskPersonal: '',
        taskIdCategory: '',
        idUser: '',
        taskStatus: false
    });

    const getCategories = async () => {
        const tasks = await getDocs(collection(db, "categories"));
        const docs = [];
        tasks.forEach((d) => {
            docs.push({ ...d.data(), id: d.id })
        })
        setCategories(docs);
    }

    const handleInputChange = e => {
        const target = e.target;
        //detectar tipo de input select
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setValues({ ...task, [name]: value, idUser: user.uid });
    }

    const handleSubmit = e => {

        e.preventDefault();
        props.addTask(task);

        setValues({
            task: '',
            taskDescription: '',
            taskPersonal: '',
            idUser: '',
            taskIdCategory: '',
            taskStatus: false
        });
    }

    const getLinkByid = async id => {
        const docRef = doc(db, 'tasks', id);
        const q = await getDoc(docRef);

        setValues({ ...q.data() });
    }
    useEffect(() => {
        getCategories();
        if (props.currentId === undefined || props.currentId === '') {
            setValues({})
        } else {
            getLinkByid(props.currentId)
        }
    }, [props.currentId])
    return (
        <form onSubmit={handleSubmit} className="card card-body">
            {/* <input type="hidden" name="userId" onChange={handleInputChange} value={task.idUser} /> */}
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">archive</i>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Asunto de la tareas"
                    name="task"
                    value={task.task || ''}
                    onChange={handleInputChange}
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
                    value={task.taskPersonal || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">assignment</i>
                </div>
                <select name="taskCategory" value={task.taskIdCategory} className="form-select" onChange={handleInputChange} id="taskCategory">
                    <option value=""></option>
                    {
                        categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.category}</option>
                        ))
                    }
                </select>
            </div>
            <div className="form-group input-group">
                <textarea
                    className="form-control"
                    placeholder="Describe la tarea a realizar"
                    name="taskDescription"
                    value={task.taskDescription || ''}
                    onChange={handleInputChange}
                    rows={3}
                />
            </div>
            <div className="form-group ">
                <input
                    type="checkbox"
                    className="form-check-input ml-3"
                    name="taskStatus"
                    onChange={handleInputChange}
                    checked={task.taskStatus || false}
                />
                <label className="form-check-label" htmlFor="taskStatus">
                    Finalizada
                </label>
            </div>
            <button type="submit" className="btn btn-primary btn-block">{props.currentId === '' ? 'Guardar' : 'Actualizar'}</button>
        </form>
    )
}

export default TasksFormPrivate;