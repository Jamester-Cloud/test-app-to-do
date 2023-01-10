import React from "react"
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

export const Datatable = (props) => {
    //styles for textfield

    const ExpandedComponent = ({ data }) =>
        <pre className="text-primary">
            <p>Tarea:{data.task}</p>
            <p>Descripcion:{data.taskDescription}</p>
            <p>Nota:{data.taskPersonal}</p>
            <p>Categoria:{data.taskCategory}</p>
            <p>Estado:{data.taskStatus === true ? 'Finalizada' : 'Pendiente'}</p>
        </pre>;
    const columns = [
        {
            name: 'Tarea',
            selector: row => row.task,
        },
        {
            name: 'Categoria',
            selector: row => row.taskCategory,
            sortable: true,
        },
        {
            name: 'Descripcion',
            selector: row => row.taskDescription,
            sortable: true,
        },
        {
            name: 'Nota Personal',
            selector: row => row.taskPersonal,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.taskStatus === true ? 'Finalizada' : 'Pendiente',
            sortable: true
        },
        {
            selector: function (data) {
                return <button
                    className="btn btn-info btn-sm d-flex align-items-center"
                    onClick={() => props.setCurrentId(data.id)}
                >
                    <i className="material-icons">create</i>
                </button>;
            }
        },
        {
            selector: function (data) {
                return <button
                    className="btn btn-danger btn-sm d-flex align-items-center"
                    onClick={(e) => {
                        e.stopPropagation();
                        props.onDeleteLink(data.id);
                    }}
                >
                    <i className="material-icons">close</i>

                </button>;
            }
        }
    ];

    return (

        <DataTable
            title="Tareas"
            className="w-100"
            columns={columns}
            data={props.data}
            noDataComponent="No hay nada que mostrar aqui :("
            expandableRows
            expandableRowsComponent={ExpandedComponent}
        />
    )

}