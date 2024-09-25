package com.example.emp.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.emp.Entity.Employee;
import com.example.emp.Repository.EmployeeRepository;


@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public List<Employee> searchEmployees(String query) {
        try {
            Long id = Long.parseLong(query);
            return employeeRepository.findByNameContainingIgnoreCaseOrId(null, id);
        } catch (NumberFormatException e) {
            return employeeRepository.findByNameContainingIgnoreCaseOrId(query, null);
        }
    }

    public Employee updateEmployee(Long id, Employee newDetails) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        if (existingEmployee != null) {
            existingEmployee.setName(newDetails.getName());
            existingEmployee.setEmail(newDetails.getEmail());
            existingEmployee.setPhoneNumber(newDetails.getPhoneNumber());  // Updated
            existingEmployee.setAddress(newDetails.getAddress());          // Updated
            existingEmployee.setDepartment(newDetails.getDepartment());
            return employeeRepository.save(existingEmployee);
        }
        return null;
    }
}
