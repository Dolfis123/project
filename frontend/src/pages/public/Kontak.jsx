import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/public/Footer";
import Navbar2 from "../../components/public/Navbar2";
function Kontak() {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyDtdplcpeeUFd6f1GB2orm4ZOznZ4goIAF4tSDTjg3pQIBSvFMtxVx6D6GwkBi65wV/exec";
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    const btnKirim = document.querySelector(".btn-kirim");
    const btnLoading = document.querySelector(".btn-loading");
    const btnAlert = document.querySelector(".my-alert");
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        btnLoading.classList.toggle("d-none");
        btnKirim.classList.toggle("d-none");
        btnAlert.classList.toggle("d-none");
        form.reset();
        setSubmitStatus("Success!");
      } else {
        setSubmitStatus("Error! " + response.statusText);
      }
    } catch (error) {
      setSubmitStatus("Error! " + error.message);
    }
  };
  const handleFormLoading = () => {
    const btnKirim = document.querySelector(".btn-kirim");
    const btnLoading = document.querySelector(".btn-loading");
    const btnAlert = document.querySelector(".my-alert");

    btnLoading.classList.toggle("d-none");
    btnKirim.classList.toggle("d-none");
  };

  return (
    <div className="bg-body-secondary">
      {/* <!-- Topbar Start --> */}
      {/* <Topbar /> */}
      {/* <!-- Topbar End --> */}
      {/* Navbar Start */}
      <div className="container-fluid position-relative p-0">
        <Navbar2 activeComponent={"Kontak"} />

        <div
          className="container-fluid bg-primary py-5 bg-header"
          style={{ marginBottom: "90px" }}
        >
          <div className="row py-5">
            <div className="col-12 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-4 text-white animated zoomIn">
                Kontak Kami
              </h1>
              <h3
                className="text-center mt-4 animated zoomIn"
                style={{ fontSize: "1.2rem", color: "#8BE8E5" }}
              >
                Disini kamu akan melihat Lokasi dan kontak kelurahan Amban
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar End */}
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5">
          <Card className="p-4">
            <div
              className="section-title text-center position-relative pb-3 mb-5 mx-auto"
              style={{ maxWidth: "600px" }}
            >
              <h5 className="fw-bold text-primary text-uppercase">
                Kontak Kami
              </h5>
            </div>
            <Row className="g-5 mb-5">
              <Col lg={4}>
                <div
                  className="d-flex align-items-center wow fadeIn"
                  data-wow-delay="0.1s"
                >
                  <div
                    className="bg-primary d-flex align-items-center justify-content-center rounded"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="fa fa-phone-alt text-white"></i>
                  </div>
                  <div className="ps-4">
                    <h5 className="mb-2">Hubungi nomor kami</h5>
                    <h4 className="text-primary mb-0">+012 345 6789</h4>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div
                  className="d-flex align-items-center wow fadeIn"
                  data-wow-delay="0.4s"
                >
                  <div
                    className="bg-primary d-flex align-items-center justify-content-center rounded"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="fa fa-envelope-open text-white"></i>
                  </div>
                  <div className="ps-4">
                    <h5 className="mb-2">Hubungi email kami</h5>
                    <h4 className="text-primary mb-0">lurahamban@gmail.com</h4>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div
                  className="d-flex align-items-center wow fadeIn"
                  data-wow-delay="0.8s"
                >
                  <div
                    className="bg-primary d-flex align-items-center justify-content-center rounded"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="fa fa-map-marker-alt text-white"></i>
                  </div>
                  <div className="ps-4">
                    <h5 className="mb-2">Lokasi Kantor Lurah</h5>
                    <h4 className="text-primary mb-0">Kantor Lurah Amban</h4>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="g-5">
              <Col lg={6} className="wow slideInUp" data-wow-delay="0.3s">
                <div
                  className="alert alert-success alert-dismissible fade show d-none my-alert"
                  role="alert"
                >
                  <strong> {submitStatus && <p>{submitStatus}</p>}</strong>
                  <strong>Terima kasih</strong> Pesan anda sudah kami terima.
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
                <Form name="submit-to-google-sheet" onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="Nama Anda"
                        name="nama"
                        style={{ height: "55px" }}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        type="email"
                        placeholder="Email Anda"
                        name="email"
                        style={{ height: "55px" }}
                      />
                    </Col>

                    <Col xs={12}>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Masukan Pesan"
                        name="pesan"
                      />
                    </Col>
                    <Col xs={12}>
                      <Button
                        type="submit"
                        className="w-100 py-3 btn-kirim"
                        onClick={handleFormLoading}
                      >
                        Kirim Pesan
                      </Button>
                    </Col>
                    <Col xs={10}>
                      <button
                        className="w-100 py-3 btn btn-primary d-none btn-loading"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm "
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col lg={6} className="wow slideInUp" data-wow-delay="0.6s">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3708.883570495203!2d134.062120374614!3d-0.8421289991496924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d540b025081f9eb%3A0x1cc8b5d44a4f1b0c!2sKantor%20Lurah%20Amban!5e1!3m2!1sid!2sid!4v1691212046653!5m2!1sid!2sid"
                  width="600"
                  height="450"
                  style={{
                    border: "0",
                    borderRadius: "20px",
                    marginBottom: "50px",
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      {/* <!--Footer Start --> */}
      <Footer />
      {/*Footer End */}
    </div>
  );
}

export default Kontak;
