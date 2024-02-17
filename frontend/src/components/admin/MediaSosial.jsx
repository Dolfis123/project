import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom"; // Import Link
function MediaSosial() {
  const { hashed_id } = useParams();
  const [berita, setBerita] = useState({});
  const [loading, setLoading] = useState(true);
  const [relatedBerita, setRelatedBerita] = useState([]); // State untuk berita-berita terkait
  const [ucapan, setUcapan] = useState([]);
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
      .get(`http://localhost:3040/news/${hashed_id}`)
      .then((response) => {
        setBerita(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
        setLoading(false);
      });
  }, [hashed_id]);

  useEffect(() => {
    // Mengambil berita-berita terkait di sini (Anda perlu menyesuaikan URL)
    axios
      .get(`http://localhost:3040/news`)
      .then((response) => {
        setRelatedBerita(response.data);
      })
      .catch((error) => {
        console.error("Error fetching related news data:", error);
      });
  }, [hashed_id]);
  const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div className="col-lg-4">
      <div className="card" style={{ marginTop: "30px" }}>
        <h2 className="text-center text-info" style={{ marginTop: "30px" }}>
          Berita Terbaru
        </h2>
        {ucapan.map((item, index) => (
          // eslint-disable-next-line react/jsx-key
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "50px" }}
          >
            {item.image && (
              <img
                src={`http://localhost:3040/images/${item.image}`}
                alt=""
                style={{
                  maxWidth: "100%",
                  height: "250px",
                  borderRadius: "20px",
                }}
                className="image-fade-in"
              />
            )}
          </div>
        ))}
        <h5
          className="text-center"
          style={{ marginTop: "30px", color: "#0F0F0F" }}
        >
          Kepala Lurah: xxxxxxxxxxxxxxx
        </h5>
        <div className="card-body">
          {/* List Berita Kecil di Dalam Card Panjang */}
          <ul className="list-group">
            {relatedBerita
              .slice(-5)
              .reverse()
              .map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                    border: "2px solid #ccc",
                  }}
                >
                  <Link to={`/berita/${item.hashed_id}`}>
                    {item.news_image && (
                      <img
                        src={`http://localhost:3040/images/${item.news_image}`}
                        alt={item.news_title}
                        className="img-fluid"
                        style={{
                          maxWidth: "120px",
                          maxHeight: "120px",
                          marginRight: "10px",
                        }}
                      />
                    )}
                  </Link>
                  <Link to={`/berita/${item.hashed_id}`}>
                    <div style={{ color: "#0F0F0F" }}>
                      <h6 className="mb-0">
                        {" "}
                        {item.news_title.substring(0, 100)}
                      </h6>
                      <p className="mb-0">
                        {removeHtmlTags(item.news_content).substring(0, 50)}
                        ...
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-lg-14" style={{ marginTop: "30px" }}>
          <div className="card">
            <div className="card-body">
              <h2 className="text-center text-info">Media Sosial</h2>
              <div
                className="d-flex justify-content-around"
                style={{ marginTop: "20px" }}
              >
                <a
                  className="btn btn-lg btn-outline-info btn-lg-square rounded-circle me-2"
                  href="https://twitter.com/"
                  style={{ width: "55px", height: "55px" }}
                >
                  <i className="fab fa-twitter fa-2x" />
                </a>
                <a
                  className="btn btn-lg btn-outline-primary btn-lg-square rounded-circle me-2"
                  href="https://web.facebook.com/"
                  style={{ width: "55px", height: "55px" }}
                >
                  <i className="fab fa-facebook-f fa-2x" />
                </a>
                <a
                  className="btn btn-lg btn-outline-info btn-lg-square rounded-circle me-2"
                  href="https://id.linkedin.com/"
                  style={{ width: "55px", height: "55px" }}
                >
                  <i className="fab fa-linkedin-in fa-2x" />
                </a>
                <a
                  className="btn btn-lg btn-outline-primary btn-lg-square rounded-circle me-2"
                  href="https://www.instagram.com/"
                  style={{ width: "55px", height: "55px" }}
                >
                  <i className="fab fa-instagram fa-2x" />
                </a>
                <a
                  className="btn btn-lg btn-outline-danger btn-lg-square rounded-circle"
                  href="https://youtube.com"
                  style={{ width: "55px", height: "55px" }}
                >
                  <i className="fab fa-youtube fa-2x" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaSosial;
