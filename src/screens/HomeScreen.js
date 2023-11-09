import React from "react";

export const HomeScreen = (props) => {
  return (
    <div className="title">
      <div className="my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold text-body-emphasis">MindNerves</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            We are your trusted cloud application development company.
            Specializing in crafting tailored solutions, we harness the
            potential of cloud technology to elevate your business. Explore
            seamless scalability and top-tier cloud application development
            services that drive growth.
          </p>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}></div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="card" style={{ width: "18rem", margin: "10px" }}>
          <img
            src="/assets/img1.jpeg"
            className="card-img-top"
            alt="Card Image1"
          />
          <div className="card-body">
            <h5 className="card-title">Managing IT Infrastructure ERP</h5>
            <p className="card-text">
            Unleash the potential of your IT landscape. Our management 
            solutions optimize performance, security, and scalability, driving your digital success.
            </p>
          </div>
        </div>

        <div className="card" style={{ width: "18rem", margin: "10px" }}>
          <img
            src="/assets/img3.jpeg"
            className="card-img-top"
            alt="Card Image3"
          />
          <div className="card-body">
            <h5 className="card-title">Business boosting ERP and Others</h5>
            <p className="card-text">
             Unlock efficient management with our integrated ERP solutions, 
             optimizing processes and enhancing organizational performance.
            </p>
          </div>
        </div>

        <div className="card" style={{ width: "18rem", margin: "10px" }}>
          <img
            src="/assets/img2.jpeg"
            className="card-img-top"
            alt="Card Image2"
          />
          <div className="card-body">
            <h5 className="card-title">Cloud Development Applications</h5>
            <p className="card-text">
              Elevate your applications with cloud-based innovation. Our
              expertise in cloud development empowers you to harness the full
              potential of cloud technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
