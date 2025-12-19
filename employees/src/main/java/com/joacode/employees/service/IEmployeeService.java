package com.joacode.employees.service;

import com.joacode.employees.dto.request.EmployeeRequest;
import com.joacode.employees.dto.response.EmployeeResponse;
import com.joacode.employees.entity.Employee;

import java.util.List;

public interface IEmployeeService {
    List<EmployeeResponse> listEmployees();
    EmployeeResponse findEmployeeById(Integer employeeId);
    EmployeeResponse saveEmployee(EmployeeRequest employeeRequest);
    EmployeeResponse updateEmployee(Integer employeeId, EmployeeRequest employeeRequest);
    void deleteEmployee(Integer employeeId);
}
