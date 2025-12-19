package com.joacode.employees.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponse {
    private Integer employeeId;
    private String name;
    private String area;
    private Double salary;
}
