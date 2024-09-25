import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EmployeeForm.css"; // Custom styles

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    id: "", // Include ID in state
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    department: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/employees/${id}`)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => console.error("Error fetching employee:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = id
      ? axios.put(`http://localhost:8080/employees/${id}`, employee)
      : axios.post("http://localhost:8080/employees", employee);

    apiCall
      .then(() => navigate("/"))
      .catch((error) =>
        console.error(
          id ? "Error updating employee:" : "Error creating employee:",
          error
        )
      );
  };

  return (
    <div className="employee-form-container">
      <h1>{id ? "Edit Employee" : "Add Employee"}</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        {/* Render ID field when editing */}
        {id && (
          <div className="form-group">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={employee.id} // Bind the ID field to state
              onChange={handleChange}
              placeholder="Employee ID"
              className="form-control"
              disabled // Disable the input
            />
          </div>
        )}
        {Object.entries(employee).map(
          ([key, value]) =>
            key !== "id" && ( // Exclude the ID field from the map
              <div className="form-group" key={key}>
                <label htmlFor={key}>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                  :
                </label>
                {key === "address" ? (
                  <textarea
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    placeholder={`Enter ${
                      key.charAt(0).toUpperCase() + key.slice(1)
                    }`}
                    className="form-control"
                    required
                  />
                ) : (
                  <input
                    type={key === "email" ? "email" : "text"}
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    placeholder={`Enter ${
                      key === "phoneNumber"
                        ? "Phone Number"
                        : key.charAt(0).toUpperCase() + key.slice(1)
                    }`}
                    className="form-control"
                    required
                  />
                )}
              </div>
            )
        )}

        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
