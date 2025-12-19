package com.joacode.employees.controller;


import com.joacode.employees.dto.request.EmployeeRequest;
import com.joacode.employees.dto.response.EmployeeResponse;
import com.joacode.employees.service.IEmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmployeeController {
    private final IEmployeeService employeeService;

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> listEmployees(){
        return ResponseEntity.ok(employeeService.listEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> findEmployeeById(@PathVariable Integer id){
        return ResponseEntity.ok(employeeService.findEmployeeById(id));
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> saveEmployee(@RequestBody EmployeeRequest employeeRequest){
        EmployeeResponse newEmployee = employeeService.saveEmployee(employeeRequest);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable Integer id,
            @RequestBody EmployeeRequest employeeRequest
    ){
        return ResponseEntity.ok(employeeService.updateEmployee(id, employeeRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Integer id){
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
}
