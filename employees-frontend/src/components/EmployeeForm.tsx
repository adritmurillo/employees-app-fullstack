import { useEffect, useState } from "react";
import { createEmployee, getEmployeeById, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams, Link } from "react-router-dom"; // 👈 Importamos useParams
import type { Employee } from "../models/Employee";

export const EmployeeForm = () => {
  let navigate = useNavigate();
  
  // 1. Obtenemos el ID de la URL (si existe)
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: "",
    area: "",
    salary: 0 
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // 2. Efecto: Si hay un ID, cargamos los datos del empleado
  useEffect(() => {
    if (id) {
        loadEmployee(Number(id));
    }
  }, [id]);

  const loadEmployee = async (employeeId: number) => {
      try {
          const data = await getEmployeeById(employeeId);
          // Rellenamos el estado con los datos que vinieron de la BD
          setEmployee({
              name: data.name,
              area: data.area,
              salary: data.salary
          });
      } catch (error) {
          console.error("Error loading employee:", error);
      }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 3. Decidimos: ¿Crear o Actualizar?
    if (id) {
        // MODO EDICIÓN
        await updateEmployee(Number(id), employee as Employee);
    } else {
        // MODO CREACIÓN
        await createEmployee(employee as Employee);
    }
    
    navigate("/");
  };

  // Título dinámico
  const title = id ? "Edit Employee" : "Register Employee";

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">{title}</h2> {/* 👈 Título cambia solo */}
          
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="name"
                value={employee.name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="area" className="form-label">Area</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter area"
                name="area"
                value={employee.area}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">Salary</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter salary"
                name="salary"
                value={employee.salary}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-outline-light">
              Submit
            </button>
            <Link className="btn btn-danger btn-outline-light mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};