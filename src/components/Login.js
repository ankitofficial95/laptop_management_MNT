import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginSuccess, setloginSuccess] = useState(false);
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
      console.log("Login successful");
      setloginSuccess(true)
    } else {
      console.log(" failed login");
    }
    props.resetForm();
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <div>
              <label className="form-label">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label className="form-label">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="button-container">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
              <span></span>
              <button className="btn btn-primary"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>


      <div className="registrationSuccess">
        {loginSuccess && (
          <div className="alert alert-success" role="alert">
            <h4 className="alert-heading">Well done!</h4>
            <p>Login Successful</p>
          </div>
        )}
      </div>


    </div>
  );
};

export default Login;
