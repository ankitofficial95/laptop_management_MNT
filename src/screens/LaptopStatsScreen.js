import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

export const LaptopStatsScreen = () => {
  const laptops = useSelector((state) => state.laptops);
  const [search, setSearch] = useState("");
  const [assignedOnly, setAssignedOnly] = useState(false);

  const filteredLaptops = laptops.filter((item) => {
    const lowerSearch = search.toLowerCase();
    return (
      (!assignedOnly || (item.lapAssignedTo && item.lapAssignedTo.trim() !== "")) &&
      (lowerSearch === "" ||
        Object.values(item).some(
          (value) =>
            value &&
            typeof value === "string" &&
            value.toLowerCase().includes(lowerSearch)
        ))
    );
  });

  const handleAssignedLaptopsClick = () => {
    setAssignedOnly(true);
    setSearch("");
  };

  const handleClearClick = () => {
    setAssignedOnly(false);
    setSearch("");
  };

  return (
    <div>
      <p className="lead text-center">Laptop Statistics</p>
      <hr></hr>

      <div>
        <div>
          <button className="btn btn-outline-success mr-2" onClick={handleAssignedLaptopsClick}>Assigned Laptops</button>
          <button className="btn btn-outline-danger" onClick={handleClearClick}>Clear</button>
        </div>

        <hr></hr>
      </div>
      <div>
        <Form>
          <InputGroup className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Filter"
            />
          </InputGroup>
        </Form>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Assigned Date</th>
              <th scope="col">Assigned To</th>
              <th scope="col">CPU</th>
              <th scope="col">Model</th>
              <th scope="col">Brand</th>
              <th scope="col">OS</th>
              <th scope="col">RAM</th>
              <th scope="col">Sr Number</th>
              <th scope="col">Speaker</th>
              <th scope="col">Webcam</th>
              <th scope="col">Mouse</th>
              <th scope="col">Charger</th>
              <th scope="col">Battery</th>
              <th scope="col">Keyboard</th>
              <th scope="col">Mic</th>
            </tr>
          </thead>
          <tbody>
            { filteredLaptops
              .filter((item) => {
                const lowerSearch = search.toLowerCase();
                return Object.values(item).some((value) =>
                    value && typeof value === "string" && value.toLowerCase().includes(lowerSearch)
                );
              })
              .map((laptop) => (
                <tr key={laptop.id}>
                  <td>{laptop.id}</td>
                  <td>{laptop.lapAssignedDate}</td>
                  <td>{laptop.lapAssignedTo}</td>
                  <td>{laptop.lapCPUType}</td>
                  <td>{laptop.lapModelNumber}</td>
                  <td>{laptop.lapName} </td>
                  <td>{laptop.lapOperatingSystem}</td>
                  <td>{laptop.lapRAMSize} </td>
                  <td>{laptop.lapSerialNumber}</td>
                  <td>{laptop.lapSpeakerStatus} </td>
                  <td>{laptop.lapWebCamStatus}</td>
                  <td>{laptop.lapWebMouseStatus} </td>
                  <td>{laptop.lapChanrgerStatus} </td>
                  <td>{laptop.lapBatteryStatus} </td>
                  <td>{laptop.lapKeyboardStatus}</td>
                  <td>{laptop.lapMicStatus} </td>
                </tr>
              ))}
              
          </tbody>
        </table>
      </div>
    </div>
  );
};
