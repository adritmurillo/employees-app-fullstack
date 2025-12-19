package com.joacode.employees.service.implementation;

import com.joacode.employees.dto.request.EmployeeRequest;
import com.joacode.employees.dto.response.EmployeeResponse;
import com.joacode.employees.entity.Employee;
import com.joacode.employees.exception.NotFoundException;
import com.joacode.employees.mapper.EmployeeMapper;
import com.joacode.employees.repository.EmployeeRepository;
import com.joacode.employees.service.IEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService implements IEmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeResponse> listEmployees() {
        return employeeRepository.findAll().stream().map(employeeMapper :: toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeResponse findEmployeeById(Integer employeeId) {
        return employeeMapper.toResponse(employeeRepository.findById(employeeId)
                .orElseThrow(()-> new NotFoundException("Employee not found with ID: " + employeeId)));
    }

    @Override
    @Transactional
    public EmployeeResponse saveEmployee(EmployeeRequest employeeRequest) {
        return employeeMapper.toResponse(
                employeeRepository.save(employeeMapper.toEntity(employeeRequest))
        );
    }

    @Override
    @Transactional
    public EmployeeResponse updateEmployee(Integer employeeId, EmployeeRequest employeeRequest) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new NotFoundException("Can't update. Employee not found with ID: " + employeeId)
        );

        employee.setName(employeeRequest.getName());
        employee.setArea(employeeRequest.getArea());
        employee.setSalary(employeeRequest.getSalary());

        Employee updatedEmployee = employeeRepository.save(employee);
        return employeeMapper.toResponse(updatedEmployee);
    }

    @Override
    @Transactional
    public void deleteEmployee(Integer employeeId) {
        if(!employeeRepository.existsById(employeeId)){
            throw new NotFoundException("Employee not found with ID: " + employeeId);
        }
        employeeRepository.deleteById(employeeId);
    }
}
