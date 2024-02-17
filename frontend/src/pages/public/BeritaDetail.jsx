import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../../components/public/Footer";
import Topbar from "../../components/public/Topbar";
import Navbar2 from "../../components/public/Navbar2";
import { Link } from "react-router-dom"; // Import Link
import MediaSosial from "../../components/admin/MediaSosial";

function BeritaDetail() {
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
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <div className="container-fluid position-relative p-0">
        {/* <Navbar2 activeComponent={""} /> */}

        {/* <div
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
        </div> */}
      </div>
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
            <div className="row">
              <div className="col-lg-8">
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
                        <i className="far fa-calendar-alt text-primary me-2" />
                        Kelurahan Amban: {formatDate(berita.publication_date)}
                      </small>
                    </div>
                    <div>
                      {berita.news_image && (
                        <img
                          src={`http://localhost:3040/images/${berita.news_image}`}
                          alt={berita.news_title}
                          className="img-fluid bg-informasi"
                          // style={{
                          //   maxWidth: "100%",
                          //   maxHeight: "950px",
                          //   width: "100%", // Mengatur lebar gambar sekitar 50% dari lebar kontainer
                          // }}
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
                        fontSize: "16px",
                      }}
                    />
                    <p className="card-text">
                      Sumber Berita: {berita.news_source}
                    </p>
                    <p className="card-text" style={{ marginBottom: "30px" }}>
                      Kategori Berita: {berita.category}
                    </p>
                  </div>
                </div>
              </div>
              {/* bagian kepala lurah */}
              <MediaSosial />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BeritaDetail;
