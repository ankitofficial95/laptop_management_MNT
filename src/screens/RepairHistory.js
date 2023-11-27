import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const RepairHistory = () => {
  const laptops = useSelector((state) => state.laptops);

  const calculateDuration = (startDate) => {
    if (!startDate) {
        return '';
      }

    const currentDate = new Date();
    const start = new Date(startDate);
    const diffInMilliseconds = currentDate - start;

    const years = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    return `${years} years, ${months} months, ${days} days`;

  };
  return (
    <div>
      <div>
        <p className="lead text-center"> Laptop History</p>
        <hr></hr>

        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Serial Number</th>
              <th scope="col">Model</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Assigned Date</th>
              <th scope="col">Duration</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {laptops.map((laptop) => (
              <tr key={laptop.id}>
                <td>{laptop.id}</td>
                <td>{laptop.lapSerialNumber}</td>
                <td>{laptop.lapModelNumber}</td>
                <td>{laptop.lapAssignedTo} </td>
                <td>{laptop.lapAssignedDate}</td>
                <td>{calculateDuration(laptop.lapAssignedDate)}</td>
                <td><p className="btn btn-outline-dark btn-sm">{laptop.lapAssignedTo ? "Active" : "Not Active"}</p></td>
                <td>
                    <Link to={`/dashboard/laptopList/edit/${laptop.id}`}>
                    <button className="btn btn-primary btn-sm">Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br></br>
      <div></div>
    </div>
  );
};