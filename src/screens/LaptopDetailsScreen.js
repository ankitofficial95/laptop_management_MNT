import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const LaptopDetailsScreen = () => {
  const { id } = useParams();
  const laptops = useSelector((state) => state.laptops);
  const navigate = useNavigate();

  const laptop = laptops.find((laptop) => laptop.id === parseInt(id));

  const tableStyle = {
    width: "50%", 
  };

  const outForRepairDate = [
    new Date("2023-10-15"),
    new Date("2022-11-03"),
    new Date("2020-12-03"),
  ];

  const inFromRepairDate = [
    new Date("2023-11-15"),
    new Date("2022-11-07"),
    new Date("2020-09-03"),
  ];

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <p className="lead text-center">Laptop Details</p>
      <hr></hr>

      <table className="table table-hover" style={tableStyle}>
        <tbody>
          <tr>
            <td>Laptop Name</td>
            <td>{laptop.lapName}</td>
          </tr>
          <tr>
            <td>Serial Number</td>
            <td>{laptop.lapSerialNumber}</td>
          </tr>
          <tr>
            <td>Out for Repair Date</td>
            <td>
              {outForRepairDate.map((date, index) => (
                <div key={index}>{date.toLocaleDateString()}</div>
              ))}
            </td>
            <td>In from Repair Date</td>
            <td>
              {inFromRepairDate.map((date, index) => (
                <div key={index}>{date.toLocaleDateString()}</div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>

      <button className="btn btn-outline-primary" onClick={handleBack}>
                Back
      </button>

    </div>
  );
};
