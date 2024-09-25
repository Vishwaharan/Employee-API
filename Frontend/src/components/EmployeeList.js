// src/components/EmployeeList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./EmployeeList.css"; // Custom styles

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = searchQuery
          ? await axios.get(
              `http://localhost:8080/employees/search?query=${searchQuery}`
            )
          : await axios.get("http://localhost:8080/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchData();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8080/employees/${id}`);
        setEmployees(employees.filter((emp) => emp.id !== id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  return (
    <>
      <div className="employee-list-container">
        <h1 className="employee-list-title">Employee Directory</h1>
        <div className="search-and-add-container">
          <div>
            <Link to="/add" className="btn btn-primary add-button">
              Add New Employee
            </Link>
          </div>
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>{" "}
            {/* Icon placed here */}
            <input
              type="text"
              placeholder="Search by ID or Name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>

        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th> {/* Changed to Name */}
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td> {/* Changed to name */}
                  <td>{employee.email}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.address}</td>
                  <td>{employee.department}</td>
                  <td className="actions">
                    <Link
                      to={`/edit/${employee.id}`}
                      className="btn btn-warning edit-button"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteEmployee(employee.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-employees">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
