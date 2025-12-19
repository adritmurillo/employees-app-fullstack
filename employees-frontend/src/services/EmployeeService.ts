import axios from 'axios';
import type { Employee } from '../models/Employee';

const API_URL = 'http://localhost:8080/api/employees';

export const listEmployees = async () => {
    const response = await axios.get<Employee[]>(API_URL); 
    return response.data;
}

export const createEmployee = async (employee: Employee) => {
    return await axios.post(API_URL, employee);
}

export const deleteEmployee = async (employeeId: number) => {
    await axios.delete(`${API_URL}/${employeeId}`);
}

export const getEmployeeById = async (employeeId: number) => {
    const response = await axios.get<Employee>(`${API_URL}/${employeeId}`);
    return response.data;
}

export const updateEmployee = async (employeeId: number, employee: Employee) => {
    return await axios.put(`${API_URL}/${employeeId}`, employee);
}