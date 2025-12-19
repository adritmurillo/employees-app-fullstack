package com.joacode.employees.mapper;


import com.joacode.employees.dto.request.EmployeeRequest;
import com.joacode.employees.dto.response.EmployeeResponse;
import com.joacode.employees.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {
    public Employee toEntity(EmployeeRequest employeeRequest) {
        if(employeeRequest == null) return null;
        return Employee.builder()
                .name(employeeRequest.getName())
                .area(employeeRequest.getArea())
                .salary(employeeRequest.getSalary())
                .build();
    }

    public EmployeeResponse toResponse(Employee employee){
        if (employee == null) return null;

        return EmployeeResponse.builder()
                .employeeId(employee.getEmployeeId())
                .name(employee.getName())
                .area(employee.getArea())
                .salary(employee.getSalary())
                .build();
    }
}
