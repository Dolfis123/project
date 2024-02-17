import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../../components/public/Footer";
import Navbar2 from "../../components/public/Navbar2";
import MediaSosial from "../../components/admin/MediaSosial";

function Informasi() {
  const [loading, setLoading] = useState(true);
  const [berita, setBerita] = useState([]);
  const [ucapan, setUcapan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
  useEffect(() => {
    axios
      .get("http://localhost:3040/news")
      .then((response) => {
        // Mengurutkan berita berdasarkan tanggal publikasi secara descending (terbaru dulu)
        const sortedBerita = [...response.data].sort((a, b) => {
          const dateA = new Date(b.publication_date);
          const dateB = new Date(a.publication_date);
          return dateB - dateA;
        });

        setBerita(sortedBerita);
        console.log(sortedBerita);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, []);

  const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <div className="container-fluid position-relative p-0">
        <Navbar2 activeComponent="Informasi" />
        <div
          className="container-fluid bg-primary py-5 bg-header"
          style={{ marginBottom: "90px" }}
        >
          <div className="row py-5">
            <div className="col-12 pt-lg-5 mt-lg-5 text-center">
              <h2
                className="text-center mt-4 animated zoomIn"
                style={{
                  fontSize: "3rem",
                  color: "#F6F6F6",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Berita & Pengumuman
              </h2>
              <h3
                className="text-center mt-4  animated zoomIn"
                style={{ fontSize: "1.2rem", color: "#8BE8E5" }}
              >
                Disini kamu akan melihat berita-berita tentang Lurah amban dan
                <br />
                sekitarnya, dan juga kamu bisa melihat pengumuman-pengumuman
                dari kelurahan amban
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* Navbar End */}
      <div className="container-fluid position-relative p-0">
        {loading ? (
          <h3 style={{ textAlign: "center" }}>Loading....😁</h3>
        ) : (
          <div
            style={{
              marginLeft: "40px",
              marginRight: "40px",
              marginBottom: "100px",
            }}
            className="row"
          >
            <div className="col-lg-8">
              <h2
                className="text-center mt-4 section-title position-relative pb-3 mb-5"
                style={{
                  fontSize: "2rem",
                  color: "#207DFF",
                  backgroundColor: "#F0F0F0",
                }}
              >
                Informasi
              </h2>
              <br />
              <br />
              <div className="row" style={{ backgroundColor: "#ffff" }}>
                {berita
                  .slice((currentPage - 1) * 8, currentPage * 8)
                  .reverse()
                  .map((item, index) => (
                    <div
                      key={index}
                      className="col-lg-5 col-md-6 col-sm-12 mb-4"
                    >
                      <div
                        className="card"
                        style={{
                          marginTop: "30px",
                          marginBottom: "30px",
                          boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2",
                        }}
                      >
                        <Link to={`/berita/${item.news_id}`}>
                          {item.news_image && (
                            <img
                              src={`http://localhost:3040/images/${item.news_image}`}
                              alt={item.news_title}
                              className="card-img-top bg-informasi"
                              style={{ objectFit: "cover", height: "200px" }}
                            />
                          )}
                        </Link>
                        <div className="card-footer">
                          <small className="text-muted">
                            <i className="far fa-calendar-alt text-primary me-2 card-text"></i>
                            Kelurahan Amban: {formatDate(item.publication_date)}
                          </small>
                        </div>
                        <div
                          className="card-body"
                          style={{ maxHeight: "280px", overflow: "hidden" }}
                        >
                          <h5 className="card-title card-text">
                            {item.news_title.substring(0, 100)}
                          </h5>
                          <p className="card-text">
                            {removeHtmlTags(item.news_content).substring(
                              0,
                              100
                            )}
                            ...
                          </p>
                          <div>
                            <Link
                              to={`/berita/${item.hashed_id}`}
                              className="btn btn-primary"
                            >
                              Lihat Detail
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="d-flex justify-content-center mt-4">
                  {Array.from(
                    { length: Math.ceil(berita.length / 8) },
                    (_, i) => i + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      className={`btn btn-outline-primary me-2 ${
                        currentPage === pageNumber ? "active" : ""
                      }`}
                      onClick={() => changePage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <MediaSosial />
          </div>
        )}
      </div>
      {/* Footer Start */}
      <Footer />
      {/* Footer End */}
    </div>
  );
}
export default Informasi;
