import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/authSlice";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = (values, props) => {
    const storedData = JSON.parse(localStorage.getItem("registrations")) || [];
    const foundUser = storedData.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (foundUser) {
      dispatch(loginUser(foundUser));
      //console.log("User data dispatched:", foundUser);
      alert("Login Successfull !!!");
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
    props.resetForm();
  };

  return (
    <div className="container">
      <h2>Login form</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="login-form">
            <div>
              <label className="form-label">Email</label>
              <Field
                type="email"
                name="email"
                className="form-control small-input"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label className="form-label">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control small-input"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <br></br>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
            <br></br>
            <br></br>
            <small class="text-muted">Not a member ? Register here</small>
            <br></br>
            <button
              className="btn btn-primary mt-2"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
