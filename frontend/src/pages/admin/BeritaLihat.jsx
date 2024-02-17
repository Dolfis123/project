import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function BeritaLihat() {
  const { id } = useParams();
  const [berita, setBerita] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3040/dashboard")
      .then((res) => {
        if (res.data.email) {
          setName(res.data.email);
        } else {
          navigate("/login");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:3040/news-admin/${id}`)
      .then((response) => {
        setBerita(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
        setLoading(false);
      });
  }, [id]);
  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      {/* <!-- Topbar Start --> */}

      {/* <!-- Topbar End --> */}
      {/* Navbar Start */}

      {/* Navbar End */}
      {/* <!-- Content Start --> */}
      <div className="container-fluid position-relative p-0">
        <div
          style={{
            margin: "50px",

            marginBottom: "100px",
          }}
        >
          {loading ? (
            <h3 style={{ textAlign: "center" }}>Loading....😁</h3>
          ) : (
            <div className="card">
              <div
                className="card-body"
                style={{ marginLeft: "100px", marginRight: "50px" }}
              >
                <h3
                  className="card-title card-text"
                  style={{ marginTop: "50px" }}
                >
                  {berita.news_title}
                </h3>
                <div className="card-footer">
                  <small className="text-muted card-text">
                    <i className="far fa-calendar-alt text-primary me-2"></i>
                    Kelurahan Amban: {formatDate(berita.publication_date)}
                  </small>
                </div>
                <div>
                  {" "}
                  {berita.news_image && (
                    <img
                      src={`http://localhost:3040/images/${berita.news_image}`}
                      alt={berita.news_title}
                      className="img-fluid bg-informasi"
                    />
                  )}
                </div>
                <br />
                <div
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: berita.news_content }}
                  style={{
                    marginTop: "30px",
                    marginBottom: "100px",
                    fontSize: "16px", // Ukuran font default
                  }}
                />

                <p className="card-text">Sumber Berita: {berita.news_source}</p>
                <p className="card-text" style={{ marginBottom: "30px" }}>
                  Kategori Berita: {berita.category}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <!-- Content End --> */}
      {/* Footer Start */}
      {/* <!-- Footer Start --> */}

      {/* Footer End */}
    </div>
  );
}

export default BeritaLihat;
