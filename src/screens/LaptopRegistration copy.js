import React, { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerLaptopUser } from "../slices/laptopRegisterSlice";


const updateLocalStorage = (data) => {
  console.log('update storage called for new laptop registration !!!');
  const storedData =
    JSON.parse(localStorage.getItem("laptopRegistrations")) || [];
  storedData.push(data);
  localStorage.setItem("laptopRegistrations", JSON.stringify(storedData));
  console.log('local storage updated with new laptop registration !!!');
};



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

const LaptopRegistration = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const initialValues = {
    lapName: "",
    lapSerialNumber: "",
    lapModelNumber: "",
    lapOperatingSystem: "",
    lapCPUType: "",
    lapRAMSize: "",
  };

  const validationSchema = Yup.object().shape({
    lapName: Yup.string().required("Laptop Name is required"),
    lapSerialNumber: Yup.string().required("Serial Number is required"),
    lapModelNumber: Yup.string().required("Model Number is required"),
    lapOperatingSystem: Yup.string().required("Operating System is required"),
    lapCPUType: Yup.string().required("CPU Type is required"),
    lapRAMSize: Yup.string().required("RAM Size is required"),
  });

  const alertOnRegistration = () => {
    alert("Laptop Registration successful !!!");
  };

  const onSubmit = async (values, props) => {
    console.log("on submit called");
    alertOnRegistration();
    await updateLocalStorage(values); // Wait
    dispatch(registerLaptopUser(values));
    props.resetForm();
  };

  useEffect(() => {
    if (!localStorage.getItem("laptopRegistrations")) {
      localStorage.setItem("laptopRegistrations", "[]");
    }
  }, []);

  if (!user) {
    return (
      <div>
        <p className="lead text-center">
          Login first to see the Laptop Services !!
        </p>
      </div>
    );
  }

  return (
<div>
<p className="lead text-start px-2"> Laptop Registration </p>
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {() => (
      <Form>
        <div className="px-4">
          <div className="row">
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-3">
                  <label className="form-label">Laptop Brand</label>
                  <Field as="select" name="lapName" className="form-control">
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
                  <label className="form-label">Operating System</label>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-start">
            <button className="btn btn-primary mt-4" type="submit">
              Register Laptop
            </button>
          </div>
        </div>
      </Form>
    )}
  </Formik>
</div>

  );
};

export default LaptopRegistration;
