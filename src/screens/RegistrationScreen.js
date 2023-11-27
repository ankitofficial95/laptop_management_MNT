import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from '../slices/registrationSlice';
import { useNavigate } from "react-router-dom";


const updateLocalStorage = (data) => {
  const storedData = JSON.parse(localStorage.getItem("registrations")) || [];
  storedData.push(data);
  localStorage.setItem("registrations", JSON.stringify(storedData));
};

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number is not valid")
      .min(10, "Password must be at least 6 characters")
      .required("Phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+/,
        "Password must include at least one uppercase letter, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const alertOnRegistration = () => {
    alert("Registration successful !!!")
  };

  const onSubmit = (values, props) => {
    //console.log("data:", values);
    console.log('user registeration called');
    alertOnRegistration();
    updateLocalStorage(values);
    dispatch(registerUser(values));
    props.resetForm();
  };

  useEffect(() => {
    if (!localStorage.getItem("registrations")) {
      localStorage.setItem("registrations", "[]");
    }
  }, []);

  return (
    <div className="container">
         <h2>Registration Form</h2>
         <hr></hr>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="form-box">
            <div className="form-floating mb-3">
              <label className="form-label">Name</label>
              <Field type="text" name="name" className="form-control form2" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <label className="form-label">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label className="form-label">Phone</label>
              <Field type="phone" name="phone" className="form-control" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            <div>
              <label className="form-label">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div>
              <label className="form-label">Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                className="form-control"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>
            <br></br>
            <div className="button-container">
              <button className="btn btn-primary" type="submit">
                Register
              </button>

              <br></br>
                <br></br>
                <small class="text-muted">Already a member ? Login here</small>
                <br></br>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationScreen;