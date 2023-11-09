import React from "react";

export const ContactScreen = (props) => {
  return (
    <div className="title">
      <div className="title">
        <div class="container" id="featured-3">
        <h1 className="display-4 fw-bold text-body-emphasis">Contact us</h1>
          <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div class="feature col">
              <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"></div>
              <h3 class="fs-2 text-body-emphasis">Contact us </h3>
              <div className="d-flex justify-content-center">
                <div
                  className="card"
                  style={{ width: "18rem", margin: "10px" }}
                >
                  <img
                    src="/assets/img1.jpeg"
                    className="card-img-top"
                    alt="Card Image1"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      Managing IT Infrastructure ERP <br/><br/>
                    </h5>
                    <p className="card-text">
                      Nitron Classic, St. Patrick Town Hadapsar, Pune - 410013,
                      India <br/><br/>(+91) 902 802 2291 <br/>(+91) 988 114 9984
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
