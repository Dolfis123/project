import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import Footer from "../../components/public/Footer";
import Navbar2 from "../../components/public/Navbar2";
import "../../css/public/beranda.css";

function Beranda() {
  const [loading, setLoading] = useState(true);

  const [ucapan, setUcapan] = useState([]);
  // const navigate = useNavigate([]);
  useEffect(() => {
    axios
      .get("http://localhost:3040/lihat-ucapan")
      .then((response) => {
        if (response.data.Status === "Success") {
          setUcapan(response.data.Result);
          setLoading(false);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  return (
    <div className="bg-body-secondary">
      {/* <!--Topbar Start --> */}
      {/* <Topbar /> */}
      {/* <!-- Topbar End --> */}
      {/* Navbar & Carousel Start*/}
      <div className="container-fluid position-relative p-0">
        <Navbar2 activeComponent="Beranda" />
        {/* Navbar End */}
        <div
          id="header-carousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div
            id="header-carousel"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/img/logo mkw 4.jpg"
                  alt="Image"
                  className="w-100"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />

                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h4 className="text-white text-uppercase mb-3 animated slideInDown">
                      Pemerintah Kabupaten Manokwari <br />
                      Distrik Manokwari Barat <br /> Kelurahan Amban
                    </h4>
                    <br />
                    <h4 className="text-white text-uppercase mb-3 animated zoomIn">
                      Selamat Datang
                    </h4>
                    <h4 className="animated zoomIn"> di</h4>
                    <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                      Kelurahan Amban
                    </h1>

                    <a
                      href="/informasi"
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Berita Terbaru
                    </a>
                    {/* <a
                      href="/kontak"
                      className="btn btn-outline-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Kontak Kami
                    </a> */}
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="/img/logo mkw 4.jpg"
                  alt="Image"
                  className="w-100"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h4 className="text-white text-uppercase mb-3 animated slideInDown">
                      Pemerintah Kabupaten Manokwari <br />
                      Distrik Manokwari Barat <br /> Kelurahan Amban
                    </h4>
                    <br />
                    <h4 className="text-white text-uppercase mb-3 animated zoomIn">
                      Selamat Datang
                    </h4>
                    <h4 className="animated zoomIn"> di</h4>
                    <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                      Kelurahan Amban
                    </h1>
                    <a
                      href="/informasi"
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Berita Terbaru
                    </a>
                    <a
                      href="/kontak"
                      className="btn btn-outline-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Kontak Kami
                    </a>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="/img/logo mkw 4.jpg"
                  alt="Image"
                  className="w-100"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: "900px" }}>
                    <h4 className="text-white text-uppercase mb-3 animated slideInDown">
                      Pemerintah Kabupaten Manokwari <br />
                      Distrik Manokwari Barat <br /> Kelurahan Amban
                    </h4>
                    <br />
                    <h4 className="text-white text-uppercase mb-3 animated zoomIn">
                      Selamat Datang
                    </h4>
                    <h4 className="animated zoomIn"> di</h4>
                    <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                      Kelurahan Amban
                    </h1>
                    <a
                      href="/informasi"
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Berita Terbaru
                    </a>
                    <a
                      href="/kontak"
                      className="btn btn-outline-light py-md-3 px-md-5 animated slideInRight"
                    >
                      Kontak Kami
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Navbar & Carousel End*/}
      {/* <!-- Content Start --> */}

      <div className="left-aligned-content animated zoomIn">
        {loading ? (
          <h3 style={{ textAlign: "center" }}>Loading....😁</h3>
        ) : (
          <div
            style={{
              padding: "20px", // Ubah padding
              backgroundColor: "#FFFFFF",
              borderRadius: "20px", // Ubah borderRadius
              margin: "50px",
              marginBottom: "100px",
              marginTop: "100px",
              textAlign: "left", // Teks menjadi rata kiri
            }}
          >
            {ucapan.map((item, index) => (
              <div key={index} className="row mb-3">
                <div className="col-md-6">
                  <Card className="message-card">
                    <Card.Body>
                      {item.pesan &&
                        item.pesan
                          .split("\n")
                          .map((line, lineIndex) =>
                            line.startsWith("•") ? (
                              <li key={lineIndex}>{line.substring(1)}</li>
                            ) : (
                              <div
                                key={lineIndex}
                                dangerouslySetInnerHTML={{ __html: line }}
                              />
                            )
                          )}
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-6">
                  {item.image && (
                    <img
                      src={`http://localhost:3040/images/${item.image}`}
                      alt=""
                      className="img-fluid"
                      style={{ maxWidth: "85%", marginTop: "100px" }} // Menambahkan properti maxWidth di sini
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <!-- Content End --> */}
      {/* Footer Start */}
      <Footer />
      {/* Footer End */}
    </div>
  );
}
export default Beranda;
