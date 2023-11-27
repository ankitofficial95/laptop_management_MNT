// EditLaptopScreen.js

import React from "react";
import { useDispatch } from "react-redux";
import { editLaptop } from "../slices/laptopSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const EditLaptopScreen = ({ laptop, onCancel, onUpdate }) => {
  const dispatch = useDispatch();

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
    "AMD Ryzen 9",
    "AMD Ryzen 7",
    "AMD Ryzen 5",
    "AMD Ryzen 3",
    "AMD Athlon",
    "Apple M1",
    "Apple M2",
    "ARM Cortex-A78",
    "ARM Cortex-A77",
    "ARM Cortex-A76",
    "ARM Cortex-A75",
    "ARM Cortex-A73",
    "ARM Cortex-A72",
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
  ];


  const initialValues = {
    lapName: laptop.lapName,
    lapSerialNumber: laptop.lapSerialNumber,
    lapModelNumber: laptop.lapModelNumber,
    lapOperatingSystem: laptop.lapOperatingSystem,
    lapCPUType: laptop.lapCPUType,
    lapRAMSize: laptop.lapRAMSize,
  };

  const validationSchema = Yup.object().shape({
    lapName: Yup.string().required("Laptop Name is required"),
    lapSerialNumber: Yup.string().required("Serial Number is required"),
    lapModelNumber: Yup.string().required("Model Number is required"),
    lapOperatingSystem: Yup.string().required("Operating System is required"),
    lapCPUType: Yup.string().required("CPU Type is required"),
    lapRAMSize: Yup.string().required("RAM Size is required"),
  });

  const onSubmit = async (values) => {
    dispatch(editLaptop({ id: laptop.id, ...values }));
    onUpdate();
  };

  return (
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
                    <div className="col-md-12">
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
                            <div className="mr-1">
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
                    Update Laptop2
                    </button>
                    <br></br>
                    <br></br>
                </div>
                </div>
                </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditLaptopScreen;
