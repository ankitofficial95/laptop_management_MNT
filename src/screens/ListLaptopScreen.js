import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLaptops, removeLaptop } from "../slices/laptopSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

function ListLaptopScreen() {
  const [shouldRerender, setShouldRerender] = useState(false);
  const dispatch = useDispatch();
  const laptops = useSelector((state) => state.laptops);
  const user = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [laptopNeedToEdit, setLaptopNeedToEdit] = useState(null);

  const handleEditLaptop = (laptopID) => {
    const laptopNeedToEdit = laptops.find((laptop) => laptop.id === laptopID);
    setLaptopNeedToEdit(laptopNeedToEdit);
    setIsEditing(true);
  };

  const updateLocalStorageAfterDelete = (id) => {
    console.log("ID:", id);
    const currentRegistrations =
      JSON.parse(localStorage.getItem("laptopRegistrations")) || [];
    console.log("currentRegistrations:", currentRegistrations);

    const updatedRegistrations = currentRegistrations.filter(
      (laptop) => laptop.id !== id
    );
    console.log("Updated registrations:", updatedRegistrations);

    if (updatedRegistrations.length !== currentRegistrations.length) {
      localStorage.setItem(
        "laptopRegistrations",
        JSON.stringify(updatedRegistrations)
      );
      console.log(
        "Local storage updated with modified data:",
        updatedRegistrations
      );
    } else {
      console.log("Laptop not found in local storage with ID:", id);
    }
  };

  const handleDeleteLaptop = (id) => {
    dispatch(removeLaptop(id));
    setShouldRerender(true);
    console.log("Laptop deleted from Redux with ID:", id);
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

  if (!user) {
    return (
      <div>
        <p className="lead text-center">
          {" "}
          Login first to see the Laptop Services !!
        </p>
      </div>
    );
  }

  if (laptops.length === 0) {
    return (
      <div>
        {" "}
        <p className="lead text-center"> No laptops found !!</p>
      </div>
    );
  }

  const lapBrand = [
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Acer",
    "Apple",
    "Microsoft",
    "Sony",
    "Toshiba",
    "Samsung",
    "MSI",
    "LG",
    "Razer",
    "Huawei",
    "Fujitsu",
    "Panasonic",
    "Alienware",
    "Gateway",
    "Chromebook",
    "Sony VAIO",
  ];

  const operatingSystems = ["Windows", "macOS", "Linux"];
  const cpuTypes = [
    "Intel Core i9",
    "Intel Core i7",
    "Intel Core i5",
    "Intel Core i3",
    "Intel Pentium",
    "Intel Celeron",
    "AMD Ryzen 9",
    "AMD Ryzen 7",
    "AMD Ryzen 5",
    "AMD Ryzen 3",
    "AMD Athlon",
    "Apple M1",
    "Qualcomm Snapdragon",
    "Samsung Exynos",
    "ARM Cortex-A78",
    "ARM Cortex-A77",
    "ARM Cortex-A76",
    "ARM Cortex-A75",
    "ARM Cortex-A73",
    "ARM Cortex-A72",
    "ARM Cortex-A65",
    "ARM Cortex-A57",
    "ARM Cortex-A53",
    "ARM Cortex-A55",
    "ARM Cortex-A35",
    "Other Intel Core",
    "Other Intel Xeon",
    "Other Intel Atom",
    "Other AMD Threadripper",
    "Other AMD FX",
    "Other AMD A-Series",
    "Other MIPS",
    "Other SPARC",
    "Other PowerPC",
    "Other RISC-V",
    "Qualcomm Snapdragon 8cx",
    "Qualcomm Snapdragon 7c",
    "Qualcomm Snapdragon 6c",
    "Qualcomm Snapdragon 8cx Gen 2",
    "Samsung Exynos 9",
    "Samsung Exynos 7",
    "Samsung Exynos 5",
    "Samsung Exynos 4",
    "Apple A14 Bionic",
    "Apple A13 Bionic",
    "Apple A12 Bionic",
    "Apple A11 Bionic",
    "Other Apple",
    "Other",
  ];

  const ramSizes = [
    "2 GB",
    "4 GB",
    "8 GB",
    "16 GB",
    "32 GB",
    "64 GB",
    "128 GB",
    "256 GB",
    "512 GB",
    "1 TB",
    "2 TB",
    "4 TB",
    "8 TB",
    "16 TB",
    "32 TB",
  ];

  const initialValues = {
    lapName: laptopNeedToEdit ? laptopNeedToEdit.lapName : "",
    lapSerialNumber: laptopNeedToEdit ? laptopNeedToEdit.lapSerialNumber : "",
    lapModelNumber: laptopNeedToEdit ? laptopNeedToEdit.lapModelNumber : "",
    lapOperatingSystem: laptopNeedToEdit ? laptopNeedToEdit.lapOperatingSystem : "",
    lapCPUType: laptopNeedToEdit ? laptopNeedToEdit.lapCPUType : "",
    lapRAMSize: laptopNeedToEdit ? laptopNeedToEdit.lapRAMSize : "",
  };

  const validationSchema = Yup.object().shape({
    lapName: Yup.string().required("Laptop Name is required"),
    lapSerialNumber: Yup.string().required("Serial Number is required"),
    lapModelNumber: Yup.string().required("Model Number is required"),
    lapOperatingSystem: Yup.string().required("Operating System is required"),
    lapCPUType: Yup.string().required("CPU Type is required"),
    lapRAMSize: Yup.string().required("RAM Size is required"),
  });

  const updateLocalStorageAfterEdit = (newData) => {
    console.log("Update storage called, laptop update !!!");
    console.log(newData);
  
    const currentRegistrations = JSON.parse(localStorage.getItem("laptopRegistrations")) || [];
  
    const indexToUpdate = currentRegistrations.findIndex((laptop) => laptop.id === laptopNeedToEdit.id);
  
    if (indexToUpdate !== -1) {
      currentRegistrations[indexToUpdate] = { ...currentRegistrations[indexToUpdate], ...newData };
    } else {
      console.log("Laptop not found in local storage with ID:", newData.id);
    }
  
    localStorage.setItem("laptopRegistrations", JSON.stringify(currentRegistrations));
  };
  
  

  const alertOnUpdate = () => {
    alert("Laptop Update successful !!!");
  };

  const onSubmit = async (values, props) => {
    console.log("on submit called");
    alertOnUpdate();
    await updateLocalStorageAfterEdit(values); // Wait
    //  alertOnRegistration();
    // await updateLocalStorage(values); // Wait
    // dispatch(registerLaptopUser(values));
    // props.resetForm();
  };

  return (
    <div>
      {isEditing ? (
        <div>
 <div style={{ width: '50%', height: '50%' }}>
    <p className="lead text-center">Edit Laptop Details</p>
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Property</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(laptopNeedToEdit).map((key, index) => (
          <tr key={key}>
            <th scope="row">{index + 1}</th>
            <td>{key}</td>
            <td>{laptopNeedToEdit[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

          <br></br>

          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <Form>
                  <div className="px-4">
                    <div className="row"></div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-3">
                            <label className="form-label">Laptop Brand</label>
                            <Field
                              as="select"
                              name="lapName"
                              className="form-control"
                            >
                              <option value="" disabled>
                                Select a brand
                              </option>
                              {lapBrand.map((brand) => (
                                <option key={brand} value={brand}>
                                  {brand}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="lapName"
                              component="div"
                              className="error"
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Model Number</label>
                            <Field
                              type="text"
                              name="lapModelNumber"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="lapModelNumber"
                              component="div"
                              className="error"
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Serial Number</label>
                            <Field
                              type="text"
                              name="lapSerialNumber"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="lapSerialNumber"
                              component="div"
                              className="error"
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">
                              Operating System
                            </label>
                            <Field
                              as="select"
                              name="lapOperatingSystem"
                              className="form-control"
                            >
                              <option value="" disabled>
                                Select an Operating System
                              </option>
                              {operatingSystems.map((os, index) => (
                                <option key={index} value={os}>
                                  {os}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="lapOperatingSystem"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-6">
                                <label className="form-label">CPU Type</label>
                                <Field
                                  as="select"
                                  name="lapCPUType"
                                  className="form-control"
                                >
                                  <option value="" disabled>
                                    Select a CPU Type
                                  </option>
                                  {cpuTypes.map((cpuType, index) => (
                                    <option key={index} value={cpuType}>
                                      {cpuType}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  name="lapCPUType"
                                  component="div"
                                  className="error"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">RAM Size</label>
                                <Field
                                  as="select"
                                  name="lapRAMSize"
                                  className="form-control"
                                >
                                  <option value="" disabled>
                                    Select RAM Size
                                  </option>
                                  {ramSizes.map((ramSize, index) => (
                                    <option key={index} value={ramSize}>
                                      {ramSize}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  name="lapRAMSize"
                                  component="div"
                                  className="error"
                                />
                                <br></br>
                                <br></br>
                              </div>

                              <div className="col-md-3">
                                <label>Battery</label>
                                <div>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapBatteryStatus"
                                      value="working"
                                    />
                                    Working
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapBatteryStatus"
                                      value="notWorking"
                                    />
                                    Not Working
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label>Mic</label>
                                <div>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapMicStatus"
                                      value="working"
                                    />
                                    Working
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapMicStatus"
                                      value="notWorking"
                                    />
                                    Not Working
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label>Keyboard</label>
                                <div>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapKeyboardStatus"
                                      value="working"
                                    />
                                    Working
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapKeyboardStatus"
                                      value="notWorking"
                                    />
                                    Not Working
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label>WebCam</label>
                                <div>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapWebCamStatus"
                                      value="working"
                                    />
                                    Working
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapWebCamStatus"
                                      value="notWorking"
                                    />
                                    Not Working
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label>Mouse</label>
                                <div>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapWebMouseStatus"
                                      value="working"
                                    />
                                    Working
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapWebMouseStatus"
                                      value="notWorking"
                                    />
                                    Not Working
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label>Speaker</label>
                                <div>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapSpeakerStatus"
                                      value="working"
                                    />
                                    Working
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapSpeakerStatus"
                                      value="notWorking"
                                    />
                                    Not Working
                                  </label>
                                </div>
                              </div>

                              <div className="col-md-3">
                                <label>Chanrger</label>
                                <div>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapChanrgerStatus"
                                      value="working"
                                    />
                                    Working
                                  </label>
                                  <label>
                                    <Field
                                      type="radio"
                                      name="lapChanrgerStatus"
                                      value="notWorking"
                                    />
                                    Not Working
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-start">
                      <button className="btn btn-primary mt-4" type="submit">
                        Update Laptop
                      </button>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <div>
          <p className="lead text-center"> Laptop Details </p>
          <table className="table table-hover">
            <thead>
              <tr>
              <th scope="col">Id</th>
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
                <tr key={laptop.id}>
                  <td>{laptop.id}</td>
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
                      onClick={() => handleEditLaptop(laptop.id)}
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
