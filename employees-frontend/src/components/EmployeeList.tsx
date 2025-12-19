import { useEffect, useState } from 'react';
import type { Employee } from '../models/Employee';
import { listEmployees, deleteEmployee } from '../services/EmployeeService'; 
import { Link } from "react-router-dom";

export const EmployeeList = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const data = await listEmployees();
        setEmployees(data);
    }

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            await deleteEmployee(id); 
            loadEmployees();         
        }
    }

    return (
        <div className="container">
            <h3 className="text-center my-4">List of Employees</h3>

            <div className="d-flex mb-3">
                <Link to="/add-employee" className="btn btn-primary btn-lg">
                    Add Employee
                </Link>
            </div>

            <table className="table table-striped table-hover table-bordered shadow">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Area</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>{employee.name}</td>
                            <td>{employee.area}</td>
                            <td>
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(employee.salary)}
                            </td>
                            {/* 👇 COLUMNA DE ACCIONES */}
                            <td>
                                <div className="d-flex gap-2 justify-content-center">
                                    {/* Botón Editar (Navega a otra ruta) */}
                                    <Link 
                                        to={`/edit-employee/${employee.employeeId}`} 
                                        className="btn btn-warning btn-sm"
                                    >
                                        Edit
                                    </Link>

                                    {/* Botón Eliminar (Ejecuta acción directa) */}
                                    <button 
                                        onClick={() => handleDelete(employee.employeeId)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}