import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLaptops, removeLaptop } from "../slices/laptopSlice";
import { editLaptop } from "../slices/laptopSlice copy";

function ListLaptopScreen() {
  const [shouldRerender, setShouldRerender] = useState(false); 

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});


  const dispatch = useDispatch();
  const laptops = useSelector((state) => state.laptops);
  const user = useSelector((state) => state.auth.user);


  const updateLocalStorageAfterDelete=(id)=>{
    console.log('ID:', id);
    const currentRegistrations = JSON.parse(localStorage.getItem('laptopRegistrations')) || [];
  console.log('currentRegistrations:', currentRegistrations);

  const updatedRegistrations = currentRegistrations.filter((laptop) => laptop.id !== id);
  console.log('Updated registrations:', updatedRegistrations);

  if (updatedRegistrations.length !== currentRegistrations.length) {
    localStorage.setItem('laptopRegistrations', JSON.stringify(updatedRegistrations));
    console.log('Local storage updated with modified data:', updatedRegistrations);
      
  } else {
    console.log('Laptop not found in local storage with ID:', id);
  }
  }

  const handleDeleteLaptop = (id) => {
    dispatch(removeLaptop(id));
    setShouldRerender(true);
    console.log('Laptop deleted from Redux with ID:', id);
    updateLocalStorageAfterDelete(id);
 };

 useEffect(() => {
  if (shouldRerender) {
    dispatch(fetchLaptops());
    setShouldRerender(false); // Reset the state
  }
}, [shouldRerender, dispatch]);
  
  useEffect(() => {
    dispatch(fetchLaptops());
  }, [dispatch]);
  
  const handleEditLaptop = (laptop) => {
    console.log('edit called laptop');
    setIsEditing(true);
    setEditData(laptop);
  };

  const handleSaveEdit = () => {
    dispatch(editLaptop(editData)); // Update Redux store
    updateLocalStorageAfterEdit(editData.id, editData);
    setIsEditing(false);
  };

  const updateLocalStorageAfterEdit = (id, newData) => {
    const currentRegistrations = JSON.parse(localStorage.getItem('laptopRegistrations')) || [];
    const updatedRegistrations = currentRegistrations.map((laptop) => {
      if (laptop.id === id) {
        return { ...laptop, ...newData };
      }
      return laptop;
    });
  
    localStorage.setItem('laptopRegistrations', JSON.stringify(updatedRegistrations));
    console.log('Local storage updated with edited data:', updatedRegistrations);
  };
  

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div>
        <p className="lead text-center"> Login first to see the Laptop Services !!</p>
      </div>
    );
  }

  if (laptops.length === 0) {
    return (
      <div>   <p className="lead text-center"> No laptops found  !!</p>
      </div>
    );
  }

return (
  <div>
    {isEditing ? (
      <div>
        <p className="lead text-center">Edit Laptop Details</p>
        <form>
                        <div className="form-group">
                          <label>ID:</label>
                          <input type="text" value={editData.id} readOnly />
                        </div>
            {/* Add input fields for editing here */}
          <button
            className="btn btn-primary"
            onClick={handleSaveEdit}
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </form>
      </div>
    ) : (
      <div>
      <p className="lead text-center"> Laptop Details </p>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Serial Number</th>
            <th scope="col">CPU Type</th>
            <th scope="col">Model Number</th>
            <th scope="col">Brand</th>
            <th scope="col">Operating System</th>
            <th scope="col">RAM</th>
            <th scope="col">Speaker</th>
            <th scope="col">Mic</th>
            <th scope="col">Mouse</th>
            <th scope="col">Keyboard</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {laptops.map((laptop) => (
            <tr key={laptop.lapSerialNumber}>
              <td>{laptop.lapSerialNumber}</td>
              <td>{laptop.lapCPUType}</td>
              <td>{laptop.lapModelNumber}</td>
              <td>{laptop.lapName}</td>
              <td>{laptop.lapOperatingSystem}</td>
              <td>{laptop.lapRAMSize}</td>
              <td>{laptop.lapSpeaker}</td> 
              <td>{laptop.lapMic}</td>
              <td>{laptop.lapMouse}</td>
              <td>{laptop.lapKeyboard}</td>
              
              
              <td>
                <button
                  className="btn btn-outline-danger btn-sm  mr-1"
                  onClick={() => handleDeleteLaptop(laptop.id)}
                >
                  Delete
                </button>
              
                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={() => handleEditLaptop(laptop.lapSerialNumber)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
  </div>
);
}

export default ListLaptopScreen;
